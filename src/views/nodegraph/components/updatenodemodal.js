import React, { useEffect, useState } from "react"
import { Modal, Form, Input } from "antd"
import ColorPicker from "@/components/colorpicker"

function UpdateNodeModal({ visible, updateNode, onCancel, node }) {
    const [form] = Form.useForm()
    const [color, setColor] = useState(node?.color)
    const onOk = () => {
        const formFieldsValue = form.getFieldsValue()
        const newNode = { ...node, ...formFieldsValue }
        updateNode(newNode)
    }

    const changeColor = (color, instance) => {
        setColor(color)
        form.setFieldsValue({ color })
    }

    useEffect(() => {
        setColor(node.color)
        form.setFieldsValue(node)
    }, [node])

    return (
        <Modal forceRender className="w360" title="修改属性" okText="确定" cancelText="取消" visible={visible} onOk={onOk} onCancel={onCancel} getContainer={false}>
            <Form name="node-update" form={form}>
                <Form.Item name="name" label="节点名称">
                    <Input />
                </Form.Item>
                <Form.Item name="color" label="节点颜色">
                    <ColorPicker color={color} onSave={changeColor} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateNodeModal

UpdateNodeModal.defaultProps = {
    visible: false,
    updateNode: () => { },
    onCancel: () => { },
    node: {}
}
