import React, {Component} from 'react';

import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { observer } from "mobx-react";

@observer
class Property extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const prop = this.props.data;

        console.log(prop);

        return (
            <div className="property">
                { JSON.stringify(prop) }
                <ul>
                    <li>
                        Name:
                        <TextField
                            value={prop.name}
                            onChanged={(val) => { prop.name = val; }}
                        />
                    </li>
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
                            onChanged={(option) => { prop.type = option.key; }}
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

                <DefaultButton>Update {prop.name}</DefaultButton>
            </div>
        );
    }
}

export default Property;