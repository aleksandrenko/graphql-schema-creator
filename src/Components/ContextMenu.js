import React, {Component} from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

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
        const { position, entity } = this.props;
        const styles = {
            transform: `translate(${position.x}px, ${position.y}px)`
        };

        return (
            <div
                id="context-menu"
                style={styles}
            >
                { JSON.stringify(entity) }

                <Nav
                    onLinkClick={this.onMenuClick}
                    groups={ [{
                        links: [
                            { name: 'Create Node', key: 'create_node' },
                            { name: 'Delete Node', key: 'delete_node' },
                            { name: 'Create Edge From', key: 'edge_from' },
                            { name: 'Create Edge To', key: 'edge_to' },
                            { name: 'Delete Edge', key: 'delete_edge' }
                        ]
                    }] }
                />
            </div>
        )
    }
}


export default EntityEdit;