import React, {Component} from 'react';

import {TextField} from 'office-ui-fabric-react/lib/TextField';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { observer } from "mobx-react";

import { TYPES, typesWithLimits } from '../enums/propertyTypes';
const hasLimits = (type) => typesWithLimits.includes(type.toLowerCase());

@observer
class Property extends Component {

    render() {
        const prop = this.props.data;

        return (
            <div className="selected-property">
                <ul>
                    <li>
                        <label>Name:</label>
                        <TextField
                            value={prop.name}
                            onChanged={(val) => { prop.name = val; }}
                            autoFocus={true}
                        />
                    </li>
                    <li>
                        <label>Type:</label>
                        <Dropdown
                            placeHolder='Select an Option'
                            options={
                                TYPES.map(type => ({
                                    key: type.toLowerCase(),
                                    text: type
                                }))
                            }
                            selectedKey={prop.type}
                            onChanged={(option) => { prop.type = option.key; }}
                        />
                    </li>
                    <li>
                        <label>Required:</label>
                        <Toggle
                            defaultChecked={ false }
                            onText='Yes'
                            offText='No'
                            checked={prop.isRequired}
                            onChanged={(val) => { prop.isRequired = val; }}
                        />
                    </li>
                    <li>
                        <label>Auto Gen.:</label>
                        <Toggle
                            defaultChecked={ false }
                            onText='Yes'
                            offText='No'
                            checked={ prop.isAutoGenerated }
                            onChanged={(val) => { prop.isAutoGenerated = val; }}
                        />
                    </li>
                    { hasLimits(prop.type) &&
                        <li>
                            <label>Min:</label>
                            <TextField
                                value={prop.limitMin}
                                onChanged={(val) => { prop.limitMin = val; }}
                            />
                        </li>
                    }
                    { hasLimits(prop.type) &&
                        <li>
                            <label>Max:</label>
                            <TextField
                                value={prop.limitMax}
                                onChanged={(val) => { prop.limitMax = val; }}
                            />
                        </li>

                    }
                    { !prop.isAutoGenerated &&
                    <li>
                        <label>Default Value:</label>
                        <TextField
                            value={prop.defaultValue}
                            onChanged={(val) => { prop.defaultValue = val; }}
                        />
                    </li>
                    }
                    <li>
                        <label>Description:</label>
                        <TextField
                            value={prop.description}
                            onChanged={(val) => { prop.description = val; }}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

export default Property;