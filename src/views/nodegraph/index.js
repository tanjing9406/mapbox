import React, { useEffect, useRef } from "react"
import Draggable from 'react-draggable'
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph'

function NodeGraphPage() {
    const ref = useRef()
    const data = {
        nodes: [
            { id: 0, name: '需求知就只有点', x: 100, y: 100, fx: 100, fy: 100, type: 'circle', color: 'orange', val: 24 },
            { id: 1, name: '1', x: 200, y: 100, fx: 200, fy: 100, type: 'circle', color: 'green', val: 4 },
            { id: 2, name: '2', x: 300, y: 300, fx: 300, fy: 300, type: 'img', color: 'blue', val: 4 },
            { id: 3, name: '3', x: 200, y: 400, fx: 200, fy: 400, type: 'circle', color: 'orange', val: 4 },
            { id: 4, name: '8', x: 60, y: 20, fx: 60, fy: 20, type: 'circle', color: 'green', val: 4 },
        ],
        links: [
            { id: 'link0', source: 0, target: 1, color: '#3f51b5' },
            { id: 'link1', source: 0, target: 3, color: '#3f51b5' },
            { id: 'link1', source: 0, target: 2, color: '#3f51b5' },
            { id: 'link2', source: 1, target: 2, color: '#3f51b5' },
            { id: 'link3', source: 3, target: 2, color: '#3f51b5' },
        ]
    }

    useEffect(() => {
        ref.current.zoomToFit(400)
    }, [])
    return (
        <div className="full-container">
            <Draggable
                defaultPosition={{ x: 0, y: 0 }}
                handle=".handle"
            >
                <div className="handle absolute w60 h-full bg-pink" style={{ zIndex: 1 }}>

                </div>
            </Draggable>
            <ForceGraph2D
                ref={ref}
                graphData={data}
                // nodeLabel="label"
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                    ctx.fillStyle = node.color;
                    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'rgba(255, 255, 255)';
                    ctx.fillText(label, node.x, node.y);

                    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                }}
            // linkAutoColorBy="color"
            // onEngineStop={() => ref.current.zoomToFit(400)}
            // onNodeDragEnd={node => {
            //     node.fx = node.x;
            //     node.fy = node.y;
            // }}
            />
        </div>
    )
}

export default NodeGraphPage
