import React, {Component} from 'react';
import {observer} from "mobx-react";

import ContextMenu from './ContextMenu';

import store from '../store/';
import getSvgLine from '../utils/getSvgLine';

@observer
class GraphUI extends Component {
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
            showContextMenu: false,
            entity: null
        };
    }

    onMouseDown = (e) => {
        const target = e.target;
        const uuid = target.getAttribute('uuid') || target.parentElement.getAttribute('uuid');
        const entity = store.getById(uuid) || null;

        this.setState({
            entity: entity,
            showContextMenu: false,
            position: {
                x: e.offsetX,
                y: e.offsetY
            }
        });

        store.selected = entity;

        this.svg.addEventListener('mousemove', this.onMouseMove);
    };

    onMouseUp = () => {
        this.svg.removeEventListener('mousemove', this.onMouseMove);
    };

    onMouseMove = (e) => {
        if (this.state.entity && this.state.entity.type === 'node') {
            this.onNodeMove(e);
        }
    };

    onNodeMove = (e) => {
        this.props.store.changeEntityPosition({
            id: this.state.entity.id,
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

    render() {
        const store = this.props.store;

        return (
            <div className="graph-ui">
                { this.state.showContextMenu &&
                    <ContextMenu
                        position={this.state.contextPosition}
                        entity={this.state.entity}
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
                        <marker
                            id="mark-end-arrow"
                            viewBox="0 -5 10 10"
                            refX="20"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto"
                            opacity="1"
                        >
                            <path d="M0,-5L10,0L0,5" />
                        </marker>

                        {
                            store.edges.map(edge => (
                                <marker
                                    key={`end-arrow-${edge.id}`}
                                    id={`end-arrow-${edge.id}`}
                                    fill={edge.startNode.color}
                                    viewBox="0 -5 10 10"
                                    refX="20"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto"
                                    opacity="1"
                                >
                                    <path d="M0,-5L10,0L0,5" />
                                </marker>
                            ))
                        };
                    </defs>

                    <g className="entities">
                        <g className="tempPaths">
                            <path
                                className="dragLine hidden"
                                d="M0,0L0,0"
                                style={{"markerEnd": "url(#mark-end-arrow)"}}
                            />
                        </g>

                        <g className="edges">
                            {
                                store.edges.map(edge => {
                                    const isSelected = store.selected && store.selected.id === edge.id;
                                    const opacity = !store.selected ? 1 : (isSelected ? 1 : 0.5);

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
                                const isSelected = store.selected && store.selected.id === node.id;
                                const opacity = !store.selected ? 1 : (isSelected ? 1 : 0.5);

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

export default GraphUI;