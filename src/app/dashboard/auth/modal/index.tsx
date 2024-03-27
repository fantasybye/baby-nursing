"use client"
import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { Form, Input, Modal } from "antd"

import { ModalRef, AuthItem } from "@/types"

import styles from './index.module.css';

const { Item } = Form;

export const AuthModal = forwardRef(function Mo(_, ref: React.Ref<ModalRef<AuthItem>>) {
    const [form] = Form.useForm();
    const [auth, setAuth] = useState<AuthItem>();
    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => (
        {
            show: (item?: AuthItem) => {
                setVisible(true);
                setAuth(item);
            }
        }
    ))

    useEffect(() => {
        if(auth) {
           form.setFieldsValue({ ...auth })
        }
    }, [auth, form])

    return (
        <Modal 
            title={!!auth ? '编辑认证' : '新增认证'}
            open={visible}
            okText="确定"
            cancelText="取消"
            maskClosable={false}
            mask={false}
            onCancel={() => {
                setAuth(undefined);
                setVisible(false);
                form.setFieldsValue({ authId: undefined, email: undefined })
            }}
            onOk={() => {
                alert(JSON.stringify(form.getFieldsValue()));
            }}
        >
            <div className={styles.container}>
                <Form form={form} labelCol={{ span: 4 }}>
                    <Item name="authId"  label="认证标">
                        <Input />
                    </Item>
                    <Item name="email" label="邮箱后缀">
                        <Input />
                    </Item>
                </Form>
            </div>
        </Modal>
    );
})