import React from "react"
import { Tabs } from 'antd'

import ShipImage from "@/assets/ship/1.svg"

import { InfoItem } from "./components"

import "./style.less"

const { TabPane } = Tabs

function TargetSearch() {

    const onTabChange = () => { }

    return (
        <div className="targetSearchPage absolute ml12 mt60 bg-white">
            <div className="txt-h5 h36 pl12 flex flex--center-cross">OCEAN GLOBE</div>
            <Tabs className="target-info-tabs" onChange={onTabChange} type="card" defaultActiveKey="2">
                <TabPane tab="目标信息" key="1">
                    目标信息
                </TabPane>
                <TabPane tab="AIS信息" key="2">
                    <div className="bg-darken5 align-center pt12 pb18 h180">
                        <img src={ShipImage} alt="船的图片" />
                    </div>
                    <div className="grid grid--gut12 my12 mx6">
                        <InfoItem lableText="MMSI" value="247301500247301500247301500" />
                        <InfoItem lableText="船舶类型" value="渔船" />
                        <InfoItem lableText="国籍" value="China" />
                        <InfoItem lableText="IMO" value="78904560" />
                    </div>
                </TabPane>
                <TabPane tab="光电信息" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default TargetSearch
