import React from 'react'
import { Layout, Col, Button } from 'antd'
import { FullscreenOutlined, HomeOutlined, DeleteOutlined, AlertOutlined } from '@ant-design/icons'

import './style.less'

const { Sider } = Layout

const RightSider = function () {
    return (
        <Sider className="page-right-sider-wrapper hnhy" collapsible collapsed={true} trigger={null} collapsedWidth={56}>
            <Col span={2}>
                <Button type="primary" icon={<FullscreenOutlined />} />
            </Col>
            <Col span={6}>
                <Button type="primary" icon={<HomeOutlined />} />
                <Button type="primary" icon={<HomeOutlined />} />
                <Button type="primary" icon={<HomeOutlined />} />
                <Button type="primary" icon={<HomeOutlined />} />
                <Button type="primary" icon={<HomeOutlined />} />
                <Button type="primary" icon={<DeleteOutlined />} />
            </Col>
            <Col span={15} />
            <Col span={1}>
                <Button type="primary" icon={<AlertOutlined />} />
            </Col>
        </Sider>
    )
}

export default RightSider