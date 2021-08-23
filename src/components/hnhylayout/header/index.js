
import React from 'react'
import { Layout, Button, Menu, Divider } from 'antd'
import { QrcodeOutlined, UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons'

import './style.less'

const { Header } = Layout
const { SubMenu } = Menu

const HNHYHeader = function () {
    return (
        <Header className="page-header hnhy" theme="light">
            <div className="logo"><span>UNISEAS</span><span>海南寰宇</span></div>
            <div className="fl">
                <Menu className="hnhy-menu" mode="horizontal">
                    <Menu.Item key="1">大数据平台</Menu.Item>
                    <Menu.Item key="2">数据看板</Menu.Item>
                    <SubMenu key="SubMenu" icon={<MailOutlined />} title="案例展示">
                        <Menu.Item key="3" >风向图</Menu.Item>
                    </SubMenu>
                </Menu>
                <div className="right-btn-grp">
                    <Button type="link" className="btn" icon={<QrcodeOutlined />} /><Divider className="splite-line" type="vertical" />
                    <Button type="link" className="btn" icon={<UserOutlined />} /><Divider className="splite-line" type="vertical" />
                    <Button type="link" className="btn" icon={<LogoutOutlined />} />
                </div>
            </div>
        </Header>
    )
}

export default HNHYHeader