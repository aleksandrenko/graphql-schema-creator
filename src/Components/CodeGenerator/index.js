import React, {Component, Fragment} from 'react';
import styles from './styles.css';

import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';

import getSchema from './utils/getSchema';
import convertStringToCode from './utils/convertStringToCode';

class CodeGenerator extends Component {

    render() {
        const store = this.props.store;
        const generatedSchema = getSchema(store);
        const schemaString = generatedSchema.schema;
        let executableSchema;
        let error;

        console.log('generatedSchema.resolvers', generatedSchema.resolvers);

        //Parse it to test for errors
        try {
            executableSchema = makeExecutableSchema({
                typeDefs: schemaString,
                resolvers: generatedSchema.resolvers
            });
            console.log('executableSchema', executableSchema);
        } catch(err) {
            error = 'Invalid schema' + err.message;
            console.error(err);
        }

        return (
            <Fragment>
                <div className="code-generator">
                    {
                        error &&
                        <div className="code-generation-error">{ error }</div>
                    }
                    { convertStringToCode(schemaString) }
                </div>
            </Fragment>
        );
    }
}

export default CodeGenerator;














