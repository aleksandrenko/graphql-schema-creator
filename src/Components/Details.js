import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton, IconButton} from 'office-ui-fabric-react/lib/Button';

import {Dropdown} from 'office-ui-fabric-react/lib/Dropdown';

@observer
class Details extends Component {
    render() {
        const store = this.props.store;

        return (
            <section>
                <div>
                    <h1>Create Edge</h1>

                    <Dropdown
                        placeHolder='Select start Node ...'
                        label='Start Node'
                        id='edgeStart'
                        options={
                            store.nodes.map(node => {
                                return {key: node.id, text: node.name}
                            })
                        }
                        onChanged={(option) => {
                            this.setState({
                                startNodeId: option.key
                            });
                        }}
                    />

                    <TextField label="name" onChanged={(val) => {
                        this.setState({
                            edgeName: val
                        });

                    }}/> string

                    <Dropdown
                        placeHolder='Select end Node ...'
                        label='End Node'
                        id='edgeEnd'
                        options={
                            store.nodes.map(node => {
                                return {key: node.id, text: node.name}
                            })
                        }
                        onChanged={(option) => {
                            this.setState({
                                endNodeId: option.key
                            });
                        }}
                    />

                    <br/>

                    <DefaultButton onClick={() => {
                        store.addEdge({
                            name: this.state.edgeName,
                            startNodeId: this.state.startNodeId,
                            endNodeId: this.state.endNodeId
                        })
                    }
                    }>
                        Add edge
                    </DefaultButton>

                    <br/><br/>

                    <ul>
                        {
                            store.edges.map(edge => (
                                <li
                                    key={edge.id}
                                    onClick={() => {
                                    store.selected = edge;
                                }}>
                                    <b>(</b>{edge.startNode.name}<b>)-[</b>{edge.name}<b>]->(</b>{edge.endNode.name}<b>)</b>
                                </li>
                            ))
                        }
                    </ul>

                    <br/>
                </div>
            </section>
        )
    }
}

export default Details;