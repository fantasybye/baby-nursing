"use client"
import { useCallback, useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import Link from "next/link";

import { editEmployee, showEmployee } from "@/api";
import { ResumeStatus, Resume as TResume } from "@/types";
import Layout from "@/components/layout";
import AddButton from "@/components/create-button";

import styles from './page.module.css';

type ResumeData = TResume & { key: React.Key }

export default function Resume() {
    const [dataSource, setDataSource] = useState<ResumeData[]>([]);
    const [current, setCurrent] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const fetchData = useCallback(() => {
        showEmployee({
            current,
            pageSize: 15
        }).then((res) => {
            if(res.data.code === 0) {
                const data = JSON.parse(res.data.data)
                setDataSource(data.sort((a: TResume, b: TResume) => b.ID - a.ID).map((i: TResume) => ({ ...i, key: i.ID})))
                setTotal(res.data.total_page * 15)
            } else {
                message.error(res.data.msg)
            }
        })
    }, [current])

    useEffect(() => {
        fetchData();
    } ,[fetchData])
   
    const columns = [
        {
            key: 'ID',
            dataIndex: 'ID',
            title: '简历ID',
            width: '10%'
        },
        {
            key: 'employee_type',
            dataIndex: 'employee_type',
            title: '阿姨类型',
            width: '15%'
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: '姓名',
            width: '25%',
        },
        {
            key: 'work_city',
            dataIndex: 'work_city',
            title: '接单城市',
            width: '25%',
            render: (_: string[]) => {
                return <div>{!_?.length ? '-' :_?.join('，')}</div>
            }
        },
        {
            key: 'op',
            title: '操作',
            width: '10%',
            render: (_: unknown, record: any) => {
                return (
                    <Link href={`/dashboard/resume/edit?id=${record.ID}`}>
                        <Button type="link">
                            编辑
                        </Button>
                    </Link>
                )
            }
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            width: '15%',
            render: (status: number, record: any) => {
                return (
                    <Button type="link" onClick={() => {
                        editEmployee({ ...record, status: status === 2 ? 1 : 2}).then((res) => {
                            if(res.data.code === 0) {
                                message.success('提交成功')
                                fetchData();
                            } else {
                                message.error(res.data.msg)
                            }
                        })
                    }}>{status === ResumeStatus.Valid ? '生效' : '失效'}</Button>
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
                    current,
                    pageSize: 15,
                    total,
                    hideOnSinglePage: true, 
                    onChange(page) {
                        setCurrent(page)
                    }, 
                }}
            />
        </Layout>
    </>
}