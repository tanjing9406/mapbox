export const INIT_GRAPH_DATA = {
    nodes: [
        { id: 0, name: '需求知就只有点', x: 100, y: 100, fx: 100, fy: 100, type: 'circle', color: '#FFA500E6' },
        { id: 5, name: 'a', x: 400, y: 80, fx: 400, fy: 80, type: 'circle', color: '#FFA500' },
        { id: 6, name: 'b', x: 500, y: 110, fx: 500, fy: 110, type: 'circle', color: '#FFA500' },
        { id: 7, name: 'c', x: 520, y: 230, fx: 520, fy: 230, type: 'circle', color: '#FFA500' },
        { id: 1, name: '1', x: 200, y: 100, fx: 200, fy: 100, type: 'circle', color: '#FFA500' },
        { id: 2, name: '以人为中心', x: 300, y: 300, fx: 300, fy: 300, type: 'img', color: '#CDDC39E6' },
        { id: 8, name: '发展兴趣', x: 40, y: 40, fx: 40, fy: 40, type: 'img', color: '#CDDC39E6' },
        { id: 9, name: '学习观-自主学习', x: 150, y: 30, fx: 150, fy: 30, type: 'img', color: '#673AB7D9' },
        { id: 3, name: '3', x: 200, y: 400, fx: 200, fy: 400, type: 'circle', color: '#008000' },
        { id: 4, name: '8', x: 60, y: 20, fx: 60, fy: 20, type: 'circle', color: '#FFA500' },
    ],
    links: [
        { id: 0, source: 0, target: 1, color: '#3f51b5' },
        { id: 1, source: 0, target: 3, color: '#3f51b5' },
        { id: 2, source: 0, target: 2, color: '#3f51b5' },
        { id: 3, source: 1, target: 2, color: '#3f51b5' },
        { id: 4, source: 3, target: 2, color: '#3f51b5' },
        { id: 5, source: 8, target: 0, color: '#3f51b5' },
        { id: 6, source: 9, target: 0, color: '#3f51b5' },
    ]
}

export default {}
