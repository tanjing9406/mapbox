import React, { useContext } from "react"
import { Collapse } from "antd"
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { BaseLayerControl, BussinessLayerControl } from './components'

import "./style.less"

const { Panel } = Collapse

function LayersControl() {
    return (
        <div className="w420">
            <Collapse
                className="layers-control-wrap"
                defaultActiveKey={['1']}
                expandIconPosition="right"
                expandIcon={panelProps => {
                    return panelProps.isActive ? <UpOutlined /> : <DownOutlined />
                }}
                ghost
            >
                <Panel className="base-layer-panel" header="基础底图" key="1" collapsible="disabled" showArrow={false}>
                    <BaseLayerControl />
                </Panel>
                <Panel className="over-layer-panel" header="叠加图层" key="2">
                    <BussinessLayerControl />
                </Panel>
            </Collapse>
        </div>
    )
}

export default LayersControl