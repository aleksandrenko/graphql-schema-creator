import geometry from './geometry';
import { line } from 'd3-shape';

const getSvgLine = (edge) => {
    const _line = line()
        .x(d => d[0])
        .y(d => d[1]);
        // .interpolate(edge.startNodeId === edge.endNodeId ? 'basis' : 'cardinal');

    if (edge.startNodeId === edge.endNodeId) {
        const node = edge.startNode;

        const rotatedLeft = geometry.quadWay(geometry.rotatePoint(node, edge.middlePointWithOffset, true), edge.middlePointWithOffset);
        const rotatedRight = geometry.quadWay(geometry.rotatePoint(node, edge.middlePointWithOffset, false), edge.middlePointWithOffset);

        return `M ${node.position.x} ${node.position.y}
        Q ${rotatedLeft[0]} ${rotatedLeft[1]}
        ${edge.middlePointWithOffset[0]} ${edge.middlePointWithOffset[1]}
        Q ${rotatedRight[0]} ${rotatedRight[1]}
        ${node.position.x} ${node.position.y}`;
    } else {
        return _line([
            [edge.startNode.position.x, edge.startNode.position.y],
            edge.middlePointWithOffset,
            [edge.endNode.position.x, edge.endNode.position.y]
        ]);
    }
};

export default getSvgLine;