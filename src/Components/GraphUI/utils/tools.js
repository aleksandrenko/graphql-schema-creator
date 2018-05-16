
export const isNode = (entity) => entity && entity.type === 'node';
export const isEdge = (entity) => entity && entity.type === 'edge';

export const getIsSelected = (store, entity) => store.selected && store.selected.id === entity.id;