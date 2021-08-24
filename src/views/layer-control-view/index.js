import React from 'react'
import { connect } from 'react-redux'
import { Optionsfield } from 'Components'
import { setActiveLayerOption, setActiveThemeOption, setActiveModeOption } from '../../redux/action-creators'

const ConnectedLayerOptionsfield = connect(mapStateToPropsLayerOptionsfield)(
    Optionsfield
);

function mapStateToPropsLayerOptionsfield(state) {
    return {
        options: state.layerOptions,
        active: state.activeLayer
    };
}

const ConnectedThemeOptionsfield = connect(mapStateToPropsThemeOptionsfield)(
    Optionsfield
);

function mapStateToPropsThemeOptionsfield(state) {
    return {
        options: state.themeOptions,
        active: state.activeTheme
    };
}

const ConnectedModeOptionsfield = connect(mapStateToPropsModeOptionsfield)(
    Optionsfield
);

function mapStateToPropsModeOptionsfield(state) {
    return {
        options: state.modeOptions,
        active: state.activeMode
    };
}

const LayerControlView = () => {

    return (
        <>
            <ConnectedLayerOptionsfield changeState={setActiveLayerOption} className="ml12 mt12" />
            <ConnectedThemeOptionsfield changeState={setActiveThemeOption} className="ml12 mt120" />
            <ConnectedModeOptionsfield changeState={setActiveModeOption} className="ml240 mt120" />
        </>
    )
}

export default LayerControlView