import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';

import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton, IconButton} from 'office-ui-fabric-react/lib/Button';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import EditEntity from './Components/EntityEdit';
import GraphUI from './Components/GraphUI';

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

    render() {
        const store = this.props.store;

        return (
            <Fabric className="app">
                { store.selected &&
                    <div>
                        Selected Entity:&nbsp;
                        <b>
                            { store.selected.name }
                            ({ store.selected.type})
                        </b>

                        &nbsp;&nbsp;
                        <button onClick={() => { store.selected = null }}>
                            Deselect
                        </button>
                    </div>
                }

                <br/>
                <br/>
                <br/>

                <GraphUI store={store} />

                <EditEntity entity={store.selected} />

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
                    { store &&
                        store.nodes.map(node => (
                            <li key={node.id}>
                                <input type="color" value={node.color} onChange={ (e) => { node.color = e.target.value; } } />

                                <button onClick={ () => { store.selected = node; }}>
                                    {node.name} (x: {node.position.x}/y: {node.position.y})
                                </button>

                                <IconButton
                                    iconProps={ { iconName: 'Delete' } }
                                    title='Delete'
                                    onClick={ () => { store.deleteEntity(node); } }
                                />

                                <div>edges:
                                {
                                    node.edges
                                        .filter(edge => !!edge)
                                        .map(edge => (
                                            <span key={edge.id}>{edge.name}</span>
                                        ))
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
                              return { key: node.id, text: node.name }
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
                                return { key: node.id, text: node.name }
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
                                <li onClick={ () => { store.selected = edge; }}>
                                    <b>(</b>{ edge.startNode.name }<b>)-[</b>{ edge.name }<b>]->(</b>{ edge.endNode.name }<b>)</b>
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
