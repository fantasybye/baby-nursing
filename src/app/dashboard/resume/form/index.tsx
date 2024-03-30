"use client"
import { useEffect, useState } from "react";
import { Form, Input, Radio, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { showEmployeeDetail } from "@/api";
import { PreviewUploader } from "@/components/preview-uploader";

import styles from './index.module.css'

const { Item } = Form;

export default function ResumeForm({ id } : { id?: string }) {
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if(id) {
            setLoading(true);
            showEmployeeDetail({
                id: Number(id)
            }).then((res) => {
                if(res.data.code === 0) {
                    form.setFieldsValue({ ...JSON.parse(res.data.data) })
                } else {
                    message.error(res.data.msg)
                }
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }, [form, id])
    if(loading)
        return <Spin spinning/>

    return (
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
            <h2 className={styles.subTitle}>基本信息</h2>
            <Item name="Name" label="姓名">
                <Input placeholder="请输入姓名"/>
            </Item>
            <Item name="Phone" label="电话">
                <Input placeholder="请输入电话"/>
            </Item>
            <Item name="Wx" label="微信号">
                <Input placeholder="请输入微信号"/>
            </Item>
            <Item name="WxUri" label="微信二维码">
                <PreviewUploader max={6}/>
            </Item>
            <Item name="BirthDay" label="出生年月">
                <Input placeholder="请输入出生年月"/>
            </Item>
            <Item name="Height" label="身高">
                <Input placeholder="请输入姓名" suffix="厘米"/>
            </Item>
            <Item name="Edu" label="学历">
                <Input placeholder="请输入学历"/>
            </Item>
            <Item name="Nation" label="民族">
                <Input placeholder="请输入民族"/>
            </Item>
            <Item name="Birthplace" label="籍贯">
                <Input placeholder="请输入籍贯"/>
            </Item>
            <h2 className={styles.subTitle}>工作信息</h2>
            <Item name="EmployeeType" label="阿姨类型">
                <Radio.Group onChange={() => {}}>
                    <Radio value={0}>月嫂</Radio>
                    <Radio value={1}>育儿嫂</Radio>
                </Radio.Group>
            </Item>
            <Item name="WorkType" label="工作类型">
                <Input placeholder="请输入工作类型"/>
            </Item>
            <Item name="WorkYears" label="工作年限">
                <Input placeholder="请输入工作年限"/>
            </Item>
            <Item name="WorkCount" label="历史接单数目">
                <Input placeholder="请输入历史接单数目"/>
            </Item>
            <Item name="WorkCity" label="接单城市">
                <Input placeholder="请输入接单城市"/>
            </Item>
            <Item name="WorkExp" label="工作经历">
                <Input.TextArea placeholder="请输入工作经历"/>
            </Item>
            <Item name="Introduction" label="自我介绍">
                <Input.TextArea placeholder="请输入自我介绍"/>
            </Item>
            <Item name="Home" label="我的家庭">
                <Input.TextArea placeholder="请输入我的家庭"/>
            </Item>
            <Item name="Domain" label="专业领域">
                <Input.TextArea placeholder="请输入专业领域"/>
            </Item>
            <Item name="Character" label="性格优势">
                <Input.TextArea placeholder="请输入性格优势"/>
            </Item>
            <Item name="Tag" label="圈子标签">
                <Input placeholder="请输入圈子标签"/>
            </Item>
            <Item name="Salary" label="期望薪资">
                <Input placeholder="请输入期望薪资"/>
            </Item>
            <Item name="Intent" label="工作意向">
                <Input placeholder="请输入工作意向"/>
            </Item>
            <h2 className={styles.subTitle}>图片信息</h2>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper}>
                <div className={styles.uploaderDesc}>请上传阿姨的头像（最多可上传 1 张）</div>
                <PreviewUploader />
            </Item>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper}>
                <div className={styles.uploaderDesc}>请上传阿姨的资格证书（最多可上传 6 张）</div>
                <PreviewUploader max={6}/>
            </Item>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper}>
                <div className={styles.uploaderDesc}>请上传阿姨的工作照或者月子餐照（最多可上传 6 张）</div>
                <PreviewUploader max={6}/>
            </Item>
        </Form>
    )
}