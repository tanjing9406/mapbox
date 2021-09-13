import React, { useContext, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from 'antd'
import { setMapViewState } from "@/redux/basemapslice"
import { setShowTarget, setShowTrack } from "@/redux/cornerinfopanelslice"
import { TRACK_VIEW_STATE } from "@/config/constants/default-consts-config"
import HNHYMapContext from "@/views/map/hnhymapcontext"

import './style.less'
import { useDebounce } from "react-use"

function CornerInfoPanel(props) {
    const { deckRef } = useContext(HNHYMapContext)
    const dispatch = useDispatch()
    const { dmsArr, showTarget, showTrack } = useSelector(state => state.cornerInfoPanel)
    const { viewState, totalTargetNumber } = useSelector(state => state.basemap)
    const [viewTarNum, setViewTarNum] = useState(0)

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

    useDebounce(() => {
        const { width, height } = deckRef.current.deck
        const visibleTargetCounts = deckRef.current.pickObjects({ x: 0, y: 0, width, height, layerIds: ['target-layer', 'icon-cluster-layer'] }).length
        setViewTarNum(visibleTargetCounts)
    }, 50, [viewState, totalTargetNumber])

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
                    <span>{viewTarNum}</span>
                </li>
                <li>{viewState.zoom.toFixed(1)}级</li>
                <li>
                    <label>轨迹开关：</label>
                    <Switch size="small" checked={showTrack} onChange={onToggleTrack} />
                </li>
            </ul>
        </div>
    )
}

export default CornerInfoPanel
