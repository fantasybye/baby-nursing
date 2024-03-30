"use client"
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from 'next/navigation'

import { login } from "@/api";

import styles from './index.module.css';

const { Item } = Form;

export default function LoginForm() {
    const router = useRouter()
    const [form] = useForm();

    return <Form form={form} labelCol={{ span: 6 }} onFinish={(vals) => {
        login(vals).then((res) => {
            if(res.data.code === 0) {
                router.push('/dashboard')
            }
        })
    }}>  
        <Item name="user_name" label="用户名">
            <Input placeholder="请输入用户名"/>
        </Item>
        <Item name="password" label="密码">
            <Input.Password placeholder="请输入密码"/>
        </Item>
        <div className={styles.buttonWrapper}>
            <Button htmlType="submit">登录</Button>
        </div>
    </Form>
}