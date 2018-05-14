import React, {Component} from 'react';
import {observer} from "mobx-react";

@observer
class GraphUI extends Component {
    onMouseDown = (e) => {
        this.onMouseMove.clickTarget = e.target;
        this.svg.addEventListener('mousemove', this.onMouseMove);
    };

    onMouseUp = () => {
        this.onMouseMove.clickTarget = null;
        this.svg.removeEventListener('mousemove', this.onMouseMove);
    };

    onMouseMove = (e) => {
        const target = this.onMouseMove.clickTarget;

        const targetIsNode = target.parentElement.classList.contains('node');

        if (targetIsNode) {
            this.onNodeMove(e, target.parentElement.getAttribute('uuid'));
        }
    };

    onNodeMove = (e, uuid) => {
        this.props.store.changeEntityPosition({
            id: uuid,
            position: {
                x: e.offsetX,
                y: e.offsetY
            }
        });
    };

    showContext = (e) => {
        console.log('show context');
        e.preventDefault();
    };

    render() {
        const store = this.props.store;

        return (
            <div className="graph-ui">
                <svg
                    className="graph-ui-svg"
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
                            refX="7"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto"
                        >
                            <path d="M0,-5L10,0L0,5" />
                        </marker>
                    </defs>

                    <g className="entities">
                        <g className="tempPaths">
                            <path
                                className="dragLine hidden"
                                d="M0,0L0,0"
                                style={{"marker-end": "url(&quot;#mark-end-arrow&quot;);"}}
                            />
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
                                        r="13"
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

                        <g className="edges"></g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default GraphUI;