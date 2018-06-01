import React, {Component} from 'react';
import {observer} from 'mobx-react';

import { convertUIType } from '../../enums/propertyTypes';

import style from './style.css';

@observer
class Property extends Component {

    render() {
        const { nodes, edges } = this.props.store;
        console.log(nodes);

        return (
            <div className="schema-preview">
                <div className="wrapper">
                    <div className="preview-title">{ nodes.length } Nodes</div>
                    <ul className="list">
                        {
                            nodes.map(node => {
                                return <li className="entity">
                                    <div className="name">
                                        <span className="color" style={{ "background": node.color }}></span>
                                        { node.name } ({node.properties.length})
                                    </div>

                                    <ul className="properties">
                                        {
                                            node.properties.map(property => (
                                                <li>
                                                    { property.name }
                                                    <span className="type">:{ convertUIType(property.type) }</span>
                                                </li>
                                            ))
                                        }
                                        {
                                            node.edges
                                                .filter(edge => edge.startNode.id === node.id)
                                                .map(edge => (
                                                    <li>
                                                        { edge.endNode.name }s
                                                        <span className="type">:{ edge.name }{ edge.endNode.name }</span>
                                                    </li>
                                                ))
                                        }
                                    </ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="wrapper">
                    <div className="preview-title">{ edges.length } Edges</div>
                    <ul className="list">
                        {
                            edges.map(edge => {
                                return <li className="entity">
                                    <div className="name">
                                        <span className="color" style={{ "background": edge.startNode.color }}></span>
                                        { edge.name } ({edge.properties.length})
                                    </div>

                                    <ul className="properties">
                                        {
                                            edge.properties.map(property => (
                                                <li>
                                                    { property.name }
                                                    <span className="type">
                                                        :{ convertUIType(property.type) }
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Property;