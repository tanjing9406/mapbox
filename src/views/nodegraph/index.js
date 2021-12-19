import React, { useEffect, useRef, useState } from "react"
import { Button, Tooltip } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable'
import { ForceGraph2D } from 'react-force-graph'
import { ContextMenu, UpdateNodeModal } from "./components"
import { INIT_GRAPH_DATA } from "./consts"
import { drawNodeCanvasObject } from "./tools"

let index, linkIndex
function NodeGraphPage() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isShowContextMenu, setIsShowContextMenu] = useState(false)
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
    const [activeNode, setActiveNode] = useState(null)
    const ref = useRef()
    const [data, setData] = useState(INIT_GRAPH_DATA)

    const addLink = (obj) => {
        obj.id = linkIndex++
        obj.color = '#3F51B5'
        data.links.push(obj)
        setData(data)
    }
    const clearActiveNode = () => {
        setActiveNode(null)
    }
    const addNode = () => {
        const newNode = { ...activeNode }
        newNode.id = index++
        newNode.x = newNode.fx = activeNode.x + 25
        data.nodes.push(newNode)
        setData({ nodes: [...data.nodes], links: [...data.links] })
        clearActiveNode()
    }
    const removeNode = () => {
        const { nodes, links } = data
        const newLinks = links.filter(l => l.source !== activeNode && l.target !== activeNode); // Remove links attached to node
        const newNodes = nodes.filter(n => n !== activeNode)
        setData({ nodes: newNodes, links: newLinks });
        clearActiveNode()
    }
    const updateNode = (newNode) => {
        const { nodes, links } = data
        const newLinks = links.map((l) => {
            if (l.source.id === newNode.id) {
                l.source = newNode
            }
            if (l.target.id === newNode.id) {
                l.target = newNode
            }
            return l
        })
        const newNodes = nodes.map(n => {
            if (n.id === newNode.id) {
                return newNode
            }
            return n
        })
        setData({ nodes: newNodes, links: newLinks });
        closeUpdateNodeModal()
    }
    const showUpdateNodeModal = () => {
        setIsModalVisible(true)
    }
    const closeUpdateNodeModal = () => {
        setIsModalVisible(false)
        clearActiveNode()
    }
    const menuConfig = [
        { title: '新增节点', action: addNode },
        { title: '删除节点', action: removeNode },
        { title: '修改属性', action: showUpdateNodeModal },
    ]

    useEffect(() => {
        index = data.nodes.length
        linkIndex = data.links.length
        ref.current.zoomToFit(400)
    }, [])

    return (
        <div className="full-container" onClick={() => setIsShowContextMenu(false)}>
            <Draggable
                defaultPosition={{ x: 666, y: 0 }}
                handle=".handle"
            >
                <div
                    className="absolute bg-pink flex flex--center-cross flex--space-evenly h-auto h60 handle py6 react-draggable shadow-darken75-bold w240"
                    style={{ zIndex: 1 }}
                >
                    <span className="color-white txt-s">单击节点创建边，右键节点编辑</span>
                    <Tooltip title="适应全屏">
                        <Button shape="circle" icon={<FullscreenOutlined />} size="small" onClick={() => ref.current.zoomToFit(400)} />
                    </Tooltip>
                </div>
            </Draggable>
            <ForceGraph2D
                ref={ref}
                graphData={data}
                linkDirectionalArrowLength={6}
                linkDirectionalArrowRelPos={.75}
                onNodeClick={(node) => {
                    if (!activeNode) {
                        setActiveNode(node)
                    }
                    if (activeNode) {
                        if (activeNode !== node) {
                            addLink({ source: activeNode, target: node })
                        }
                        setActiveNode(null)
                    }
                }}
                onNodeRightClick={(node, event) => {
                    setIsShowContextMenu(true)
                    setMenuPos({ x: event.pageX, y: event.pageY })
                    setActiveNode(node)
                }}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const isActive = node === activeNode
                    drawNodeCanvasObject(node, ctx, globalScale, isActive)
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.fillStyle = color;
                    const bckgDimensions = node.__bckgDimensions;
                    if (bckgDimensions) {
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, bckgDimensions[0] / 2, 0, 2 * Math.PI, false);
                        ctx.fill()
                    }
                }}
                onNodeDrag={node => {
                    setIsShowContextMenu(false)
                }}
                onNodeDragEnd={node => {
                    node.fx = node.x;
                    node.fy = node.y;
                    setData(data)
                }}
            />
            <ContextMenu isShow={isShowContextMenu} position={menuPos} menuConfig={menuConfig} />
            <UpdateNodeModal visible={isModalVisible} updateNode={updateNode} onCancel={closeUpdateNodeModal} node={{ ...activeNode }} />
        </div>
    )
}

export default NodeGraphPage
