import { convertUIType } from '../../../enums/propertyTypes';

export default (node) => {
    return node.properties.map(property => {
        return `
            ${property.name}: ${convertUIType(property.type)}${property.isRequired ? '!' : ''}`
    }).join('\n');
};
