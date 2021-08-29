import React, { useContext } from "react"
import { Button, Tooltip } from "antd"
import { useFullscreen } from 'rooks'
import { FullscreenOutlined, FullscreenExitOutlined, HomeOutlined, DeleteOutlined, AlertOutlined } from '@ant-design/icons'

import HNHYMapContext from "../../hnhymapcontext"

import './style.less'

function RightSider() {
    const { request, isFullscreen, exit } = useFullscreen()
    const { mapContainer } = useContext(HNHYMapContext)
    return (
        <>
            <Tooltip placement="left" title={isFullscreen ? '取消全屏' : '全屏'} getPopupContainer={() => mapContainer.current}>
                <Button
                    size="large"
                    className="map-right-sider-btn"
                    icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                    onClick={() => isFullscreen ? exit() : request(mapContainer.current)}
                />
            </Tooltip>
        </>
    )
}

export default RightSider