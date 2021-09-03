import React from 'react'
import Trips from "@/views/examples/trip"

function Comming() {
    return <div>敬请期待</div>
}
function BigData() {
    return <iframe
        width="100%"
        height="100%"
        src="http://192.168.7.122/admin"
    ></iframe>
}

function DataDashboard() {
    return <iframe
        width="100%"
        height="100%"
        src="http://192.168.7.122/CSGbigScreen"
    ></iframe>
}

function WindDemo() {
    return <iframe
        width="100%"
        height="100%"
        src="https://philogb.github.io/page/wind/"
    ></iframe>
}

function EditorDemo() {
    return <iframe
        width="100%"
        height="100%"
        src="https://nebula.gl/geojson-editor/"
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
                // hasTopHeader: false,
                hasSider: false,
                hasMap: false,
                url: '/example/wind',
                component: WindDemo
            }, {
                id: 'example/trips',
                title: '历史轨迹',
                hasSider: false,
                hasMap: false,
                url: '/example/trips',
                component: Trips
            }, {
                id: 'example/editor',
                title: '地图编辑',
                hasSider: false,
                hasMap: false,
                url: '/example/editor',
                component: EditorDemo
            }
        ]
    }
]