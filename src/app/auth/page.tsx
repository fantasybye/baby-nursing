"use client"
import { useRef } from "react";
import { Button, Table } from "antd";

import Layout from "@/components/layout";
import { ModalRef, AuthItem } from "@/types";

import { AuthModal } from "./modal";

import styles from './page.module.css';



export default function Auth() {
    const ref = useRef<ModalRef<AuthItem>>(null)
    const dataSource=[
        {
            key: 1,
            authId: "阿里",
            email: "@taobao.com"
        }
    ]
    const columns = [
        {
            key: 'authId',
            dataIndex: 'authId',
            title: '认证标',
            width: 100
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: '邮箱后缀'
        },
        {
            key: 'op',
            title: '操作',
            width: 100,
            render: (_: unknown, record: any) => {
                return (
                    <Button 
                        type="link" 
                        onClick={() => { 
                            if(ref.current) {
                                ref.current.show(record);
                            } 
                        }}>
                        编辑
                    </Button>
                )
            }
        },
    ]
    return <>
        <Layout title="认证管理" extra={<Button type="primary" onClick={() => { ref.current?.show() }}>新增认证</Button>}>
            <Table dataSource={dataSource} columns={columns} pagination={{ hideOnSinglePage: true }}/>
        </Layout>
        <AuthModal ref={ref} />
    </>
}