"use client"
import { useCallback, useEffect, useState } from "react";
import { Button, Table, Space, Tag, message } from "antd";
import Link from "next/link";

import Layout from "@/components/layout";
import { ShareStatus, Share as TShare } from "@/types";
import { editEmployeeShare, showEmployeeShare } from "@/api";

import ShareForm from "./form";

import styles from './page.module.css';

type ShareData = TShare & { key: React.Key }

export default function Share() {
    const [share, setShare] = useState<TShare>()
    const [current, setCurrent] = useState<number>(1);
    const [dataSource, setDataSource] = useState<ShareData[]>([]);

    const fetchData = useCallback(() => {
        showEmployeeShare({ current, pageSize: 20}).then((res) => {
            if(res.data.code === 0) {
                const data = JSON.parse(res.data.data)
                setDataSource(data.map((i: TShare) => ({ ...i, key: i.ID})))
            } else {
                message.error(res.data.msg)
            }
        })
    }, [current])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const columns = [
        {
            key: 'ID',
            dataIndex: 'ID',
            title: 'ID',
            width: 100
        },
        {
            key: 'user_id',
            dataIndex: 'user_id',
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
            key: 'employee_id',
            dataIndex: 'employee_id',
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
                                editEmployeeShare({ ...record, status: 1 })
                                .then((res) => {
                                    if(res.data.code === 0) {
                                        message.success('分享通过');
                                        fetchData();
                                    } else {
                                        message.error(res.data.msg)
                                    }
                                })
                            }}>
                            通过
                        </Button>
                        <Button 
                            type="link" 
                            onClick={() => { 
                                editEmployeeShare({  ...record, status: 2 })
                                .then((res) => {
                                    if(res.data.code === 0) {
                                        message.warning('分享不通过')
                                        fetchData();
                                    } else {
                                        message.error(res.data.msg)
                                    }
                                })
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
                /> : <ShareForm share={share} backward={() => { setShare(undefined);  fetchData(); }}/>}
        </Layout>
    </>
}