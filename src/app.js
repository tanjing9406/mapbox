import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Map from '@/views/map'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { HNHYLayout } from 'Components'
import MenuConfig from '@/config'

const { Content } = Layout
const { HNHYHeader, LeftSider } = HNHYLayout

const genMenuRoute = () => {
  return MenuConfig.reduce((rst, curItem) => {
    if (!curItem.subMenu) {
      return [
        ...rst,
        <Route key={curItem.id} path={curItem.url} component={curItem.component} />
      ]
    }
    return [
      ...rst,
      ...curItem.subMenu.map(i => <Route key={i.id} path={i.url} component={i.component} />)
    ]
  }, [])
}

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login" component={LoginPage} /> */}
        {/* <PrivateRoute path="/"> */}
        <Provider store={store}>
          <Layout style={{ height: '100%', overflow: 'hidden' }}>
            <HNHYHeader />
            <Layout className="pr">
              <LeftSider />
              <Content className="pr">
                <Map />
                <Switch>
                  <Route path='/' exact>
                    <Redirect to='/targetsearch' />
                  </Route>
                  {genMenuRoute()}
                </Switch>
                {/* <ConnectedMap /> */}
              </Content>
            </Layout>
          </Layout>
        </Provider>
        {/* </PrivateRoute> */}
      </Switch>
    </Router>
  );
}

export default App;
