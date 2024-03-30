"use client"
import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import Link from "next/link";

import { showEmployee } from "@/api";
import { Resume as TResume } from "@/types";
import Layout from "@/components/layout";
import AddButton from "@/components/create-button";

import styles from './page.module.css';

type ResumeData = TResume & { key: React.Key }

export default function Resume() {
    const [dataSource, setDataSource] = useState<ResumeData[]>([]);
    const [current, setCurrent] = useState<number>(1);

    useEffect(() => {
        showEmployee({
            current,
            pageSize: 20
        }).then((res) => {
            if(res.data.code === 0) {
                const data = JSON.parse(res.data.data)
                setDataSource(data.map((i: TResume) => ({ ...i, key: i.ID})))
            } else {
                message.error(res.data.msg)
            }
        })
    } ,[current])
   
    const columns = [
        {
            key: 'ID',
            dataIndex: 'ID',
            title: '简历ID',
            width: '10%'
        },
        {
            key: 'EmployeeType',
            dataIndex: 'EmployeeType',
            title: '阿姨类型',
            width: '15%'
        },
        {
            key: 'Name',
            dataIndex: 'Name',
            title: '姓名',
            width: '25%',
        },
        {
            key: 'WorkCity',
            dataIndex: 'WorkCity',
            title: '接单城市',
            width: '25%',
            render: (_: string[]) => {
                return <div>{_?.join(',')}</div>
            }
        },
        {
            key: 'op',
            title: '操作',
            width: '10%',
            render: (_: unknown, record: any) => {
                return (
                    <Link href={`/dashboard/resume/${record.id}`}>
                        <Button type="link">
                            编辑
                        </Button>
                    </Link>
                )
            }
        },
        {
            key: 'isEffect',
            dataIndex: 'isEffect',
            title: '状态',
            width: '15%',
            render: (isEffect: boolean) => {
                return (
                    <Button type="link">{isEffect ? '生效' : '失效'}</Button>
                )
            }
        },
    ]
    return <>
        <Layout title="简历管理" extra={<AddButton href='/dashboard/resume/create' label="新增简历"/>}>
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
            />
        </Layout>
    </>
}