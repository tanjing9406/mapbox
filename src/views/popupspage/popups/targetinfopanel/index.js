import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Tabs } from 'antd'
import formatcoords from 'formatcoords'

import ShipImage from "@/assets/ship/1.svg"
import { InfoItem } from "./components"

const { TabPane } = Tabs

function TargetInfoPanel() {
    const dispatch = useDispatch()
    const { targetId } = useSelector(state => state.targetInfoPanel)
    const realtimeTargetList = useSelector(state => state.targetLayer.realtimeTargetList)
    const realtimeTargetInfo = realtimeTargetList.find(target => target.targetId === targetId)
    const [dmsLat, dmsLng] = realtimeTargetInfo ? formatcoords(realtimeTargetInfo.latitude, realtimeTargetInfo.longitude).format({ latLonSeparator: ',', decimalPlaces: 0 }).split(',') : []

    useEffect(() => {
        // 获取目标信息
    }, [])

    const onTabChange = () => { }

    return (
        <div className="targetSearchPage absolute ml18 mt60 bg-white">
            <div className="txt-h5 h36 pl12 flex flex--center-cross">OCEAN GLOBE</div>
            <Tabs className="target-info-tabs" onChange={onTabChange} type="card" defaultActiveKey="2">
                <TabPane tab="目标信息" key="1">
                    目标信息
                </TabPane>
                <TabPane tab="AIS信息" key="2">
                    <div className="bg-darken5 flex flex--space-around pt12 pb18 px12 h180">
                        <img src={ShipImage} alt="船的图片" />
                    </div>
                    <div className="grid grid--gut18 my12 mx-auto px12 txt-s">
                        <InfoItem lableText="MMSI" value="247301500247301500247301500" />
                        <InfoItem lableText="船舶类型" value="渔船" />
                        <InfoItem lableText="国籍" value="China" />
                        <InfoItem lableText="IMO" value="78904560" />
                        <InfoItem lableText="纬度" value={dmsLat} />
                        <InfoItem lableText="经度" value={dmsLng} />
                    </div>
                </TabPane>
                <TabPane tab="光电信息" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default TargetInfoPanel
