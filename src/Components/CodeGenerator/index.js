import React, {Component} from 'react';
import styles from './styles.css';

import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';

import getSchema from './utils/getSchema';
import convertStringToCode from './utils/convertStringToCode';

class CodeGenerator extends Component {

    render() {
        const store = this.props.store;
        const schemaString = getSchema(store);
        let executableSchema;
        let error;

        //Parse it to test for errors
        try {
            executableSchema = makeExecutableSchema({
                typeDefs: schemaString,
                resolvers: {},
            });
            console.log('executableSchema', executableSchema);
        } catch(err) {
            error = 'Invalid schema' + err.message;
            console.error(err);
        }

        return (
            <div className="code-generator">
                {
                    error &&
                    <div className="code-generation-error">{ error }</div>
                }
                { convertStringToCode(schemaString) }
            </div>
        );
    }
}

export default CodeGenerator;














