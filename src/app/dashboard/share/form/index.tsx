"use client"
import { Empty, Form, Input, Space, Tag, Image, message, Button } from "antd";
import { useForm } from "antd/es/form/Form";

import { Share, ShareStatus } from "@/types";
import { editEmployeeShare } from "@/api";

import styles from './index.module.css'

const { Item } = Form;

export default function ShareForm({ share, backward } : { share?: Share, backward: () => void }) {
    const [form] = useForm();
    if(!share) {
        return <Empty description="没有找到对应的分享" />
    }
    return <Form form={form} labelCol={{ span: 4 }} onFinish={(vals) => {
        editEmployeeShare({ID: share.ID, status: share.status, employee_id: Number(vals.employee_id) })
            .then((res) => {
                if(res.data.code === 0) {
                    message.success('分享通过')
                    backward();
                } else {
                    message.error(res.data.msg)
                }
            })
    }}>  
        <Item label="用户ID">
            {share.user_id}
        </Item>
        <Item label="阿姨姓名">
            {share.name}
        </Item>
        <Item label="阿姨电话">
            {share.phone}
        </Item>
        <Item label="状态">
            {(() => {
                 switch(share.status) {
                    case ShareStatus.Pass: return <Tag color="success">通过</Tag> 
                    case ShareStatus.Fail: return <Tag color="error">不通过</Tag> 
                    case ShareStatus.Wait:
                    default:  return <Tag color="processing">待审核</Tag> 
                }
            })()}
        </Item>
        <Item name="employee_id" label="简历ID" initialValue={share.employee_id}>
            <Input placeholder="请输入关联的简历ID" style={{width: 200}}/>
        </Item>
        <Item label="推荐理由">
            {share.reason}
        </Item>
        <Item label="上传图片">
            <Space>{(JSON.parse(share.cv ?? []) as string[])?.map((img) => <Image alt="" key={img} width={64} src={img} />)}</Space>
        </Item>
        <div className={styles.footer}>
            <Button htmlType="submit" type="primary" style={{ width: 160 }}>提交</Button>
        </div>
    </Form>
}