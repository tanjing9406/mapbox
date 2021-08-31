import React, { useContext } from "react"
import { List, Radio } from "antd"
import {
    BASE_LAYER_OPTIONS,
    BASE_THEME_OPTIONS,
    BASE_MODE_OPTIONS
} from "@/views/map/consts"

function BaseLayerControl() {
    return (
        <List className="base-layer-content-wrap">
            <List.Item>
                <Radio.Group className="group base-grp" defaultValue="sea" buttonStyle="solid">
                    {BASE_LAYER_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>{item.name}</Radio.Button>)}
                </Radio.Group>
            </List.Item>
            <List.Item>
                <Radio.Group className="group theme-grp" defaultValue="day" buttonStyle="solid">
                    {BASE_THEME_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>{item.name}</Radio.Button>)}
                </Radio.Group>
            </List.Item>
            <List.Item>
                <Radio.Group className="group mode-grp" defaultValue="b" buttonStyle="solid">
                    {BASE_MODE_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>{item.name}</Radio.Button>)}
                </Radio.Group>
            </List.Item>
        </List>
    )
}

export default BaseLayerControl
