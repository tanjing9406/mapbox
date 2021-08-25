
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Button, Menu, Divider } from 'antd'
import { QrcodeOutlined, UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons'
import { TOP_MENU } from '@/config/top-menu'

import './style.less'

const { Header } = Layout
const { SubMenu } = Menu

const HNHYHeader = function (props) {
    const selectedKey = props.location.pathname.slice(1)
    return (
        <Header className="page-header hnhy" theme="light">
            <Link to="/"><div className="logo"><span>UNISEAS</span><span>海南寰宇</span></div></Link>
            <div className="fl">
                <Menu selectedKeys={[selectedKey]} className="hnhy-menu" mode="horizontal">
                    {TOP_MENU.map(item => {
                        if (item.subMenu) {
                            return <SubMenu key={item.id} icon={<MailOutlined />} title={item.title}>
                                {item.subMenu.map(sItem => <Menu.Item key={sItem.id}><Link to={sItem.url}>{sItem.title}</Link></Menu.Item>)}
                            </SubMenu>
                        }
                        return <Menu.Item key={item.id}><Link style={{ color: 'inherit' }} to={item.url}>{item.title}</Link></Menu.Item>
                    })}
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

export default withRouter(HNHYHeader)