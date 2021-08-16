import React from 'react';
import Map from './views/map';
import { Provider, connect } from 'react-redux';
import { store } from './redux/store';

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
      <div>
        <ConnectedMap />
      </div>
    </Provider>
  );
}

export default App;
