import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from 'antd'
import { setMapViewState } from "@/redux/basemapslice"
import { setShowTarget, setShowTrack } from "@/redux/cornerinfopanelslice"
import { TRACK_VIEW_STATE } from "@/config/constants/default-consts-config"

import './style.less'

function CornerInfoPanel(props) {
    const dispatch = useDispatch()
    const { dmsArr, showTarget, showTrack } = useSelector(state => state.cornerInfoPanel)
    const totalTargetNumber = useSelector(state => state.basemap.totalTargetNumber)
    const zoom = useSelector(state => state.basemap.viewState.zoom.toFixed(1))

    const onToggleTarget = (checked) => {
        dispatch(setShowTarget(checked))
    }

    const onToggleTrack = (checked) => {
        dispatch(setShowTrack(checked))
        if (checked) {
            dispatch(setMapViewState({
                ...TRACK_VIEW_STATE
            }))
        }
    }

    return (
        <div className="corner-info-panel">
            {dmsArr && <div className="top-wrap">
                <div>{dmsArr[0]}</div>
                <div>{dmsArr[1]}</div>
            </div>}
            <ul className="bottom-list">
                <li>
                    <label>目标开关：</label>
                    <Switch size="small" checked={showTarget} onChange={onToggleTarget} />
                </li>
                <li>
                    <label>目标数量：</label>
                    <span>{totalTargetNumber}</span>
                </li>
                <li>
                    <label>视野目标：</label>
                    <span>0</span>
                </li>
                <li>{zoom}级</li>
                <li>
                    <label>轨迹开关：</label>
                    <Switch size="small" checked={showTrack} onChange={onToggleTrack} />
                </li>
            </ul>
        </div>
    )
}

export default CornerInfoPanel
