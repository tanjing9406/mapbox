import React, { useContext, useState } from "react"
import { List } from "antd"
import classNames from "classnames"

const clsName = 'border-b--0 flex flex--start-main cursor-pointer color-blue-on-hover color-blue-on-active'

function ToolBox(props) {
    const [activeId, setActiveId] = useState(null)

    const onItemClick = (id) => {
        setActiveId(id === activeId ? null : id)
    }

    return (
        <List size="small">
            <List.Item className={classNames(clsName, {'is-active': activeId === 'distance'})} onClick={() => onItemClick('distance')}>
                <svg aria-hidden="true" className="icon mr12">
                    <use xlinkHref="#iconceju-default" />
                </svg>
                测距
            </List.Item>
            <List.Item className={classNames(clsName, {'is-active': activeId === 'location'})} onClick={() => onItemClick('location')}>
                <svg aria-hidden="true" className="icon mr12">
                    <use xlinkHref="#icondingwei-default" />
                </svg>
                定位
            </List.Item>
        </List>
    )
}

export default ToolBox