import React from "react"
import Draggable from 'react-draggable'

import './style.less'

function AlarmAreaPage() {
    return (
        <Draggable
            defaultPosition={{ x: 10, y: 250 }}
        >
            <div className="alarmAreaPage absolute bg-white w600">
                <div>报警区域</div>
                <div className="content py12 px12">
                    敬请期待！
                </div>
            </div>
        </Draggable>
    )
}

export default AlarmAreaPage
