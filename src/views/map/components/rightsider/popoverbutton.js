import React, { useContext } from "react"
import { Button, Popover } from "antd"
import HNHYMapContext from "@/views/map/hnhymapcontext"

function PopoverButton(props) {
    const { mapContainer } = useContext(HNHYMapContext)
    const { title, iconName, content } = props
    return (
        <Popover
            getPopupContainer={() => mapContainer.current}
            content={content}
            // visible
            title={<span className="anticon txt-m"><svg className='icon'><use xlinkHref={`#icon-${iconName}`} /></svg><span className="ml6">{title}</span></span>}
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