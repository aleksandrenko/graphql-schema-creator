// uiType/GraphQL_Type
const _TYPES = {
    'String': 'String',
    'ID': 'ID',
    'Int': 'Int',
    'Float': 'Float',
    'Boolean': 'Boolean',
    'Password': 'String',
    'Email': 'String',
    'URL': 'String',
    'Datetime': 'String',
    'LatLng': 'String'
};

export const ALL_TYPES = _TYPES;
export const TYPES = Object.keys(_TYPES);
export const typesWithLimits = ['string', 'int', 'float', 'password', 'email', 'url'];