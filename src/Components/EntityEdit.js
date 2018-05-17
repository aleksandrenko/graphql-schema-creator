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

    isSelected = (prop) => this.state.selectedProperty && this.state.selectedProperty.id === prop.id;

    onPropertyDeleteClick = (prop, e) => {
        store.selected.deleteProperty(prop);
        e.preventDefault();
        e.stopPropagation();
    };

    onAddNewProperty = () => {
        //#PERF postpone the update
        setTimeout(() => {
            store.selected.addProperty();
        }, 0);
    };

    onColorChange = (e) => {
        store.selected.color = e.target.value;
    };

    onNameChange = (val) => {
        //#PERF postpone the update
        setTimeout(() => {
            store.selected.name = val;
        }, 0);
    };

    onPropertySelection = (prop) => {
        const selectedProperty = this.state.selectedProperty && this.state.selectedProperty.id === prop.id
        ? null
        : prop;

        this.setState({
            selectedProperty
        });
    };

    render() {
        const entity = store.selected;
        const selectedProperty = this.state.selectedProperty;

        return (entity &&
            <div className="edit-entity">

                <div className="entity-name">
                    {
                        entity.color &&
                        <span className="color-selector">
                            <input
                                type="color"
                                value={entity.color}
                                onChange={this.onColorChange}
                            />
                        </span>
                    }

                    <TextField
                        className="entity-name-input"
                        value={entity.name}
                        onChanged={ this.onNameChange }
                    />

                    <div className="entity-name-type">({entity.type})</div>

                    <DefaultButton
                        iconProps={ { iconName: 'AddTo' } }
                        onClick={ this.onAddNewProperty }
                        className="create-property-btn"
                    >
                        Property
                    </DefaultButton>
                </div>

                <div className="properties-wrapper">
                    <ul className="properties-list">
                        {
                            entity.properties.map(prop => (
                                <li
                                    key={prop.id}
                                    className={( this.isSelected(prop) ? "selected" : '' )}
                                >
                                    <div
                                        className="property-list-name"
                                        onClick={ this.onPropertySelection.bind(this, prop) }>
                                        {prop.name}

                                        <IconButton
                                            className="property-list-delete-btn"
                                            iconProps={ { iconName: 'Delete' } }
                                            title='Delete'
                                            onClick={ this.onPropertyDeleteClick.bind(this, prop) }
                                        />
                                    </div>

                                    { (selectedProperty && selectedProperty.id === prop.id) &&
                                        <Property data={selectedProperty} />
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
};

EntityEdit.defaultProps = {
    entity: null
};

export default EntityEdit;