
import { ALL_TYPES } from '../../../enums/propertyTypes';

const convertUIType = (uiType) => {
    const definedTypeKey = Object.keys(ALL_TYPES).find(type => type.toLowerCase() === uiType.toLowerCase());
    return definedTypeKey
        ? ALL_TYPES[definedTypeKey]
        : 'String';
};

export default (node) => {
    return node.properties.map(property => {
        return `
            ${property.name}: ${convertUIType(property.type)}${property.isRequired ? '!' : ''}`
    }).join('\n');
};
