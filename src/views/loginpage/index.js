import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { usersService } from "@/lib/services"
import { loginSuccess } from "@/lib/tools"
import { encryptPassword } from './tools';

import './style.less'

export default function LoginPage() {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    const login = async values => {
        const rst = await usersService.userLogin({
            socpe: 'all',
            grant_type: 'password',
            username: values.username,
            password: encryptPassword(values.password),
            tenantCode: 90001
        })
        loginSuccess(rst)
        if (values.username === 'tanj') {
            localStorage.setItem('entitlements', ['BIG_DATA', 'PHOTO_ELE_LIST'])
        }
        history.replace(from);
    }

    return (
        <div className="full-container login-page flex flex--center-cross">
            <main className="w420 mx-auto">
                <div className="logo w-full mb24 mt-neg120"></div>
                <p className="align-center color-white txt-h3">欢迎登录</p>
                <Form name="basic" onFinish={login}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入您的用户名!' }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入您的密码!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex" style={{ justifyContent: 'space-around' }}>
                            <Button htmlType="submit" style={{ marginRight: 0 }}>登 录</Button>
                            <Button htmlType="button" onClick={() => window.open("about:blank", "_self").close()}>退出</Button>
                        </div>
                    </Form.Item>
                </Form>
            </main>
            <footer className="align-center color-white fixed bottom w-full">
                <address>Copyright©2019-2021 三亚海兰寰宇海洋信息科技有限公司 版权所有</address>
            </footer>
        </div>
    )
}
