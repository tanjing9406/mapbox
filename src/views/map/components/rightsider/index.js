import React, { useContext } from "react"
import { Button, Tooltip, Popover } from "antd"
import { useFullscreen } from 'rooks'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

import HNHYMapContext from "@/views/map/hnhymapcontext"

import './style.less'

function RightSider() {
    const { request, isFullscreen, exit } = useFullscreen()
    const { mapContainer } = useContext(HNHYMapContext)
    return (
        <>
            <Tooltip placement="left" title={isFullscreen ? '取消全屏' : '全屏'} getPopupContainer={() => mapContainer.current}>
                <Button
                    size="large"
                    className="map-right-sider btn btn-fullscreen"
                    icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                    onClick={() => isFullscreen ? exit() : request(mapContainer.current)}
                />
            </Tooltip>
            <div className="map-right-sider toolbox-wrap">
                <Popover
                    getPopupContainer={() => mapContainer.current}
                    content={<div className="w420">dsfaasd</div>}
                    // visible
                    title={<span className="anticon txt-m"><svg class='icon'><use xlinkHref='#icon-layers' /></svg><span className="ml6">图层</span></span>}
                    placement="leftTop">
                    <Button
                        size="large"
                        className="btn"
                        icon={<span className="anticon"><svg class='icon'><use xlinkHref='#icon-layers' /></svg></span>}
                    />
                </Popover>
                <Popover
                    getPopupContainer={() => mapContainer.current}
                    content={<div className="w420">dsfaasd</div>}
                    // visible
                    title={<span className="anticon txt-m"><svg class='icon'><use xlinkHref='#icon-polygon' /></svg><span className="ml6">区域切换</span></span>}
                    placement="leftTop">
                    <Button
                        size="large"
                        className="btn"
                        icon={<span className="anticon"><svg class='icon'><use xlinkHref='#icon-polygon' /></svg></span>}
                    />
                </Popover>
                <Popover
                    getPopupContainer={() => mapContainer.current}
                    content={<div className="w240">dsfaasd</div>}
                    // visible
                    title={<span className="anticon txt-m"><svg class='icon'><use xlinkHref='#icon-package' /></svg><span className="ml6">工具箱</span></span>}
                    placement="leftTop">
                    <Button
                        size="large"
                        className="btn"
                        icon={<span className="anticon"><svg class='icon'><use xlinkHref='#icon-package' /></svg></span>}
                    />
                </Popover>
                <Tooltip placement="left" title="清除" getPopupContainer={() => mapContainer.current}>
                    <Button
                        size="large"
                        className="btn"
                        icon={<span className="anticon"><svg class='icon'><use xlinkHref='#icon-trash' /></svg></span>}
                    />
                </Tooltip>
            </div>
        </>
    )
}

export default RightSider