"use client"
import { Button, Table, Space, Tag } from "antd";
import Link from "next/link";

import Layout from "@/components/layout";
import { ShareStatus } from "@/types";

import styles from './page.module.css';

export default function Share() {
    const dataSource = [
        {
            key: 1,
            id: 1,
            userId: 123,
            name: '张阿姨',
            phone: 11122233345,
            resumeId: 'JL001',
            status: ShareStatus.Fail
        }
    ]
    const columns = [
        {
            key: 'userId',
            dataIndex: 'userId',
            title: '用户ID',
            width: 100
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: '阿姨姓名'
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: '阿姨电话'
        },
        {
            key: 'resumeId',
            dataIndex: 'resumeId',
            title: '简历ID'
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            render: (status: ShareStatus) => {
                switch(status) {
                    case ShareStatus.Pass: return <Tag color="success">通过</Tag> 
                    case ShareStatus.Fail: return <Tag color="error">不通过</Tag> 
                    case ShareStatus.Wait: return <Tag color="processing">待审核</Tag> 
                    default: return <></>
                }
            }
        },
        {
            key: 'op',
            title: '操作',
            width: 300,
            render: (_: unknown, record: any) => {
                return (
                    <Space size="middle">
                        <Link href={`/share/${record.id}`}>
                            <Button type="link">
                                编辑
                            </Button>
                        </Link>
                        <Button 
                            type="link" 
                            onClick={() => { 
                            }}>
                            通过
                        </Button>
                        <Button 
                            type="link" 
                            onClick={() => { 
                            }}>
                            不通过
                        </Button>
                    </Space>
                )
            }
        },
    ]
    return <>
        <Layout title="分享管理">
            <Table columns={columns} dataSource={dataSource} pagination={{ hideOnSinglePage: true }}/>
        </Layout>
    </>
}