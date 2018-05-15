import React, {Component} from 'react';
import {Nav} from 'office-ui-fabric-react/lib/Nav';

import store from '../store/';

const LINKS = {
    createNode: () => ({
        name: 'Create Node',
        key: 'create_node',
        iconProps: {
            iconName: 'CircleAddition'
        },
        action: (props) => {
            store.addNode({
                position: props.position
            });
        }
    }),
    deleteNode: (label = '') => ({
        name: `Delete "${label}"`,
        key: 'delete_node',
        iconProps: {
            iconName: 'Delete'
        },
        action: (props) => {
            store.deleteEntity(props.entity);
        }
    }),
    createEdge: (label = '') => ({
        name: `Create Edge From "${label}"`,
        key: 'edge',
        iconProps: {
            iconName: 'Redo'
        },
        action: (props) => {}
    }),
    deleteEdge: (label = '') => ({
        name: `Delete "${label}"`,
        key: 'delete_edge',
        iconProps: {
            iconName: 'Delete'
        },
        action: (props) => {
            store.deleteEntity(props.entity);
        }
    })
};

class EntityEdit extends Component {

    onMenuClick = (e, item) => {
        item.action(this.props);
        this.props.onClick(item);
    };

    render() {
        const {position, entity} = this.props;
        const isNode = entity && entity.type === 'node';
        const isEdge = entity && entity.type === 'edge';
        const styles = {
            transform: `translate(${position.x}px, ${position.y}px)`
        };

        const links = (
            isNode && [
                LINKS.deleteNode(entity.name),
                LINKS.createEdge(entity.name)
            ] ||
            isEdge && [
                LINKS.deleteEdge(entity.name)
            ] ||
            [
                LINKS.createNode()
            ]
        );

        return (
            <div
                id="context-menu"
                style={styles}
            >
                <Nav
                    onLinkClick={this.onMenuClick}
                    groups={[{links}]}
                />
            </div>
        )
    }
}

EntityEdit.defaultProps = {
    onClick: () => {}
};


export default EntityEdit;