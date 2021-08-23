import React from 'react'
import Map from './views/map'
import { Provider, connect } from 'react-redux'
import { store } from './redux/store'
import { Layout, Button, Menu, Divider, Row, Col } from 'antd'
import {
  SearchOutlined, UnorderedListOutlined, FilterOutlined, HistoryOutlined, LineChartOutlined, VideoCameraOutlined, InfoCircleOutlined, MenuOutlined,
  QrcodeOutlined, UserOutlined, LogoutOutlined,
  FullscreenOutlined, HomeOutlined, DeleteOutlined, AlertOutlined,
  MailOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import SubMenu from 'antd/lib/menu/SubMenu'

const { Header, Sider, Content } = Layout

const ConnectedMap = connect(mapStateToProps)(Map);

function mapStateToProps(state) {
  return {
    activeLayer: state.activeLayer,
    activeTheme: state.activeTheme,
    activeMode: state.activeMode
  };
}

function App() {
  return (
    <Provider store={store}>
      <Layout style={{ height: '100%' }}>
        <Header className="page-header" theme="light" style={{
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1277BE', height: 42, lineHeight: '42px'
        }}>
          <div className="logo"><span>UNISEAS</span><span>海南寰宇</span></div>
          <div style={{ width: '45%' }} />
          <Menu mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">大数据平台</Menu.Item>
            <Menu.Item key="2">数据看板</Menu.Item>
            <SubMenu key="SubMenu" icon={<MailOutlined />} title="案例展示">
              <Menu.Item key="3" >风向图</Menu.Item>
            </SubMenu>
          </Menu>
          <div>
            <Button type="primary" icon={<QrcodeOutlined />} /><Divider type="vertical" />
            <Button type="primary" icon={<UserOutlined />} /><Divider type="vertical" />
            <Button type="primary" icon={<LogoutOutlined />} />
          </div>
        </Header>
        <Layout className="page-content">
          <Sider className="page-left-sider-wrapper" collapsible collapsed={true} trigger={null} collapsedWidth={56}>
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
          <Content>
            <ConnectedMap />
          </Content>
          <Sider className="page-right-sider-wrapper" collapsible collapsed={true} trigger={null} collapsedWidth={56}>
            <Col span={2}>
              <Button type="primary" icon={<FullscreenOutlined />} />
            </Col>
            <Col span={6}>
              <Button type="primary" icon={<HomeOutlined />} />
              <Button type="primary" icon={<HomeOutlined />} />
              <Button type="primary" icon={<HomeOutlined />} />
              <Button type="primary" icon={<HomeOutlined />} />
              <Button type="primary" icon={<HomeOutlined />} />
              <Button type="primary" icon={<DeleteOutlined />} />
            </Col>
            <Col span={15} />
            <Col span={1}>
              <Button type="primary" icon={<AlertOutlined />} />
            </Col>
          </Sider>
        </Layout>
      </Layout>
    </Provider>
  );
}

export default App;
