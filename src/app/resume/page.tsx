import { Table } from "antd";

import Layout from "@/components/layout";
import AddButton from "@/components/create-button";

import styles from './page.module.css';

export default function Resume() {
    return <>
        <Layout title="简历管理" extra={<AddButton href='/resume/create' label="新增简历"/>}>
            <Table />
        </Layout>
    </>
}