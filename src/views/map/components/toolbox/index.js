import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { List } from "antd"
import classNames from "classnames"
import {
    ViewMode,
    MeasureDistanceMode,
    MeasureAreaMode
} from "nebula.gl"

import { setMapEditMode } from "@/redux/basemapslice"

const clsName = 'border-b--0 flex flex--start-main cursor-pointer color-blue-on-hover color-blue-on-active'

const MODES = [
    { id: 'distance', lable: '测距', mode: MeasureDistanceMode, icon: '#iconceju-default' },
    { id: 'area', lable: '测面积', mode: MeasureAreaMode, icon: '#iconcemianji-default' },
    { id: 'location', lable: '定位', icon: '#icondingwei-default' },
]

function ToolBox(props) {
    const dispatch = useDispatch()
    const [activeId, setActiveId] = useState(null)

    const onItemClick = (item) => {
        if (item.id === activeId) {
            setActiveId(null)
            dispatch(setMapEditMode(ViewMode))
            return
        }
        setActiveId(item.id)
        dispatch(setMapEditMode(item.mode || ViewMode))
    }

    return (
        <List size="small">
            {MODES.map((item) => (
                <List.Item key={item.id} className={classNames(clsName, { 'is-active': activeId === item.id })} onClick={() => onItemClick(item)}>
                    <svg aria-hidden="true" className="icon mr12">
                        <use xlinkHref={item.icon} />
                    </svg>
                    {item.lable}
                </List.Item>
            ))}
        </List>
    )
}

export default ToolBox