import React from "react"
import Draggable from 'react-draggable'

function EditCoordinatePanel() {
    return (
        <Draggable
            defaultPosition={{ x: 10, y: 250 }}
        >
            <div className="editArea absolute bg-white w360">
                <div className="h36 flex flex--center-cross txt-h5 ml12">编辑坐标</div>
                <div className="content py12 px18">
                    编辑坐标
                </div>
            </div>
        </Draggable>
    )
}

export default EditCoordinatePanel