import React from 'react'
import { FilterOutlined } from '@ant-design/icons'

function Comming() {
    return <div className="ml12 mt180 absolute z1 txt-xl color-blue px3">敬请期待</div>
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
                id: 'cablesetting',
                title: '海缆设置',
                icon: FilterOutlined,
                url: '/cablesetting',
                component: Comming,
                nextIsDivider: true
            }, {
                id: 'radarsite',
                title: '雷达站点',
                icon: FilterOutlined,
                url: '/radarsite',
                component: Comming
            }, {
                id: 'aissite',
                title: 'AIS 站点',
                icon: FilterOutlined,
                url: '/aissite',
                component: Comming,
                nextIsDivider: true
            }, {
                id: 'alarmhistory',
                title: '历史报警',
                icon: FilterOutlined,
                url: '/alarmhistory',
                component: Comming
            }, {
                id: 'alarmintime',
                title: '实时报警',
                icon: FilterOutlined,
                url: '/alarmintime',
                component: Comming,
                nextIsDivider: true
            }, {
                id: 'targethistory',
                title: '历史目标',
                icon: FilterOutlined,
                url: '/targethistory',
                component: Comming
            }, {
                id: 'targetfixed',
                title: '固定目标',
                icon: FilterOutlined,
                url: '/targetfixed',
                component: Comming
            }, {
                id: 'targetdipper',
                title: '北斗融合',
                icon: FilterOutlined,
                url: '/targetdipper',
                component: Comming,
                nextIsDivider: true
            }, {
                id: 'paramssetting',
                title: '参数设置',
                icon: FilterOutlined,
                url: '/paramssetting',
                component: Comming
            }, {
                id: 'normalsetting',
                title: '常用功能',
                icon: FilterOutlined,
                url: '/normalsetting',
                component: Comming
            }, {
                id: 'themesetting',
                title: '主题颜色',
                icon: FilterOutlined,
                url: '/themesetting',
                component: Comming
            }
        ]
    }
]