import React, {Component, Fragment} from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import {isNode} from '../../utils/entities';
import styles from './query-creator.css';

const getOutgoingEdges = (node) => {
  return node.edges.filter(edge => (edge.startNode.id === node.id));
};

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            steps: []
        };
    }

    onChanged = (item, e) => {
      console.log('item', item);
      const entity = this.props.store.getById(item.key);

      // this.setState({
      //     steps
      // });
    };

    onInitialNodeChanged = (item) => {
        const entity = this.props.store.getById(item.key);
        //fake edge for the first step
        const newStep = {
            index: 0,
            edge: {
                endNode: entity
            }
        };

        //reset the selection
        this.setState({
            steps: [newStep]
        });
    };

    selectStep = ({index, edge}) => {
        const steps = this.state.steps;

        const isStepAlreadySelected = steps.some(existingStep => existingStep.index === index);

        if (!isStepAlreadySelected) {
            const newStep = {
                index,
                edge
            };

            const newSteps = steps.concat([newStep]);

            this.setState({
                steps: newSteps
            });
        }
    };

    render() {
        console.log('render', this.state.steps);

        const initialStepOptions = this.props.store.nodes.map(node => ({
            key: node.id,
            text: `${node.name} (node)`
        }));

        const lastSelectedStep = this.state.steps[this.state.steps.length - 1];
        const currentStep = lastSelectedStep && ({
            index: lastSelectedStep.index + 1,
            stepEdges: getOutgoingEdges(lastSelectedStep.edge.endNode)
        });

        return (
            <section className="query-creator">
                <ul className="steps">
                    <li className="step">
                        <span className="node_circle"></span>
                        <Dropdown
                            placeHolder='Select an Entity'
                            options={initialStepOptions}
                            onChanged={this.onInitialNodeChanged}
                            selected={lastSelectedStep && lastSelectedStep.edge.endNode.id}
                        />

                        <div>
                            {
                                lastSelectedStep &&
                                lastSelectedStep.edge.endNode.properties.map(property => {
                                    return (
                                        <div>{property.name} ({property.type})</div>
                                    )
                                })
                            }
                        </div>
                    </li>

                    {
                        //ignore the first step
                        this.state.steps
                            .filter(step => step.index !== 0)
                            .map(step => {
                                return (
                                    <Fragment>
                                    <li className="step">
                                        - {step.edge.name} ->

                                        <ul>
                                            {
                                                lastSelectedStep &&
                                                step.edge.properties.map(property => {
                                                    return (
                                                        <li>{property.name} ({property.type})</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                    <li className="step">
                                        <span className="node_circle"></span>
                                        {step.edge.endNode.name}

                                        <ul>
                                            {
                                                lastSelectedStep &&
                                                step.edge.endNode.properties.map(property => {
                                                    return (
                                                        <li>{property.name} ({property.type})</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                    </Fragment>
                                );
                            })
                    }

                    <li className="step">
                        {
                            currentStep &&
                            currentStep.stepEdges.map((edge) => {
                                const context = {index: currentStep.index, edge};

                                return (
                                    <div>
                                        <button key={edge.id} onClick={ this.selectStep.bind(this, context) }>
                                            -({edge.name})->
                                        </button>
                                        { edge.endNode.name }
                                    </div>
                                )
                            })
                        }
                    </li>
                </ul>
            </section>
        )
    }
}

Index.defaultProps = {
    store: null
};

export default Index;