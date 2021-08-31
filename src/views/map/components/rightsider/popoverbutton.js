import React, { useContext } from "react"
import { Button, Popover } from "antd"
import HNHYMapContext from "@/views/map/hnhymapcontext"

function PopoverButton(props) {
    const { mapContainer } = useContext(HNHYMapContext)
    const { title, iconName, visible, content } = props
    return (
        <Popover
            getPopupContainer={() => mapContainer.current}
            content={content}
            visible={visible}
            title={<div className="txt-m"><span className="anticon"><svg className='icon'><use xlinkHref={`#icon-${iconName}`} /></svg></span><span className="ml6">{title}</span></div>}
            placement="leftTop">
            <Button
                size="large"
                className="btn"
                icon={<span className="anticon"><svg className='icon'><use xlinkHref={`#icon-${iconName}`} /></svg></span>}
            />
        </Popover>
    )
}

export default PopoverButton