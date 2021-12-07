import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Draggable from 'react-draggable'

import { setTargetId } from "@/redux/targetinfopanelslice"
import { hlxFormatCoords } from "@/lib/tools"
import ShipImage from "@/assets/ship/1.svg"
import { InfoItem } from "./components"

import "./style.less"

const { TabPane } = Tabs

function TargetInfoPanel() {
    const dispatch = useDispatch()
    const { targetId } = useSelector(state => state.targetInfoPanel)
    const realtimeTargetList = useSelector(state => state.targetLayer.realtimeTargetList)
    const realtimeTargetInfo = realtimeTargetList.find(target => target.targetId === targetId)
    const [dmsLat, dmsLng] = realtimeTargetInfo ? hlxFormatCoords(realtimeTargetInfo.latitude, realtimeTargetInfo.longitude) : []

    useEffect(() => {
        // 获取目标信息
    }, [])

    const onTabChange = () => { }

    const onClose = () => {
        dispatch(setTargetId(undefined))
    }

    return (
        <Draggable
            defaultPosition={{ x: 18, y: 60 }}
            handle=".handle"
        >
            <div className="targetInfoPanel absolute bg-white w360 pb12">
                <div className="absolute" style={{ left: '100%' }}>
                    <Button size="large" type="primary" icon={<CloseOutlined />} onClick={onClose}></Button>
                </div>
                <div className="handle h40 txt-h5 h36 pl12 flex flex--center-cross">OCEAN GLOBE</div>
                <Tabs className="target-info-tabs" onChange={onTabChange} type="card" defaultActiveKey="1">
                    <TabPane tab="目标信息" key="1">
                        <div className="bg-darken5 flex flex--space-around pt12 pb18 px12 h180">
                            <img src={ShipImage} alt="船的图片" />
                        </div>
                        <div className="grid grid--gut18 my12 mx-auto px12 txt-s">
                            <InfoItem lableText="MMSI" value="247301500247301500247301500" />
                            <InfoItem lableText="船舶类型" value="渔船" />
                            <InfoItem lableText="航向" value="137.1度" />
                            <InfoItem lableText="航速" value="0.1节" />
                            <InfoItem lableText="纬度" value={dmsLat} />
                            <InfoItem lableText="经度" value={dmsLng} />
                            <InfoItem lableText="船长" value="249米" />
                            <InfoItem lableText="最大船长" value="249米" />
                            <InfoItem lableText="目标类型" value="AIS-B" />
                            <InfoItem lableText="状态" value="正常" />
                            <InfoItem lableText="刷新时间" value="2021-3-24 12:12:12" />
                            <InfoItem lableText="持续时长" value="30分钟" />
                        </div>
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
                        <div className="bg-darken5 flex flex--space-around pt12 pb18 px12 h180">
                            <img src={ShipImage} alt="船的图片" />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </Draggable>
    )
}

export default TargetInfoPanel
