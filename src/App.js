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
                            <li>
                                <input type="color" value={node._color} />
                                {node.name} ({node._position.x}/{node._position.y})
                            </li>
                        ))
                    }
                </ul>
            </Fabric>
        );
    }
}

export default App;
