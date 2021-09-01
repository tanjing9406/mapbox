import React from 'react'

function Comming() {
    return <div>敬请期待</div>
}
function BigData() {
    return <iframe
        width="100%"
        height="100%"
        src="http://localhost:8000/admin"
    ></iframe>
}

function DataDashboard() {
    return <iframe
        width="100%"
        height="100%"
        src="http://192.168.7.122/CSGbigScreen"
    ></iframe>
}

export const TOP_MENU = [
    {
        id: 'bigdata',
        title: '大数据平台',
        hasTopHeader: false,
        hasSider: false,
        hasMap: false,
        component: BigData,
        url: '/bigdata'
    }, {
        id: 'datadashboard',
        title: '数据看板',
        hasTopHeader: false,
        hasSider: false,
        hasMap: false,
        component: DataDashboard,
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