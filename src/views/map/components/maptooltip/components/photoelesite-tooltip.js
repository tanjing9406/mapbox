import React from "react"
import { Row, Col } from "antd"

function PhotoEleSiteTooltip({ hoverInfo }) {
    const { x, y, object } = hoverInfo
    const {
        cameraName, longitude, latitude, height, workAreaRadius,
        resCameraStatus: {
            pan, tilt, status, underControl, controllerName, followTarget, trackTarget
        }
    } = object
    return (
        <div className="tooltip interactive round photoele_site-tooltip" style={{ left: x, top: y }}>
            <h3 className="txt-h5">{cameraName}</h3>
            <Row gutter={8}>
                <Col span={12}><label>经度：</label>{longitude.toFixed(3)}°</Col>
                <Col span={12}><label>纬度：</label>{latitude.toFixed(3)}°</Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}><label>高度：</label>{height}米</Col>
                <Col span={12}><label>范围：</label>{workAreaRadius}海里</Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}><label>水平角：</label>{(180 / Math.PI * Number(pan)).toFixed(2)}°</Col>
                <Col span={12}><label>倾斜角：</label>{(180 / Math.PI * Number(tilt)).toFixed(2)}°</Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}><label>光电状态：</label>{status == 1 ? '正常' : '故障'}</Col>
                <Col span={12}><label>控制状态：</label>{underControl ? '人工控制' : '空闲'}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={24}><label>目前控制人：</label>{controllerName || '无'}</Col>
            </Row>
            <Row gutter={8}>
                <Col span={24}><label>监控目标：</label>{followTarget || trackTarget || '无'}</Col>
            </Row>
            <Row className="flex mt6">
                <button className='btn round btn--green'>显示视频</button>
                <button className='btn round'>请求控制</button>
            </Row>
        </div>
    )
}

export default PhotoEleSiteTooltip