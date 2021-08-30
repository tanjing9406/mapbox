import React, { useContext } from "react"
import { Button, Tooltip } from "antd"
import { useFullscreen } from 'rooks'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import HNHYMapContext from "@/views/map/hnhymapcontext"
import PopoverButton from "./popoverbutton"

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
                <PopoverButton title="图层" iconName="layers" content={<div className="w420">dsfaasd</div>} />
                <PopoverButton title="区域切换" iconName="polygon" content={<div className="w420">dsfaasd</div>} />
                <PopoverButton title="工具箱" iconName="package" content={<div className="w240">dsfaasd</div>} />
                <Tooltip placement="left" title="清除" getPopupContainer={() => mapContainer.current}>
                    <Button
                        size="large"
                        className="btn"
                        icon={<span className="anticon"><svg className='icon'><use xlinkHref='#icon-trash' /></svg></span>}
                    />
                </Tooltip>
            </div>
        </>
    )
}

export default RightSider