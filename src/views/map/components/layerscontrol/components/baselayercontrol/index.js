import React, { useEffect, useState } from "react"
import { List, Radio } from "antd"
import {
    BASE_LAYER_OPTIONS,
    BASE_THEME_OPTIONS,
    BASE_MODE_OPTIONS
} from "@/views/map/consts"
import { BASE_LAYER_ID, BASE_THEME_ID, BASE_MODE_ID } from "@/config/constants/default-consts-config"
import { setMapStyle } from "@/redux/action-creators"
import getMapStyle from '@/lib/mapstyle'

function BaseLayerControl() {
    const [layerId, setLayerId] = useState(BASE_LAYER_ID)
    const [themeId, setThemeId] = useState(BASE_THEME_ID)
    const [modeId, setModeId] = useState(BASE_MODE_ID)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setIsDisabled(!['sea', 'vectorSea', 'imageSea'].includes(layerId))
    }, [layerId])

    useEffect(() => {
        setMapStyle(getMapStyle(layerId, `${themeId}_${modeId}`))
    }, [layerId, themeId, modeId])

    return (
        <List className="base-layer-content-wrap">
            <List.Item>
                <Radio.Group className="group base-grp" value={layerId} buttonStyle="solid" onChange={e => setLayerId(e.target.value)}>
                    {BASE_LAYER_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>{item.name}</Radio.Button>)}
                </Radio.Group>
            </List.Item>
            <List.Item>
                <Radio.Group className="group theme-grp" value={themeId} buttonStyle="solid" onChange={e => setThemeId(e.target.value)} disabled={isDisabled}>
                    {BASE_THEME_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>{item.name}</Radio.Button>)}
                </Radio.Group>
            </List.Item>
            <List.Item>
                <Radio.Group className="group mode-grp" value={modeId} buttonStyle="solid" onChange={e => setModeId(e.target.value)} disabled={isDisabled}>
                    {BASE_MODE_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>{item.name}</Radio.Button>)}
                </Radio.Group>
            </List.Item>
        </List>
    )
}

export default BaseLayerControl
