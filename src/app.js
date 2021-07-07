import React from 'react';
import Map from './Map';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { connect } from 'react-redux';

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
