import React from 'react'
import BaseProduction from "@/views/iframes/BaseProduction"
import Trips from "@/views/examples/trip"
import NodeGraphPage from '@/views/nodegraph'

function Comming() {
    return <div>敬请期待</div>
}
function BigData() {
    return <iframe
        width="100%"
        height="100%"
        src={`http://${process.env.BASE_IP}/admin`}
    ></iframe>
}

function DataDashboard() {
    return <iframe
        width="100%"
        height="100%"
        src={`http://${process.env.BASE_IP}/CSGbigScreen`}
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
        entitlement: 'BIG_DATA',
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
        id: 'baseproduction',
        title: '基线',
        hasTopHeader: false,
        hasSider: false,
        hasMap: false,
        component: BaseProduction,
        url: '/baseproduction'
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
            }, {
                id: 'example/nodegraph',
                title: '知识图谱',
                hasTopHeader: false,
                hasSider: false,
                hasMap: false,
                url: '/example/nodegraph',
                component: NodeGraphPage
            }
        ]
    }
]