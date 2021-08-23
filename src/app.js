import React from 'react'
import Map from './views/map'
import { Provider, connect } from 'react-redux'
import { store } from './redux/store'
import { Layout, Button, Menu, Col } from 'antd'
import {
  FullscreenOutlined, HomeOutlined, DeleteOutlined, AlertOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import { HNHYLayout } from './components'

const { Sider, Content } = Layout
const { HNHYHeader, LeftSider } = HNHYLayout

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
          <LeftSider />
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
