import React from "react"
import { Card, Switch, Form } from 'antd'

import './style.less'

function CornerInfoPanel(props) {
    const { dmsArr, showTarget, zoom } = props.data
    return (
        <div className="corner-info-panel">
            {dmsArr && <div className="top-wrap">
                <div>{dmsArr[0]}</div>
                <div>{dmsArr[1]}</div>
            </div>}
            <ul className="bottom-list">
                <li>
                    <label>目标开关：</label>
                    <Switch size="small" defaultChecked={showTarget} onChange={props.onToggleTarget} />
                </li>
                <li>
                    <label>目标数量：</label>
                    <span>0</span>
                </li>
                <li>
                    <label>视野目标：</label>
                    <span>0</span>
                </li>
                <li>{zoom}级</li>
                <li>
                    <label>轨迹开关：</label>
                    <Switch size="small" />
                </li>
            </ul>
        </div>
    )
}

export default CornerInfoPanel