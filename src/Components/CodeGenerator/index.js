import React, {Component} from 'react';
import styles from './styles.css';

import getSchema from './utils/getSchema';
import convertStringToCode from './utils/convertStringToCode';

class CodeGenerator extends Component {

    render() {
        const store = this.props.store;
        console.log('store', store);
        const nodes = store.nodes;
        console.log('nodes', nodes);

        const schemaString = getSchema(store);
        const code = convertStringToCode(schemaString);

        return (
            <div className="code-generator">
                { code }
            </div>
        );
    }
}

export default CodeGenerator;