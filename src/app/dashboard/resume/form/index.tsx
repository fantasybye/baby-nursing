"use client"
import { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { editEmployee, showEmployeeDetail } from "@/api";
import { PreviewUploader } from "@/components/preview-uploader";

import styles from './index.module.css'
import { Resume } from "@/types";

const { Item } = Form;

export default function ResumeForm({ id } : { id?: string | null }) {
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if(id) {
            setLoading(true);
            showEmployeeDetail({
                id: Number(id),
                userId: 0
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
        <Form 
            form={form}
            labelCol={{ span: 4 }} 
            wrapperCol={{ span: 14 }} 
            onFinish={(values: Resume) => {
                editEmployee({
                     ...values, 
                     status: 1 
                }).then((res) => {
                    if(res.data.code === 0) {
                        message.success('提交成功')
                    } else {
                        message.error(res.data.msg)
                    }
                })
            }}
        >
            <h2 className={styles.subTitle}>基本信息</h2>
            <Item name="name" label="姓名">
                <Input placeholder="请输入姓名"/>
            </Item>
            <Item name="phone" label="电话">
                <Input placeholder="请输入电话"/>
            </Item>
            <Item name="wx" label="微信号">
                <Input placeholder="请输入微信号"/>
            </Item>
            <Item label="微信二维码" shouldUpdate>
                {({ getFieldValue }) => {
                    const wx_uri = getFieldValue('wx_uri');
                    return <Item name="wx_uri" >
                        <PreviewUploader value={[wx_uri]} max={6} onChange={(urls) => {if(urls.length === 1) form.setFieldsValue({wx_uri: urls[0]})}}/>
                    </Item>
                }}
             </Item>
            <Item name="birth_day" label="出生年月">
                <Input placeholder="请输入出生年月"/>
            </Item>
            <Item name="height" label="身高">
                <Input placeholder="请输入姓名" suffix="厘米"/>
            </Item>
            <Item name="edu" label="学历">
                <Input placeholder="请输入学历"/>
            </Item>
            <Item name="nation" label="民族">
                <Input placeholder="请输入民族"/>
            </Item>
            <Item name="birthplace" label="籍贯">
                <Input placeholder="请输入籍贯"/>
            </Item>
            <h2 className={styles.subTitle}>工作信息</h2>
            <Item name="employee_type" label="阿姨类型">
                <Radio.Group>
                    <Radio value={'月嫂'}>月嫂</Radio>
                    <Radio value={'育儿嫂'}>育儿嫂</Radio>
                </Radio.Group>
            </Item>
            <Item name="work_type" label="工作类型">
                <Input placeholder="请输入工作类型"/>
            </Item>
            <Item name="work_years" label="工作年限">
                <Input placeholder="请输入工作年限"/>
            </Item>
            <Item name="work_count" label="历史接单数目">
                <Input placeholder="请输入历史接单数目"/>
            </Item>
            {/* <Item label="接单城市" shouldUpdate>
                {({ getFieldValue, setFieldValue }) => {
                    const work_city = getFieldValue('work_city');
                    return  <Item name="work_city" >
                        <Input placeholder="请输入接单城市" value={work_city.join('，')} onChange={(e) => {setFieldValue('work_city', e.target.value.split('，'))}}/>
                    </Item>
                }}
             </Item> */}
            <Item name="WorkCity" label="接单城市">
                <Input placeholder="请输入接单城市"/>
            </Item>
            <Item name="work_exp" label="工作经历">
                <Input.TextArea placeholder="请输入工作经历"/>
            </Item>
            <Item name="introduction" label="自我介绍">
                <Input.TextArea placeholder="请输入自我介绍"/>
            </Item>
            <Item name="home" label="我的家庭">
                <Input.TextArea placeholder="请输入我的家庭"/>
            </Item>
            <Item name="domain" label="专业领域">
                <Input.TextArea placeholder="请输入专业领域"/>
            </Item>
            <Item name="character" label="性格优势">
                <Input.TextArea placeholder="请输入性格优势"/>
            </Item>
            <Item name="tag" label="圈子标签">
                <Input placeholder="请输入圈子标签"/>
            </Item>
            <Item name="salary" label="期望薪资">
                <Input placeholder="请输入期望薪资"/>
            </Item>
            <Item name="intent" label="工作意向">
                <Input placeholder="请输入工作意向"/>
            </Item>
            <h2 className={styles.subTitle}>图片信息</h2>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper} shouldUpdate>
                {({ getFieldValue }) => {
                    const head = getFieldValue('head');
                    return <Item name="head"  className={styles.uploaderItem} >
                        <div className={styles.uploaderDesc}>请上传阿姨的头像（最多可上传 1 张）</div>
                        <PreviewUploader value={[head]} onChange={(urls) => {if(urls.length === 1) form.setFieldsValue({head: urls[0]})}}/>
                    </Item>
                }}
            </Item>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper} shouldUpdate>
                {({ getFieldValue }) => {
                    const id_card = getFieldValue('id_card');
                    return <>
                     <Item name="id_card"  className={styles.uploaderItem} > 
                        <div className={styles.uploaderDesc}>请上传阿姨的身份证（正反面）</div>
                       <PreviewUploader value={!id_card || id_card === "" ? [] : id_card} max={2} onChange={(urls) => { form.setFieldsValue({id_card: urls})}}/>
                   </Item>
                     </>
                }}
            </Item>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper} shouldUpdate>
                {({ getFieldValue }) => {
                    const qualifications = getFieldValue('qualifications');
                    return <Item name="qualifications"  className={styles.uploaderItem} >
                        <div className={styles.uploaderDesc}>请上传阿姨的资格证书（最多可上传 6 张）</div>
                        <PreviewUploader value={!qualifications || qualifications === "" ? [] : qualifications} max={6}  onChange={(urls) => { form.setFieldsValue({qualifications: urls})}}/>
                    </Item>
                }}
            </Item>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper} shouldUpdate>
                {({ getFieldValue }) => {
                    const reviews = getFieldValue('reviews');
                    return <Item name="reviews"  className={styles.uploaderItem} >
                            <div className={styles.uploaderDesc}>请上传阿姨的评价截图（最多可上传 6 张）</div>
                            <PreviewUploader value={!reviews || reviews === "" ? [] : reviews} max={6}  onChange={(urls) => { form.setFieldsValue({reviews: urls})}}/>
                        </Item>
                }}
            </Item>
            <Item wrapperCol={{ offset: 4 }} className={styles.uploaderWrapper} shouldUpdate>
                {({ getFieldValue }) => {
                    const recommend = getFieldValue('recommend');
                    return <Item name="recommend"  className={styles.uploaderItem} >            
                            <div className={styles.uploaderDesc}>请上传阿姨的推荐帖（最多可上传 6 张）</div>
                            <PreviewUploader max={6} value={!recommend || recommend === "" ? [] : recommend} onChange={(urls) => { form.setFieldsValue({recommend: urls})}}/>
                        </Item>
                    }}
            </Item>
            <div className={styles.footer}>
                <Button htmlType="submit" type="primary" style={{ width: 160 }}>提交</Button>
            </div>
        </Form>
    )
}