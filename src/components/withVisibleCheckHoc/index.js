import React from 'react'
import { useLocation } from 'react-router-dom'
import { TOP_MENU } from '@/config/top-menu'

const configMap = TOP_MENU.reduce((rst, cur) => {
    if (cur.subMenu) {
        return cur.subMenu.reduce((rst, cur) => {
            rst[cur.id] = cur
            return rst
        }, rst)
    }
    rst[cur.id] = cur
    return rst
}, {})

function isTopMenuLink(id) {
    return configMap[id]
}

export function WithSiderVisibleCheckHoc(Component) {
    return function (props) {
        const location = useLocation()
        const id = location.pathname.slice(1)
        const config = isTopMenuLink(id)
        if (config && config.hasSider === false) return null
        return <Component {...props} />
    }
}

export function WithMapVisibleCheckHoc(Component) {
    return function (props) {
        const location = useLocation()
        const id = location.pathname.slice(1)
        const config = isTopMenuLink(id)
        if (config && config.hasMap === false) return null
        return <Component {...props} />
    }
}

export function WithTopHeaderVisibleCheckHoc(Component) {
    return function (props) {
        const location = useLocation()
        const id = location.pathname.slice(1)
        const config = isTopMenuLink(id)
        if (config && config.hasTopHeader === false) return null
        return <Component {...props} />
    }
}
