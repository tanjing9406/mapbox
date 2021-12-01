import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { AlarmAreaList, EditAreaPanel, EditCoordinatePanel } from "./components"
import { reset } from "@/redux/alarmareapageslice"

import './style.less'
import { setVisiblePopups } from "@/redux/popupscontrollerslice"

function AlarmAreaPage() {
    const dispatch = useDispatch()
    const { visiblePopups } = useSelector(state => state.popupsController)

    useEffect(() => {
        dispatch(setVisiblePopups(new Set(['alarmAreaList'])))
        return () => dispatch(reset())
    }, [])

    return (
        <>
            {visiblePopups.has('alarmAreaList') && <AlarmAreaList popupId="alarmAreaList" />}
            {visiblePopups.has('editArea') && <EditAreaPanel popupId="editArea" />}
            {visiblePopups.has('editCoordinate') && <EditCoordinatePanel />}
        </>
    )
}

export default AlarmAreaPage
