import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';

import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import EntityEdit from './Components/EntityEdit';

import store from './store/';
import {initializeIcons} from '@uifabric/icons';

initializeIcons();


@observer
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        }
    }

    componentDidMount() {
        store.addNode({
            name: 'New node, hardocded',
            x: 100,
            y: 100
        });

        store.addNode({
            name: 'Second New node, hardocded',
            x: 300,
            y: 100
        });
    }

    render() {
        return (
            <Fabric className="app">
                { this.state.selectedEntity &&
                    <div>
                        Selected Entity:&nbsp;
                        <b>
                            { this.state.selectedEntity.name }
                            ({ this.state.selectedEntity._type})
                        </b>

                        &nbsp;&nbsp;
                        <button onClick={() => { this.setState({ selectedEntity: null }) }}>
                            Deselect
                        </button>
                    </div>
                }

                <br/>
                <hr/>
                <br/>

                <EntityEdit entity={this.state.selectedEntity} />

                <input type="text" onChange={(e) => this.setState({inputValue: e.target.value})} />
                <button onClick={() => {
                    store.addNode({
                        name: this.state.inputValue || 'No name',
                        x: parseInt(Math.random() * 900),
                        y: parseInt(Math.random() * 900)
                    });
                }}>
                    Add node
                </button>

                <br/>val: {this.state.inputValue}
                <br/>

                <ul>
                    {
                        store.nodes.map(node => (
                            <li onClick={ () => { this.setState({ selectedEntity: node }) }}>
                                <input type="color" value={node._color} />
                                {node.name} (x: {node._position.x}/y: {node._position.y})

                                <div>edges:
                                {
                                    node.edges.map(edge => {
                                       return <span>{edge.name}&nbsp;</span>;
                                    })
                                }
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <hr/>

                <div>
                    <h1>Create Edge</h1>

                    <Dropdown
                        placeHolder='Select start Node ...'
                        label='Start Node'
                        id='edgeStart'
                        options={
                            store.nodes.map(node => {
                              return { key: node._id, text: node.name }
                            })
                        }
                        onChanged={ (option) => {
                            this.setState({
                                startNodeId: option.key
                            });
                        } }
                    />

                    <TextField label="name" onChanged={(val) => {
                        this.setState({
                            edgeName: val
                        });

                    }} /> string

                    <Dropdown
                        placeHolder='Select end Node ...'
                        label='End Node'
                        id='edgeEnd'
                        options={
                            store.nodes.map(node => {
                                return { key: node._id, text: node.name }
                            })
                        }
                        onChanged={ (option) => {
                            this.setState({
                                endNodeId: option.key
                            });
                        } }
                    />

                    <br/>

                    <DefaultButton onClick={ () => {
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
                                <li onClick={ () => { this.setState({ selectedEntity: edge }) }}>
                                    <b>(</b>{ edge._startNode.name }<b>)-[</b>{ edge.name }<b>]->(</b>{ edge._endNode.name }<b>)</b>
                                </li>
                            ))
                        }
                    </ul>

                    <br/>
                </div>
            </Fabric>
        );
    }
}

export default App;
