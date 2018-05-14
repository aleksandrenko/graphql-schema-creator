import React, {Component} from 'react';
import {observer} from "mobx-react";

@observer
class GraphUI extends Component {

    constructor(props) {
        super(props);
    }

    onMouseDown = (e) => {
        const target = e.target.parentElement;
        const targetIsNode = target.classList.contains('node');

        if (targetIsNode) {
            const uuid = target.getAttribute('uuid');
            this.svg.addEventListener('mousemove', this.onMouseMove.bind(this, {
                uuid,
                x: e.clientX,
                y: e.clientY
            }));
        }
    };

    releaseSelected = (e) => {
        this.props.store.selected = null;
        this.svg.removeEventListener('mousemove', this.onMouseMove);
    };

    onMouseMove = (options, e) => {
        console.log(e);

        this.props.store.changeEntityPosition({
            id: options.uuid,
            position: {
                x: options.x - e.clientX,
                y: options.y - e.clientY
            }
        });
    };

    render() {
        const store = this.props.store;

        return (
            <div className="graph-ui">
                <svg
                    className="graph-ui-svg"
                    width="840" height="240"
                    viewBox="0 0 240 240"
                    ref={svg => this.svg = svg}
                    onMouseUp={this.releaseSelected}
                    onMouseLeave={this.releaseSelected}
                    onContextMenu={e => e.preventDefault()}
                    onMouseDown={this.onMouseDown}
                >

                    {
                        store.nodes.map(node => (
                            <g
                                className="node second"

                                key={node.id}
                                uuid={node.id}
                            >
                                <circle
                                    r="13"
                                    stroke={node.color}
                                    fill="transparent"
                                    cx={node.position.x}
                                    cy={node.position.y}
                                />
                                <text
                                    fill={node.color}
                                    opacity="1">
                                        {node.name}
                                </text>
                            </g>
                        ))
                    }
                </svg>
            </div>
        );
    }
}

export default GraphUI;