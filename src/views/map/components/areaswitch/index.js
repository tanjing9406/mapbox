import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Collapse, Radio } from "antd"
import { HNHYCheckboxGrp } from "Components"
import { AREA_SWITCH_OPTIONS } from "@/views/map/consts"
import { MAP_CHANGE_TRANSITION } from "@/config/constants/default-consts-config"
import { setCheckedAreas } from "@/redux/areaswitchslice"
import { setMapViewState } from "@/redux/basemapslice"

import "./style.less"

const { Panel } = Collapse

function AreaSwitch() {
    const dispatch = useDispatch()
    const checkedAreas = useSelector(state => state.areaSwitch.checkedAreas)

    const changeMapCenter = (checked, curTag) => {
        const areaId = curTag
        const areaOption = AREA_SWITCH_OPTIONS.find(item => item.id === areaId)
        const [longitude, latitude] = areaOption.center
        dispatch(setCheckedAreas(checked))
        dispatch(setMapViewState({
            longitude,
            latitude,
            zoom: 8,
            ...MAP_CHANGE_TRANSITION,
        }))
    }
    return (
        <Collapse
            className="layers-control-wrap w240"
            defaultActiveKey={['1']}
            expandIconPosition="right"
            ghost
        >
            <Panel className="base-layer-panel" header="选择区域" key="1" collapsible="disabled" showArrow={false}>
                <div className="area-switch-content">
                    <HNHYCheckboxGrp options={AREA_SWITCH_OPTIONS} checked={checkedAreas} onChange={changeMapCenter} />
                </div>
                {/* <Radio.Group className="area-switch-content group theme-grp" buttonStyle="solid" value={areaId} onChange={changeMapCenter}>
                    {AREA_SWITCH_OPTIONS.map(item => <Radio.Button key={item.id} value={item.id}>
                        {item.name}
                    </Radio.Button>)}
                </Radio.Group> */}
            </Panel>
        </Collapse>
    )
}

export default AreaSwitch