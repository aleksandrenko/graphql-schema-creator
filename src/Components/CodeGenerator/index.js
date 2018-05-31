import React, {Component} from 'react';
import styles from './styles.css';

import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';

import getSchema from './utils/getSchema';
import convertStringToCode from './utils/convertStringToCode';

class CodeGenerator extends Component {

    render() {
        const store = this.props.store;
        console.log('store', store);
        const nodes = store.nodes;
        console.log('nodes', nodes);

        const schemaString = getSchema(store);

        console.log('generated schema string', schemaString);
        //Parse it to test for errors
        const executableSchema = makeExecutableSchema({
            typeDefs: schemaString,
            resolvers: {},
        });
        console.log(printSchema(executableSchema));

        return (
            <div className="code-generator">
                { convertStringToCode(schemaString) }
            </div>
        );
    }
}

export default CodeGenerator;