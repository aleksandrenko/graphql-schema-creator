import React, { Component } from 'react';
import {observer} from 'mobx-react';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import store from './store/';
import { initializeIcons } from '@uifabric/icons';

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
    return (
      <Fabric className="app">
          <MessageBar messageBarType={MessageBarType.info}>
              <strong>Grapqhl schema creation</strong>
              <p>Create your graphql schema in a visual, easy to comprehend way. Lorem lipsum ;)?</p>
          </MessageBar>

          <TextField
              placeholder="Please fill"
              value=""
          />

          <DefaultButton>Submit</DefaultButton>

        <input type="text" onChange={ (e) => this.setState({ inputValue: e.target.value }) } />
        <button onClick={ () => { store.addTodo(this.state.inputValue )} }>Add todo</button>
        <br/>val: {this.state.inputValue}
        <br/>
        <ul>
            {store.todos.map(todo => {
                return <li>{todo.task}</li>
            })}
        </ul>
      </Fabric>
    );
  }
}

export default App;
