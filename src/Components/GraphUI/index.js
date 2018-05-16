import React, {Component} from 'react';
import {observer} from "mobx-react";

import ContextMenu from '../ContextMenu';

import store from '../../store/index';
import getSvgLine from '../../utils/getSvgLine';
import getOpacity from './utils/getOpacity';

import {isNode, isEdge, getIsSelected} from './utils/tools';

const entityFromEvent = (e, store) => {
    const target = e.target;
    const uuid = target.getAttribute('uuid') || target.parentElement.getAttribute('uuid');
    return store.getById(uuid) || null;
};

@observer
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: {
                x: 0,
                y: 0
            },
            contextPosition: {
                x: 0,
                y: 0
            },
            edgeEndPoint: {
                x: 0,
                y: 0
            },
            showContextMenu: false,
            createEdgeMode: false
        };
    }

    onMouseDown = (e) => {
        const entity = entityFromEvent(e, store);

        this.setState({
            showContextMenu: false,
            createEdgeMode: false,
            position: {
                x: e.clientX,
                y: e.clientY
            }
        });

        store.selected = entity;

        if (isNode(store.selected)) {
            this.svg.addEventListener('mousemove', this.onNodeMove);
        }

        if (isEdge(store.selected)) {
            this.svg.addEventListener('mousemove', this.onEdgeMove);
        }

        if (e.target.nodeName === 'svg') {
            this.svg.addEventListener('mousemove', this.onSvgDrag);
        }
    };

    onMouseUp = () => {
        this.svg.removeEventListener('mousemove', this.onEdgeMove);
        this.svg.removeEventListener('mousemove', this.onNodeMove);
        this.svg.removeEventListener('mousemove', this.onSvgDrag);

        this.onSvgDrag.position = null;
    };

    onEdgeDrawingMove = (e) => {
        const edgeEndPoint = {
            x: e.offsetX,
            y: e.offsetY
        };

        this.setState({ edgeEndPoint });
    };

    onEdgeEndNodeClick = (e) => {
        const endNode = entityFromEvent(e, store);
        const startNode = store.selected;

        if (isNode(endNode) && isNode(startNode)) {
            const newEdge = store.addEdge({
                startNodeId: startNode.id,
                endNodeId: endNode.id
            });

            setTimeout(() => {
                store.selected = newEdge;
            }, 0);
        }

        this.svg.removeEventListener('mousemove', this.onEdgeDrawingMove);
        this.svg.removeEventListener('mousedown', this.onEdgeEndNodeClick);
    };

    onSvgDrag = (e) => {
        const previousPosition = this.onSvgDrag.position || { x: e.offsetX, y: e.offsetY };

        const delta = {
            x: e.offsetX - previousPosition.x,
            y: e.offsetY - previousPosition.y
        };

        store.nodes.forEach(node => {
            node.position = {
                x: node.position.x + delta.x,
                y: node.position.y + delta.y
            }
        });

        this.onSvgDrag.position = {
            x: e.offsetX,
            y: e.offsetY
        };
    };

    onEdgeMove = (e) => {
        const edge = store.selected;

        const xOffset = edge.middlePoint[0] - e.offsetX;
        const yOffset = edge.middlePoint[1] - e.offsetY;

        edge.middlePointOffset = [xOffset, yOffset];
    };

    onNodeMove = (e) => {
        this.props.store.changeEntityPosition({
            id: store.selected.id,
            position: {
                x: e.offsetX,
                y: e.offsetY
            }
        });
    };

    showContext = (e) => {
        this.setState({
            showContextMenu: true,
            contextPosition: {
                x: e.pageX,
                y: e.pageY
            }
        });

        e.preventDefault();
    };

    onContextMenuClick = ({e, item}) => {
        const entity = store.selected;
        let stateModification = {
            showContextMenu: false
        };

        if (item.key === 'create_edge' && isNode(entity)) {
            stateModification.createEdgeMode = true;
            stateModification.edgeEndPoint = {
                x: e.pageX,
                y: e.pageY
            };

            this.svg.addEventListener('mousemove', this.onEdgeDrawingMove);
            this.svg.addEventListener('mousedown', this.onEdgeEndNodeClick);
        }

        this.setState(stateModification);
    };

    render() {
        const store = this.props.store;
        let newEdgeArrow = null;
        let newEdgePath = null;

        if (this.state.createEdgeMode && store.selected) {
            const startNode = store.selected;
            const endPoint = this.state.edgeEndPoint;
            const startPoint = {
                x: startNode.position.x,
                y: startNode.position.y
            };

            newEdgeArrow = (
                <marker
                    id="mark-end-arrow"
                    viewBox="0 -5 10 10"
                    refX="9"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                    opacity="1"
                    fill={startNode.color}
                >
                    <path d="M0,-5L10,0L0,5" />
                </marker>
            );

            newEdgePath = (
                <path
                    className="dragLine"
                    d={`M${startPoint.x},${startPoint.y}L${endPoint.x},${endPoint.y}`}
                    stroke={startNode.color}
                    style={{"markerEnd": "url(#mark-end-arrow)"}}
                    opacity="1"
                />
            )
        }

        return (
            <div className="graph-ui">
                { this.state.showContextMenu &&
                    <ContextMenu
                        position={this.state.contextPosition}
                        entity={store.selected}
                        onClick={ this.onContextMenuClick }
                    />
                }

                <svg
                    className="graph-editor"
                    height="100%"
                    width="100%"
                    ref={svg => this.svg = svg}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                    onMouseLeave={this.onMouseUp}
                    onContextMenu={this.showContext}
                >

                    <defs>
                        { newEdgeArrow }

                        {
                            store.edges.map(edge => {
                                const opacity = getOpacity(store, edge);

                                return (
                                    <marker
                                        key={`end-arrow-${edge.id}`}
                                        id={`end-arrow-${edge.id}`}
                                        fill={edge.startNode.color}
                                        viewBox="0 -5 10 10"
                                        refX="21"
                                        markerWidth="6"
                                        markerHeight="6"
                                        orient="auto"
                                        opacity={opacity}
                                    >
                                        <path d="M0,-5L10,0L0,5" />
                                    </marker>
                                )
                            })
                        };
                    </defs>

                    <g className="entities">
                        <g className="tempPaths">
                            { newEdgePath }
                        </g>

                        <g className="edges">
                            {
                                store.edges.map(edge => {
                                    const opacity = getOpacity(store, edge);

                                    return (
                                        <g
                                            className="edge"
                                            id={edge.id}
                                            key={edge.id}
                                            uuid={edge.id}
                                        >
                                            <path
                                                stroke={edge.startNode.color}
                                                d={getSvgLine(edge)}
                                                style={{"markerEnd": `url(#end-arrow-${edge.id})`}}
                                                strokeOpacity={opacity}
                                            />
                                            <text
                                                className="path-text"
                                                tabIndex="0"
                                                x={edge.middlePointWithOffset[0]}
                                                y={edge.middlePointWithOffset[1]}
                                                fill={edge.startNode.color}
                                                opacity={opacity}
                                            >
                                                {edge.name} ({edge.properties.length})
                                            </text>
                                        </g>
                                    )
                                })
                            }
                        </g>

                        <g className="nodes">
                        {
                            store.nodes.map(node => {
                                const isSelected = getIsSelected(store, node);
                                const opacity = getOpacity(store, node);

                                return (
                                    <g
                                        className="node"
                                        transform={`translate(${node.position.x},${node.position.y})`}
                                        key={node.id}
                                        uuid={node.id}
                                    >
                                        <circle
                                            r="12"
                                            stroke={node.color}
                                            strokeOpacity={opacity}
                                            fill={isSelected ? node.color : '#ebebeb'}
                                            tabIndex="0"
                                        />
                                        <text
                                            fill={node.color}
                                            opacity={opacity}
                                        >
                                            {node.name} ({node.properties.length})
                                        </text>
                                    </g>
                                )
                            })
                        }
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Index;