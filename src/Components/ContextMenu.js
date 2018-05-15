import React, {Component} from 'react';
import {Nav} from 'office-ui-fabric-react/lib/Nav';

const LINKS = {
    createNode: () => ({name: 'Create Node', key: 'create_node'}),
    deleteNode: (label = '') => ({name: `Delete "${label}"`, key: 'delete_node'}),
    createEdgeFrom: (label = '') => ({name: `Create Edge From "${label}"`, key: 'edge_from'}),
    createEdgeTo: (label = '') => ({name: `Create Edge To "${label}"`, key: 'edge_to'}),
    deleteEdge: (label = '') => ({name: `Delete "${label}"`, key: 'delete_edge'})
};

class EntityEdit extends Component {

    onMenuClick = (e, item) => {
        switch (item.key) {
            case 'Oranges':
                console.log('Oranges are $0.59 a pound.');
                break;
            default:
                console.log('Context menu have unhandled click handler: ' + item.key);
        }
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
                LINKS.createEdgeFrom(entity.name),
                LINKS.createEdgeTo(entity.name)
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


export default EntityEdit;