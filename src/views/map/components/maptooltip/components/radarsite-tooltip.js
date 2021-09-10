import React from "react"
import { Row, Col } from "antd"
import moment from "moment"

const stateMap = {
    1: '正常',
    2: '没有数据',
    3: '没有链接',
    4: '没有收到数据/秒'
}

function RadarSiteTooltip({ hoverInfo }) {
    const { x, y, object } = hoverInfo
    const { radarName, state, period, mode, height, timestamp } = object
    return (
        <div className="tooltip interactive round radar_site-tooltip" style={{ left: x, top: y }}>
            <h3 className="txt-h5">{radarName}</h3>
            <Row gutter={8}>
                <Col span={12}><label>雷达状态：</label>{stateMap[state] || '--'}</Col>
                <Col span={12}><label>周期：</label>{period}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}><label>雷达模式：</label>{mode}</Col>
                <Col span={12}><label>雷达高度：</label>{height}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={24}><label>刷新时间：</label>{moment(+timestamp).format('YYYY-MM-DD HH:mm:ss')}</Col>
            </Row>
            <Row className="flex mt6">
                <button className='btn round btn--green'>显示回波</button>
                <button className='btn round'>显示尾迹</button>
            </Row>
        </div>
    )
}

export default RadarSiteTooltip