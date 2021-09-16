import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Collapse } from "antd"
import { HNHYCheckboxGrp } from "Components"
import {
    BUSINESS_LAYERS_OPTIONS,
    SITE_LAYERS_OPTIONS,
    METEOROLOGY_LAYERS_OPTIONS
} from "@/views/map/consts"
import { setCheckedLayers } from "@/redux/bussinesslayercontrolslice"
import "./style.less"

const { Panel } = Collapse

function BussinessLayerControl() {
    const dispatch = useDispatch()
    const { siteLayersChecked } = useSelector(state => state.bussinessLayerControl)
    const layerChange = (layersId, checked, curTag) => {
        dispatch(setCheckedLayers(layersId, checked))
    }
    return (
        <Collapse
            className="over-layer-content"
            defaultActiveKey={['1', '2', '3']}
            ghost
        >
            <Panel className="business-panel" header="业务图层" key="1" collapsible="disabled" showArrow={false}>
                <HNHYCheckboxGrp options={BUSINESS_LAYERS_OPTIONS} />
            </Panel>
            <Panel className="site-panel" header="站点" key="2" collapsible="disabled" showArrow={false}>
                <HNHYCheckboxGrp options={SITE_LAYERS_OPTIONS} checked={siteLayersChecked} onChange={layerChange.bind(this, 'siteLayersChecked')} />
            </Panel>
            <Panel className="meteorology-panel" header="气象" key="3" collapsible="disabled" showArrow={false}>
                <HNHYCheckboxGrp options={METEOROLOGY_LAYERS_OPTIONS} />
            </Panel>
        </Collapse>
    )
}

export default BussinessLayerControl
