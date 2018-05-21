import React, {Component} from 'react';
import styles from './styles.css';

import {Dropdown} from 'office-ui-fabric-react/lib/Dropdown';

class Query extends Component {

    render() {
        return (
            <maker>
                <line># Type queries into this side of the screen, and you will</line>
                <line># see intelligent typeaheads aware of the current GraphQL type schema,</line>
                <line># live syntax, and validation errors highlighted within the text.</line>
                <line>&nbsp;</line>
                <line>
                    # We'll get you started with a simple query showing your username!
                </line>
                <line>&nbsp;</line>

                <line data-selected="true">
                    <root>query</root>
                    <ocb />
                </line>

                <group>
                    <line data-selected="true" title="Deselect 'user' property.">
                        <property><check />user</property>
                        <comment>:User; some descriptions goes here</comment>
                        <ob />
                        <attribute>login</attribute>
                        <colon />
                        <string>"<input size="3" className="input" type="text" value="tist"/>"</string>
                        <comma />
                        <attribute>login</attribute>
                        <colon />
                        <string>"<input size="3" className="input" type="text" value="tist"/>"</string>
                        <cb />
                        <ocb />
                    </line>

                    <group>
                        <line data-selected="true" title="Deselect 'id' property.">
                            <property><check />id</property>
                            <comment>:Int; @required @autoGenerated @min(0)</comment>
                        </line>

                        <line title="Select 'name' property.">
                            <property><check />name</property>
                            <comment>:String; @string</comment>
                        </line>

                        <line data-selected="true" title="Deselect 'sex' property.">
                            <property><check />sex</property>
                            <comment>:Boolean;</comment>
                        </line>

                        <line title="Select 'location' property.">
                            <property><check />location</property>
                            <comment>:String; @LatLng</comment>
                        </line>
                    </group>

                    <line>
                        <ccb />
                    </line>

                    <line title="Select 'comments' property.">
                        <property><check />comments</property>
                        <comment>:[Comment];</comment>
                    </line>

                    <line title="Select 'commits' property.">
                        <property><check />commits</property>
                        <comment>:[Commit];</comment>
                    </line>

                    <line title="Select 'other' property.">
                        <property><check />other</property>
                        <comment>:[Other];</comment>
                    </line>
                </group>

                <line>
                    <ccb />
                </line>
            </maker>
        )
    }
}

export default Query;