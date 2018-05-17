import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {Fabric} from 'office-ui-fabric-react/lib/Fabric';

import EditEntity from './Components/EntityEdit';
import Graph from './Components/GraphUI/';

import {initializeIcons} from '@uifabric/icons';
import Index from "./Components/QueryCreator/";
initializeIcons();

@observer
class App extends Component {
    render() {
        const store = this.props.store;

        return (
            <Fabric className="app">
                <Index store={store} />

                <div className="left">
                    <Graph store={store} />
                </div>
                <div className="right">
                    {
                        !store.selected &&
                        <div className="select-hint">Select a node or an edge!</div>
                    }

                    <EditEntity entity={store.selected}/>
                </div>
            </Fabric>
        );
    }
}

export default App;
