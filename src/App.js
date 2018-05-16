import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';

import EditEntity from './Components/EntityEdit';
import Graph from './Components/GraphUI/';

import {initializeIcons} from '@uifabric/icons';
initializeIcons();

@observer
class App extends Component {
    render() {
        const store = this.props.store;

        return (
            <Fabric className="app">
                <Graph store={store}/>
                <Panel
                    isBlocking={false}
                    isOpen={!!store.selected}
                    onDismiss={() => { store.selected = null }}
                    type={PanelType.medium}
                    closeButtonAriaLabel='Close'
                >
                    <EditEntity entity={store.selected}/>
                </Panel>
            </Fabric>
        );
    }
}

export default App;
