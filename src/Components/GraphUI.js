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

        this.setState({
            entity: store.getById(uuid),
            showContextMenu: false,
            position: {
                x: e.offsetX,
                y: e.offsetY
            }
        });

        this.svg.addEventListener('mousemove', this.onMouseMove);
    };

    onMouseUp = () => {
        this.setState({
            entity: null
        });

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
                        {
                            store.edges.map(edge => (
                                <marker
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
                                style={{"marker-end": "url(&quot;#mark-end-arrow&quot;);"}}
                            />
                        </g>

                        <g className="edges">
                            {
                                store.edges.map(edge => (
                                    <g
                                        className="edge"
                                        id={edge.id}
                                        key={edge.id}
                                    >
                                        <path
                                            stroke={edge.startNode.color}
                                            d={getSvgLine(edge)}
                                            style={{"marker-end": `url(#end-arrow-${edge.id}`}}
                                            stroke-opacity="1"
                                        />
                                        <text
                                            className="path-text"
                                            tabIndex="0"
                                            x={edge.middlePointWithOffset[0]}
                                            y={edge.middlePointWithOffset[1]}
                                            fill={edge.startNode.color}
                                            opacity="1"
                                        >
                                            {edge.name} ({edge.properties.length})
                                        </text>
                                    </g>
                                ))
                            }
                        </g>

                        <g className="nodes">
                        {
                            store.nodes.map(node => (
                                <g
                                    className="node"
                                    transform={`translate(${node.position.x},${node.position.y})`}
                                    key={node.id}
                                    uuid={node.id}
                                >
                                    <circle
                                        r="12"
                                        stroke={node.color}
                                        fill="transparent"
                                    />
                                    <text fill={node.color}>
                                            {node.name} ({node.properties.length})
                                    </text>
                                </g>
                            ))
                        }
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default GraphUI;