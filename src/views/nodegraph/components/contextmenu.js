import React from "react"

function ContextMenu({ isShow, position, menuConfig }) {
    return (
        isShow ? <div className='absolute bg-white shadow-darken50' style={{ left: position.x, top: position.y }}>
            <ul className="mb0">
                {menuConfig.map((menu, index) => <li key={index} className="cursor-pointer px18 py6 bg-blue-on-hover color-white-on-hover" onClick={menu.action}>{menu.title}</li>)}
            </ul>
        </div> : null
    )
}

export default ContextMenu
