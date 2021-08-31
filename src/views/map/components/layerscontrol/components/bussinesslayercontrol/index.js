import React, { useContext } from "react"
import { Collapse, Tag } from "antd"
import {
    BUSINESS_LAYERS_OPTIONS,
    SITE_LAYERS_OPTIONS,
    METEOROLOGY_LAYERS_OPTIONS
} from "@/views/map/consts"

const { Panel } = Collapse
const { CheckableTag } = Tag

function BussinessLayerControl() {
    return (
        <Collapse
            className="over-layer-content-wrap"
            defaultActiveKey={['1', '2', '3']}
            ghost
        >
            <Panel className="business-panel" header="业务图层" key="1" collapsible="disabled" showArrow={false}>
                {BUSINESS_LAYERS_OPTIONS.map(item => <CheckableTag key={item.id} checked>{item.name}</CheckableTag>)}
            </Panel>
            <Panel className="site-panel" header="站点" key="2" collapsible="disabled" showArrow={false}>
                {SITE_LAYERS_OPTIONS.map(item => <CheckableTag key={item.id} checked>{item.name}</CheckableTag>)}
            </Panel>
            <Panel className="meteorology-panel" header="气象" key="3" collapsible="disabled" showArrow={false}>
                {METEOROLOGY_LAYERS_OPTIONS.map(item => <CheckableTag key={item.id} checked>{item.name}</CheckableTag>)}
            </Panel>
        </Collapse>
    )
}

export default BussinessLayerControl
