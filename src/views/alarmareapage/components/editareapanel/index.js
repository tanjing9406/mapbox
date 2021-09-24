import React from "react"
import Draggable from 'react-draggable'
import { useDispatch } from "react-redux"
import { Form, Input, Button, Select, Radio, Collapse, Row, Col } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import { setVisiblePanel, setEditAreaId } from "@/redux/alarmareapageslice"
import "./style.less"

const { Panel } = Collapse
const { Option } = Select
function EditAreaPanel() {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const submitForm = () => {
        console.log(form.getFieldsValue())
        // form.submitForm()
    }

    const closeEditAreaPanel = () => {
        dispatch(setVisiblePanel(new Set(['alarmAreaList'])))
        dispatch(setEditAreaId(null))
    }

    const stopPropagationClick = e => {
        e.stopPropagation()
    }

    return (
        <Draggable
            defaultPosition={{ x: 10, y: 250 }}
        >
            <div className="editAreaPanel absolute bg-white w360">
                <div className="h36 flex flex--center-cross txt-h5 ml12">编辑区域</div>
                <Form
                    name="editAreaForm"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    form={form}
                >
                    <div className="content py12 px18">
                        <Form.Item name="areaName" label="名称" rules={[{ required: true, message: '请输入正确的区域名称' }]}>
                            <Input placeholder="请输入区域名称" />
                        </Form.Item>
                        <Form.Item name="groupName" label="组名">
                            <Input placeholder="请选择分组" />
                        </Form.Item>
                        <Form.Item name="areaShape" label="形状" rules={[{ required: true, message: '请选择形状' }]}>
                            <Radio.Group className="areaShapeGroup-wrap">
                                <Radio.Button value="line">
                                    <div className="icon-wrap">
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-line" />
                                        </svg>
                                    </div>
                                </Radio.Button>
                                <Radio.Button value="circle">
                                    <div className="icon-wrap">
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-circle" />
                                        </svg>
                                    </div>
                                </Radio.Button>
                                <Radio.Button value="polygon">
                                    <div className="icon-wrap">
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-polygon" />
                                        </svg>
                                    </div>
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Collapse
                            // defaultActiveKey={['1']}
                            expandIconPosition="right"
                            expandIcon={panelProps => {
                                return panelProps.isActive ? <UpOutlined /> : <DownOutlined />
                            }}
                            ghost
                        >
                            <Panel
                                header={
                                    <div className="flex flex--center-cross flex--space-between-main">
                                        <span>编辑坐标</span>
                                        <div onClick={stopPropagationClick}>
                                            <Button type="link">下载模版</Button>
                                            <Button type="link" size="small">导入坐标</Button>
                                        </div>
                                    </div>
                                }
                                key="2"
                            >
                                敬请期待
                            </Panel>
                            <Panel
                                header="颜色样式"
                                key="1"
                            >
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item name="areaOutsideColor" label="边框颜色" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                                            <Input type="color" placeholder="请选择分组" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="areaOutsideOpacity" label="边框不透明度" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item name="areaOutsideStyle" label="边框样式" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                    <Select>
                                        <Option value="实线">实线</Option>
                                        <Option value="虚线">虚线</Option>
                                        <Option value="粗线">粗线</Option>
                                    </Select>
                                </Form.Item>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item name="areaInsideColor" label="填充颜色" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                                            <Input type="color" placeholder="请选择分组" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="areaInsideOpacity" label="填充不透明度" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className="bottom-button-wrap flex--space-evenly flex py12 px30 pb24">
                        <button className='btn round' onClick={submitForm}>保存</button>
                        <button className='btn round btn--gray-light' onClick={closeEditAreaPanel}>取消</button>
                    </div>
                </Form>
            </div>
        </Draggable>
    )
}

export default EditAreaPanel