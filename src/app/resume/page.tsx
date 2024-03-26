"use client"
import { Button, Table } from "antd";
import Link from "next/link";

import Layout from "@/components/layout";
import AddButton from "@/components/create-button";

import styles from './page.module.css';

export default function Resume() {
    const dataSource = [
        {
            key: 1,
            id: 'JL001',
            type: '月嫂',
            name: '张阿姨',
            city: '杭州',
            isEffect: false,
        }
    ]
    const columns = [
        {
            key: 'id',
            dataIndex: 'id',
            title: '简历ID',
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: '阿姨类型'
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: '姓名'
        },
        {
            key: 'city',
            dataIndex: 'city',
            title: '接单城市'
        },
        {
            key: 'op',
            title: '操作',
            render: (_: unknown, record: any) => {
                return (
                    <Link href={`/resume/${record.id}`}>
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
            render: (isEffect: boolean) => {
                return (
                    <Button type="link">{isEffect ? '生效' : '失效'}</Button>
                )
            }
        },
    ]
    return <>
        <Layout title="简历管理" extra={<AddButton href='/resume/create' label="新增简历"/>}>
            <Table columns={columns} dataSource={dataSource} pagination={{ hideOnSinglePage: true }}/>
        </Layout>
    </>
}