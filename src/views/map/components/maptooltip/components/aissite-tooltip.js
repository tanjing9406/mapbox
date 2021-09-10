import { Row, Col } from "antd"
import React from "react"
import moment from "moment"

const stateMap = {
    1: '正常',
    2: '异常'
}
function AISSiteTooltip({ hoverInfo }) {
    const { x, y, object } = hoverInfo
    const { id, state, mode, longitude, latitude, timestamp } = object
    return (
        <div className="tooltip interactive round ais_site-tooltip" style={{ left: x, top: y }}>
            <h3 className="txt-h5">{object.aisName}</h3>
            <Row gutter={8}>
                <Col span={24}><label>AIS ID：</label>{id}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}><label>AIS 状态：</label>{stateMap[state]}</Col>
                <Col span={12}><label>AIS 模式：</label>{mode}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}><label>经度：</label>{longitude.toFixed(3)}°</Col>
                <Col span={12}><label>纬度：</label>{latitude.toFixed(3)}°</Col>
            </Row>
            <Row gutter={8}>
                <Col span={24}><label>刷新时间：</label>{moment(+timestamp).format('YYYY-MM-DD HH:mm:ss')}</Col>
            </Row>
        </div>
    )
}

export default AISSiteTooltip