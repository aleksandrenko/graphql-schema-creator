import React, {Component} from 'react';

import {MessageBar, MessageBarType} from 'office-ui-fabric-react/lib/MessageBar';

import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton, IconButton} from 'office-ui-fabric-react/lib/Button';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

class EntityEdit extends Component {
    render() {
        return (this.props.entity &&
            <div className="form">
                <MessageBar messageBarType={MessageBarType.info}>
                    <strong>Grapqhl schema creation</strong>
                    <p>Create your graphql schema in a visual, easy to comprehend way. Lorem lipsum ;)?</p>
                </MessageBar>

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
        )
    }
};

EntityEdit.defaultProps = {
    entity: null
};

export default EntityEdit;