import React from "react"

import ShipImage from "@/assets/ship/1.svg"

import { InfoItem } from "./components"

import "./style.less"

function TargetSearch() {
    return (
        <div className="targetSearchPage absolute ml240 mt120 bg-white">
            <div className="txt-h4">OCEAN GLOBE</div>
            <div className="bg-darken5 align-center pt12 pb18">
                <img src={ShipImage} alt="船的图片" />
            </div>
            <div className="grid grid--gut12 my12 mx6">
                <InfoItem lableText="MMSI" value="247301500247301500247301500" />
                <InfoItem lableText="船舶类型" value="渔船" />
                <InfoItem lableText="国籍" value="China" />
                <InfoItem lableText="IMO" value="78904560" />
            </div>
        </div>
    )
}

export default TargetSearch
