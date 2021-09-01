import React, { useState } from "react"
import { Collapse, Radio } from "antd"
import {
    AREA_SWITCH_OPTIONS
} from "@/views/map/consts"

const { Panel } = Collapse

function AreaSwitch() {
    const [area] = useState('hainan')
    return (
        <Collapse
            className="layers-control-wrap w240"
            defaultActiveKey={['1']}
            expandIconPosition="right"
            ghost
        >
            <Panel className="base-layer-panel" header="选择区域" key="1" collapsible="disabled" showArrow={false}>
                <Radio.Group className="area-switch-content group theme-grp" buttonStyle="solid" value={area}>
                    {AREA_SWITCH_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>
                        {item.name}
                    </Radio.Button>)}
                </Radio.Group>
            </Panel>
        </Collapse>
    )
}

export default AreaSwitch