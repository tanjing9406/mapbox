import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { InfoCircleOutlined, MenuOutlined } from '@ant-design/icons'
import { Legend } from 'Components'
import { LEFT_TOP_MENU_CONFIG } from '@/config/left-top-menu'
import { LEFT_BOTTOM_MENU_CONFIG } from '@/config/left-bottom-menu'
import { WithSiderVisibleCheckHoc } from 'Components/withVisibleCheckHoc'
import { hasEntitlement } from '@/lib/tools'

import './style.less'

const { Sider } = Layout

const LeftSider = function (props) {
    const selectedKey = useLocation().pathname.slice(1)
    return (
        <Sider className="page-left-sider-wrapper hnhy" collapsible collapsed={true} trigger={null} collapsedWidth={56}>
            <Menu selectedKeys={[selectedKey]} mode="inline">
                {LEFT_TOP_MENU_CONFIG.map(menuItem => (
                    hasEntitlement(menuItem) && <Menu.Item key={menuItem.id} icon={<menuItem.icon />} title={menuItem.title}>
                        <Link to={menuItem.url}></Link>
                    </Menu.Item>
                ))}
            </Menu>
            <Menu selectedKeys={[selectedKey]} mode="inline"
                // openKeys={['2']}
                builtinPlacements={{ rightTop: { points: ['bl', 'br'], offset: [10, -10] } }}>
                <Menu.SubMenu key='1' icon={<InfoCircleOutlined />} title="图例说明">
                    <Menu.ItemGroup title="图例说明">
                        <Menu.Item key='1-2'>
                            <Legend />
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu.SubMenu>
                <Menu.SubMenu key="2" icon={<MenuOutlined />} title="更多">
                    <Menu.ItemGroup title="更多">
                        {LEFT_BOTTOM_MENU_CONFIG[0].subMenu.map(menuItem => (
                            <React.Fragment key={menuItem.id} >
                                {hasEntitlement(menuItem) && <Menu.Item key={menuItem.id} icon={<menuItem.icon />}>
                                    <Link to={menuItem.url}>{menuItem.title}</Link>
                                </Menu.Item>}
                                {menuItem.nextIsDivider && <Menu.Divider />}
                            </React.Fragment>
                        ))}
                    </Menu.ItemGroup>
                </Menu.SubMenu>
            </Menu>
        </Sider>
    )
}

export default WithSiderVisibleCheckHoc(LeftSider)