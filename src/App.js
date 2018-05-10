import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import {MessageBar, MessageBarType} from 'office-ui-fabric-react/lib/MessageBar';

import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';

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
                        <li><TextField label="id"/> id! [delete btn]</li>
                        <li><TextField label="name"/> string [delete btn]</li>
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


                <input type="text" onChange={(e) => this.setState({inputValue: e.target.value})}/>
                <button onClick={() => {
                    store.addTodo(this.state.inputValue)
                }}>Add todo
                </button>
                <br/>val: {this.state.inputValue}
                <br/>
                <ul>
                    {store.todos.map(todo => {
                        return <li>{todo.task}</li>
                    })}
                </ul>
            </Fabric>
        );
    }
}

export default App;
