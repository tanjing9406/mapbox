import React from "react";
import { Button, Tooltip } from 'antd'

function SiderButton({ title, iconName, popupContainerRef }) {
    return (
        <Tooltip placement="right" title={title} getPopupContainer={() => popupContainerRef.current}>
            <Button
                size="large"
                className="btn color-white color-blue-on-hover"
                type="link"
                icon={<span className="anticon"><svg className='icon txt-h5'><use xlinkHref={`#${iconName}`} /></svg></span>}
            />
        </Tooltip>
    )
}

export default SiderButton
