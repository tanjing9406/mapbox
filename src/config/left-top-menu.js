import React from 'react'
import {
    SearchOutlined, UnorderedListOutlined, FilterOutlined, HistoryOutlined, LineChartOutlined, VideoCameraOutlined
} from '@ant-design/icons'
import TargetSearch from '@/views/targetsearch'

export const LEFT_TOP_MENU_CONFIG = [
    {
        id: 'targetsearch',
        title: '目标查询',
        icon: SearchOutlined,
        url: '/targetsearch',
        component: TargetSearch
    }, {
        id: 'targetlist',
        title: '目标列表',
        icon: UnorderedListOutlined,
        url: '/targetlist'
    }, {
        id: 'targetfilter',
        title: '目标筛选',
        icon: FilterOutlined,
        url: '/targetfilter'
    }, {
        id: 'historytrack',
        title: '记录回放',
        icon: HistoryOutlined,
        url: '/historytrack'
    }, {
        id: 'dataanalysis',
        title: '数据分析',
        icon: LineChartOutlined,
        url: '/dataanalysis'
    }, {
        id: 'photoelelist',
        title: '光电列表',
        icon: VideoCameraOutlined,
        url: '/photoelelist',
        entitlement: 'PHOTO_ELE_LIST'
    }
]