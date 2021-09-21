import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { AlarmAreaList, EditAreaPanel, EditCoordinatePanel } from "./components"
import { reset } from "@/redux/alarmareapageslice"

import './style.less'

function AlarmAreaPage() {
    const dispatch = useDispatch()
    const { visiblePanel } = useSelector(state => state.alarmAreaPage)

    useEffect(() => {
        return () => dispatch(reset())
    }, [])

    return (
        <>
            {visiblePanel.has('alarmAreaList') && <AlarmAreaList />}
            {visiblePanel.has('editArea') && <EditAreaPanel />}
            {visiblePanel.has('editCoordinate') && <EditCoordinatePanel />}
        </>
    )
}

export default AlarmAreaPage
