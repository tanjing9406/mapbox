import React from "react"
import Iframe from 'react-iframe'

const iframe_url = 'http://10.100.0.122/'

function BaseProduction() {

    const loaded = () => {
        const ifrm = document.getElementById('baseproduction-iframe').contentWindow;
        ifrm.postMessage('96f935bc-bf5c-4756-9ed7-07fb1b47583e', iframe_url);
    }

    return (
        <Iframe id='baseproduction-iframe'
            url={iframe_url}
            position='absolute'
            width='100%'
            height='100%'
            onLoad={loaded} />
    )
}

export default BaseProduction
