import React from "react"
import Draggable from 'react-draggable'
import { useDispatch } from "react-redux"

import { setVisiblePanel } from "@/redux/alarmareapageslice"

function EditAreaPanel() {
    const dispatch = useDispatch()

    const closeEditAreaPanel = () => {
        dispatch(setVisiblePanel(new Set(['alarmAreaList'])))
    }

    return (
        <Draggable
            defaultPosition={{ x: 10, y: 250 }}
        >
            <div className="editAreaPanel absolute bg-white w360">
                <div className="h36 flex flex--center-cross txt-h5 ml12">编辑区域</div>
                <div className="content py12 px18">
                    敬请期待
                </div>
                <div className="bottom-button-wrap flex--space-evenly flex py12 px30 pb24">
                    <button className='btn round'>保存</button>
                    <button className='btn round btn--gray-light' onClick={closeEditAreaPanel}>取消</button>
                </div>
            </div>
        </Draggable>
    )
}

export default EditAreaPanel