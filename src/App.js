import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import {MessageBar, MessageBarType} from 'office-ui-fabric-react/lib/MessageBar';

import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton, IconButton} from 'office-ui-fabric-react/lib/Button';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

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
                <MessageBar messageBarType={MessageBarType.info}>
                    <strong>Grapqhl schema creation</strong>
                    <p>Create your graphql schema in a visual, easy to comprehend way. Lorem lipsum ;)?</p>
                </MessageBar>

                <div>
                    Selected Entity:&nbsp;
                    <b>
                        { this.state.selectedEntity && this.state.selectedEntity.name }
                        ({ this.state.selectedEntity && this.state.selectedEntity._type})
                    </b>
                </div>

                <div className="form">
                    <TextField label="Name"/> (type: Node/Edge)

                    <br/>

                    <DefaultButton>Add property</DefaultButton>

                    <br/>
                    props:
                    <ul>
                        <li>
                            <TextField label="id"/> id!
                            <IconButton
                                iconProps={ { iconName: 'Delete' } }
                                title='Delete'
                            />
                        </li>
                        <li>
                            <TextField label="name"/> string
                            <IconButton
                                iconProps={ { iconName: 'Delete' } }
                                title='Delete'
                            />
                        </li>
                    </ul>

                    <DefaultButton>Update</DefaultButton>

                    <ul>
                        <li>
                            Type:
                            <Dropdown
                                placeHolder='Select an Option'
                                label='Basic uncontrolled example:'
                                id='Basicdrop1'
                                ariaLabel='Basic dropdown example'
                                options={
                                    [
                                        { key: 'string', text: 'String' },
                                        { key: 'number', text: 'Number' }
                                    ]
                                }
                            />
                        </li>
                        <li>
                            Required:
                            <Toggle
                                defaultChecked={ false }
                                onText='Yes'
                                offText='No'
                            />
                        </li>
                        <li>
                            Auto Gen.:
                            <Toggle
                                defaultChecked={ false }
                                onText='Yes'
                                offText='No'
                            />
                        </li>
                        <li>
                            Min Len.: <TextField/>
                        </li>
                        <li>
                            Max Len.: <TextField/>
                        </li>
                        <li>
                            Description: <TextField/>
                        </li>
                    </ul>

                </div>


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
                                {node._id}
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
