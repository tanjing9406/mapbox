import React from 'react'
import Map from './views/map'
import { Provider, connect } from 'react-redux'
import { store } from './redux/store'
import { Layout, Button, Menu, Col } from 'antd'
import {
  SearchOutlined, UnorderedListOutlined, FilterOutlined, HistoryOutlined, LineChartOutlined, VideoCameraOutlined, InfoCircleOutlined, MenuOutlined,
  FullscreenOutlined, HomeOutlined, DeleteOutlined, AlertOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import { HNHYLayout } from './components'

const { Sider, Content } = Layout
const { HNHYHeader } = HNHYLayout

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
        <HNHYHeader />
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
