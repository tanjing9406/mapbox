import React from 'react'
import Map from './views/map'
import { Provider, connect } from 'react-redux'
import { store } from './redux/store'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { HNHYLayout } from './components'

const { Content } = Layout
const { HNHYHeader, LeftSider, RightSider } = HNHYLayout

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
          <RightSider />
        </Layout>
      </Layout>
    </Provider>
  );
}

export default App;
