
const OPACITY = {
    SELECTED: 1,
    LEVEL_ONE: 0.95,
    LEVEL_TWO: 0.6,
    NOT_SELECTED: 0.1
};

const isNode = (entity) => entity && entity.type === 'node';
const isEdge = (entity) => entity && entity.type === 'edge';

const getIsSelected = (store, entity) => store.selected && store.selected.id === entity.id;

/**
 *
 * @param store
 * @param entity
 * @returns {number}
 */
const getOpacity = (store, entity) => {
    if (!store.selected) {
        return OPACITY.SELECTED;
    }

    const isSelected = getIsSelected(store, entity);

    if (isNode(entity)) {
        const connectedToSelectedEdge = entity.edges.some(edge =>  getIsSelected(store, edge));
        if (connectedToSelectedEdge) {
            return OPACITY.LEVEL_ONE;
        }

        const secondLevelSelected = entity.edges
            .filter(edge => edge.endNode.id === entity.id)
            .some(edge => getIsSelected(store, edge.startNode));

        //if there is a edge pointing to the same node is second level so entity !== store.selected
        if (secondLevelSelected && entity !== store.selected) {
            return OPACITY.LEVEL_TWO;
        }
    }

    if (isEdge(entity)) {
        if ( getIsSelected(store, entity.startNode)) {
            return OPACITY.LEVEL_ONE;
        }

        const secondLevelSelected = entity.startNode.edges.some(edge => getIsSelected(store, edge.startNode));
        if (secondLevelSelected) {
            return OPACITY.LEVEL_TWO;
        }
    }

    return isSelected ? OPACITY.SELECTED : OPACITY.NOT_SELECTED;
};

export default getOpacity;