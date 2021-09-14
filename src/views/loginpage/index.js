import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { Form, Input, Button, Row, Col } from 'antd'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
}

export default function LoginPage() {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    const login = values => {
        sessionStorage.setItem('isAuthenticated', true)
        history.replace(from);
    }

    return (
        <div className="full-container" style={{ background: "aliceblue" }}>
            <Row style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}>
                <Col span={8} offset={8}>
                    <Form {...layout} name="basic" onFinish={login}>
                        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入您的用户名!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入您的密码!' }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <div className="flex" style={{ justifyContent: 'space-around' }}>
                                <Button htmlType="submit" style={{ marginRight: 0 }}>登 录</Button>
                                <Button htmlType="button" onClick={() => window.open("about:blank", "_self").close()}>退出</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
