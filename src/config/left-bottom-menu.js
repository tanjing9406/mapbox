import React from 'react'
import { FilterOutlined } from '@ant-design/icons'

function Comming(){
    return <div>敬请期待</div>
}

export const LEFT_BOTTOM_MENU_CONFIG = [
    {
        id: 'more',
        title: '更多',
        // icon: MenuOutlined,
        subMenu: [
            {
                id: 'alarmarea',
                title: '报警区域',
                icon: FilterOutlined,
                url: '/alarmarea',
                component: Comming
            }, {
                id: 'alarmsetting',
                title: '报警设置',
                icon: FilterOutlined,
                url: '/alarmsetting',
                component: Comming
            }, {
                id: 'paramssetting',
                title: '报警设置',
                icon: FilterOutlined,
                url: '/paramssetting',
                component: Comming,
                nextIsDivider: true
            }, {
                id: 'radarsite',
                title: '雷达站点',
                icon: FilterOutlined,
                url: '/radarsite',
                component: Comming
            }, {
                id: 'alarmhistory',
                title: '历史报警',
                icon: FilterOutlined,
                url: '/alarmhistory',
                component: Comming
            }, {
                id: 'targethistory',
                title: '历史目标',
                icon: FilterOutlined,
                url: '/targethistory',
                component: Comming,
                nextIsDivider: true
            }, {
                id: 'fixedtarget',
                title: '固定目标',
                icon: FilterOutlined,
                url: '/fixedtarget',
                component: Comming
            }
        ]
    }
]