import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import { setVisiblePopups } from "@/redux/popupscontrollerslice"

function DraggablePanel(props) {
    const dispatch = useDispatch()
    const { visiblePopups } = useSelector(state => state.popupsController)

    const onClose = () => {
        const cloneVisiblePopups = new Set(visiblePopups)
        cloneVisiblePopups.delete(props.id)
        dispatch(setVisiblePopups(cloneVisiblePopups))
        props.onClose && props.onClose()
    }

    return (
        <Draggable
            defaultPosition={{ x: 10, y: 250 }}
        >
            <div className="alarmAreaPage absolute bg-white">
                <div className="h40 flex flex--center-cross flex--space-between-main txt-h5 ml12">
                    <label>{props.title}</label>
                    <Button size="large" type="primary" icon={<CloseOutlined />} onClick={onClose}></Button>
                </div>
                {props.children}
            </div>
        </Draggable>
    )
}

export default DraggablePanel