import React from 'react'

function Comming() {
    return <div>敬请期待</div>
}

export const TOP_MENU = [
    {
        id: 'bigdata',
        title: '大数据平台',
        hasSider: false,
        hasMap: false,
        component: Comming,
        url: '/bigdata'
    }, {
        id: 'datadashboard',
        title: '数据看板',
        hasSider: false,
        hasMap: false,
        component: Comming,
        url: '/datadashboard'
    }, {
        id: 'example',
        title: '案例展示',
        hasSider: false,
        subMenu: [
            {
                id: 'example/wind',
                title: '风向图',
                hasSider: false,
                // icon: FilterOutlined,
                url: '/example/wind',
                component: Comming
            },
        ]
    }
]