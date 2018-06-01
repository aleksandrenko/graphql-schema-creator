import React, {Component, Fragment} from "react";
import {Toggle} from 'office-ui-fabric-react/lib/Toggle';

export default class Property extends Component {
    render() {
        return (
            <Fragment>
                <li className="selected">
                    <div className="property-list-name">
                        Article<span className="property-list-name-hint">(id: ID!):[Article]</span>
                    </div>
                    <div className="selected-property">
                        <ul>
                            <li>
                                <label>Create the query:</label>
                                <Toggle
                                    defaultChecked={true}
                                    onText='Yes'
                                    offText='No'
                                    checked={true}
                                    onChanged={(val) => {
                                    }}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="wrapper-title">used properties for filtering</div>
                    <div className="selected-property">
                        <ul>
                            <li>
                                <label>id:</label>
                                <Toggle
                                    defaultChecked={true}
                                    onText='Yes'
                                    offText='No'
                                    checked={true}
                                    onChanged={(val) => {
                                    }}
                                />
                            </li>
                            <li>
                                <label>other prop:</label>
                                <Toggle
                                    defaultChecked={false}
                                    onText='Yes'
                                    offText='No'
                                    checked={false}
                                    onChanged={(val) => {
                                    }}
                                />
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div
                        className="property-list-name">
                        Articles <span className="property-list-name-hint">():[Article]</span>
                    </div>
                </li>
                <li>
                    <div className="property-list-name">
                        CreateArticle<span className="property-list-name-hint">(article: ActicleInput!):Article</span>
                    </div>
                </li>
                <li>
                    <div className="property-list-name">
                        UpdateArticle<span
                        className="property-list-name-hint">(id: ID!, article: ActicleInput!):Article</span>
                    </div>
                </li>
                <li>
                    <div className="property-list-name">
                        DeleteArticle<span className="property-list-name-hint">(id: ID!):Article</span>
                    </div>
                </li>
            </Fragment>)
    }
};