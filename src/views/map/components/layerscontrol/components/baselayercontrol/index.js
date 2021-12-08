import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { List, Radio } from "antd"
import {
    BASE_LAYER_OPTIONS,
    BASE_THEME_OPTIONS,
    BASE_MODE_OPTIONS
} from "@/views/map/consts"
import { setBaseLayerControlId } from "@/redux/baselayercontrolslice"

import "./style.less"

function BaseLayerControl() {
    const dispatch = useDispatch()
    const { baseLayerId, baseThemeId, baseModeId } = useSelector(state => state.baseLayerControl)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setIsDisabled(!['sea', 'vectorSea', 'imageSea'].includes(baseLayerId))
    }, [baseLayerId])

    return (
        <List className="base-layer-content">
            <List.Item>
                <Radio.Group className="group base-grp" value={baseLayerId} buttonStyle="solid" onChange={e => dispatch(setBaseLayerControlId('baseLayerId', e.target.value))}>
                    {BASE_LAYER_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id} style={{ background: `url('/assets/images/baselayercontrol/${item.image}.png')` }}>
                        <div className="btn-wrap">
                            {item.name}
                        </div>
                    </Radio.Button>)}
                </Radio.Group>
            </List.Item>
            <List.Item>
                <Radio.Group className="group theme-grp" value={baseThemeId} buttonStyle="solid" onChange={e => dispatch(setBaseLayerControlId('baseThemeId', e.target.value))} disabled={isDisabled}>
                    {BASE_THEME_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>
                        <div className="btn-wrap">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={item.icon} />
                            </svg>
                            {item.name}
                        </div>
                    </Radio.Button>)}
                </Radio.Group>
            </List.Item>
            <List.Item>
                <Radio.Group className="group mode-grp" value={baseModeId} buttonStyle="solid" onChange={e => dispatch(setBaseLayerControlId('baseModeId', e.target.value))} disabled={isDisabled}>
                    {BASE_MODE_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>
                        <div className="btn-wrap">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={item.icon} />
                            </svg>
                            {item.name}
                        </div>
                    </Radio.Button>)}
                </Radio.Group>
            </List.Item>
        </List>
    )
}

export default BaseLayerControl
