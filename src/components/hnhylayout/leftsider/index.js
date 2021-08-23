import React from 'react'
import { Layout, Menu } from 'antd'
import {
    SearchOutlined, UnorderedListOutlined, FilterOutlined, HistoryOutlined, LineChartOutlined, VideoCameraOutlined,
    InfoCircleOutlined, MenuOutlined
} from '@ant-design/icons'

import './style.less'

const { Sider } = Layout

const LeftSider = function () {
    return (
        <Sider className="page-left-sider-wrapper hnhy" collapsible collapsed={true} trigger={null} collapsedWidth={56}>
            <Menu defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<SearchOutlined />}>
                    目标查询
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                    目标列表
                </Menu.Item>
                <Menu.Item key="3" icon={<FilterOutlined />}>
                    目标筛选
                </Menu.Item>
                <Menu.Item key="4" icon={<HistoryOutlined />}>
                    记录回放
                </Menu.Item>
                <Menu.Item key="5" icon={<LineChartOutlined />}>
                    目标分析
                </Menu.Item>
                <Menu.Item key="6" icon={<VideoCameraOutlined />}>
                    光电
                </Menu.Item>
            </Menu>
            <Menu mode="inline">
                <Menu.Item key="7" icon={<InfoCircleOutlined />}>
                    我是图例
                </Menu.Item>
                <Menu.Item key="8" icon={<MenuOutlined />}>
                    更多
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default LeftSider