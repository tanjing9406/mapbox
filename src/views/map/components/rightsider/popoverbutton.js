import React, { useContext } from "react"
import { Button, Popover } from "antd"
import HNHYMapContext from "@/views/map/hnhymapcontext"

function PopoverButton(props) {
    const { mapContainer } = useContext(HNHYMapContext)
    const { title, iconName, visible, content } = props
    return (
        <Popover
            overlayClassName="right-sider-popover"
            getPopupContainer={() => mapContainer.current}
            content={content}
            visible={visible}
            title={<><span className="anticon"><svg className='icon'><use xlinkHref={`#icon-${iconName}`} /></svg></span><span className="ml6">{title}</span></>}
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