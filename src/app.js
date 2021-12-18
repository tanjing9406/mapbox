import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { HNHYLayout, PrivateRoute } from 'Components'
import LoginPage from '@/views/loginpage'
import Map from '@/views/map'
import PopupsPage from '@/views/popupspage'
import MenuConfig from '@/config'
import { hasEntitlement } from '@/lib/tools'

function Comming() {
  return <div className="ml12 mt180 absolute z1 txt-xl color-blue px3">敬请期待</div>
}

const { Content } = Layout
const { HNHYHeader, LeftSider } = HNHYLayout

const genMenuRoute = () => {
  return MenuConfig.reduce((rst, curItem) => {
    if (!curItem.subMenu) {
      return [
        ...rst,
        hasEntitlement(curItem) && <Route key={curItem.id} path={curItem.url} component={curItem.component || Comming} />
      ]
    }
    return [
      ...rst,
      ...curItem.subMenu.map(i => hasEntitlement(i) && <Route key={i.id} path={i.url} component={i.component || Comming} />)
    ]
  }, [])
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/">
          <Provider store={store}>
            <Layout style={{ height: '100%', overflow: 'hidden' }}>
              <HNHYHeader />
              <Layout className="pr">
                <LeftSider />
                <Content className="pr">
                  <Map />
                  <PopupsPage />
                  <Switch>
                    <Route path='/' exact>
                      <Redirect to='/example/nodegraph' />
                    </Route>
                    {genMenuRoute()}
                  </Switch>
                  {/* <ConnectedMap /> */}
                </Content>
              </Layout>
            </Layout>
          </Provider>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
