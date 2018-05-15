import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
import Details from './Components/Details';

import EditEntity from './Components/EntityEdit';
import GraphUI from './Components/GraphUI';

import {initializeIcons} from '@uifabric/icons';
initializeIcons();

@observer
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        }
    }

    render() {
        const store = this.props.store;

        return (
            <Fabric className="app">
                <GraphUI store={store}/>
                <Panel
                    isBlocking={false}
                    isOpen={!!store.selected}
                    onDismiss={() => {
                        store.selected = null
                    }}
                    type={PanelType.medium}
                    closeButtonAriaLabel='Close'
                >
                    <EditEntity entity={store.selected}/>
                    <Details store={store} />
                </Panel>
            </Fabric>
        );
    }
}

export default App;
