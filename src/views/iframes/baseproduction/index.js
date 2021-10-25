import React from "react"
import Iframe from 'react-iframe'

const iframe_url = 'http://localhost:4000/'

function BaseProduction() {

    const loaded = () => {
        const ifrm = document.getElementById('baseproduction-iframe').contentWindow;
        ifrm.postMessage({
            ACCESSTOKEN: '96f935bc-bf5c-4756-9ed7-07fb1b47583e',
            REFRESHTOKEN: '83766113-a3b2-4b3f-8aec-36f1e80b1b3c',
            EXPIRESIN: 83788,
            TOKENTYPE: 'bearer'
        }, iframe_url);
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
