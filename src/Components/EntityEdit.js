import React, {Component} from 'react';

import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton, IconButton} from 'office-ui-fabric-react/lib/Button';

import Property from "./Property";
import {observer} from 'mobx-react';

import store from '../store/';

@observer
class EntityEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedProperty: null
        }
    }

    onPropertyDeleteClick = (prop) => {
        store.selected.deleteProperty(prop);
    };

    onAddNewProperty = () => {
        store.selected.addProperty();
    };

    render() {
        const entity = store.selected;

        return (entity &&
            <div className="form">
                <TextField label="Name" value={entity.name} onChanged={ (val) => entity.name = val } />
                <div>({entity.type})</div>

                <DefaultButton primary={true} onClick={ this.onAddNewProperty }>Add property</DefaultButton>

                <hr/>
                <ul>
                    {
                        entity.properties.map(prop => (
                            <li key={prop.id}>
                                <span onClick={ () => { this.setState({ selectedProperty: prop }) } }>{prop.name}</span>
                                <IconButton
                                    iconProps={ { iconName: 'Delete' } }
                                    title='Delete'
                                    onClick={ this.onPropertyDeleteClick.bind(this, prop) }
                                />
                            </li>
                        ))
                    }
                </ul>

                { this.state.selectedProperty &&
                    <Property data={this.state.selectedProperty} />
                }

            </div>
        )
    }
};

EntityEdit.defaultProps = {
    entity: null
};

export default EntityEdit;