"use client"
import { useEffect, useState } from "react";
import { Button, Table, Space, Tag, message } from "antd";
import Link from "next/link";

import Layout from "@/components/layout";
import { ShareStatus, Share as TShare } from "@/types";
import { showEmployeeShare } from "@/api";

import ShareForm from "./form";

import styles from './page.module.css';

type ShareData = TShare & { key: React.Key }

export default function Share() {
    const [share, setShare] = useState<TShare>()
    const [current, setCurrent] = useState<number>(1);
    const [dataSource, setDataSource] = useState<ShareData[]>([]);

    useEffect(() => {
        showEmployeeShare({ current, pageSize: 20}).then((res) => {
            if(res.data.code === 0) {
                const data = JSON.parse(res.data.data)
                setDataSource(data.map((i: TShare) => ({ ...i, key: i.ID})))
            } else {
                message.error(res.data.msg)
            }
        })
    }, [current])
    const columns = [
        {
            key: 'UserId',
            dataIndex: 'UserId',
            title: '用户ID',
            width: 100
        },
        {
            key: 'Name',
            dataIndex: 'Name',
            title: '阿姨姓名'
        },
        {
            key: 'Phone',
            dataIndex: 'Phone',
            title: '阿姨电话'
        },
        {
            key: 'EmployeeId',
            dataIndex: 'EmployeeId',
            title: '简历ID'
        },
        {
            key: 'Status',
            dataIndex: 'Status',
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
                        <Button 
                            type="link" 
                            onClick={() => { 
                                setShare(record)
                            }}
                        >
                            编辑
                        </Button>
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
        <Layout 
            title="分享管理" 
            extra={!!share && 
                <Button 
                    onClick={() => { 
                        setShare(undefined)
                    }}
                >
                    返回
                </Button>}>
            {!share ? 
                <Table 
                    columns={columns} 
                    dataSource={dataSource} 
                    pagination={{ 
                        hideOnSinglePage: true, 
                        pageSize: 20,
                        onChange(page) {
                            setCurrent(page)
                        }, 
                    }}
                /> : <ShareForm share={share}/>}
        </Layout>
    </>
}