"use client"
import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Radio, Select, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";

import { editEmployee, showEmployeeDetail } from "@/api";
import { Resume } from "@/types";
import { PreviewUploader } from "@/components/preview-uploader";

import styles from './index.module.css'

const { Item } = Form;
const { Option } = Select;

export default function ResumeForm({ id } : { id?: string | null }) {
    const [form] = useForm();
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback((id: string) => {
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
    }, [form])

    useEffect(() => {
        if(id) {
            fetchData(id)
        }
    }, [fetchData, form, id])
    if(loading)
        return <Spin spinning/>

    return (
        <Form 
            form={form}
            labelCol={{ span: 4 }} 
            wrapperCol={{ span: 14 }} 
            onFinish={(values: Resume) => {
                const input = !!id ? { ...values, ID: Number(id) } : { ...values };
                editEmployee({
                     ...input, 
                     height: Number(input.height),
                     work_count: Number(input.work_count),
                     work_years: Number(input.work_years),
                     status: 1 
                }).then((res) => {
                    if(res.data.code === 0) {
                        message.success('提交成功')
                        router.push('/dashboard/resume')
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
                <Select placeholder="请选择学历">
                    <Option value="小学及以下">小学及以下</Option>
                    <Option value="初中">初中</Option>
                    <Option value="高中">高中</Option>
                    <Option value="中专">中专</Option>
                    <Option value="大专">大专</Option>
                    <Option value="本科">本科</Option>
                    <Option value="硕士及以上">硕士及以上</Option>
                </Select>
            </Item>
            <Item name="nation" label="民族">
                <Select placeholder="请选择民族">
                    <Option value="汉族">汉族</Option>
                    <Option value="少数民族">少数民族</Option>
                </Select>
            </Item>
            <Item name="birthplace" label="籍贯">
                <Select placeholder="请选择籍贯" showSearch>
                    <Option value="河北">河北</Option>
                    <Option value="山西">山西</Option>
                    <Option value="辽宁">辽宁</Option>
                    <Option value="吉林">吉林</Option>
                    <Option value="黑龙江">黑龙江</Option>
                    <Option value="江苏">江苏</Option>
                    <Option value="浙江">浙江</Option>
                    <Option value="安徽">安徽</Option>
                    <Option value="福建">福建</Option>
                    <Option value="江西">江西</Option>
                    <Option value="山东">山东</Option>
                    <Option value="河南">河南</Option>
                    <Option value="湖北">湖北</Option>
                    <Option value="湖南">湖南</Option>
                    <Option value="广东">广东</Option>
                    <Option value="海南">海南</Option>
                    <Option value="四川">四川</Option>
                    <Option value="贵州">贵州</Option>
                    <Option value="云南">云南</Option>
                    <Option value="陕西">陕西</Option>
                    <Option value="甘肃">甘肃</Option>
                    <Option value="青海">青海</Option>
                    <Option value="台湾">台湾</Option>
                    <Option value="内蒙古">内蒙古</Option>
                    <Option value="广西">广西</Option>
                    <Option value="西藏">西藏</Option>
                    <Option value="宁夏">宁夏</Option>
                    <Option value="新疆">新疆</Option>
                    <Option value="北京">北京</Option>
                    <Option value="天津">天津</Option>
                    <Option value="上海">上海</Option>
                    <Option value="重庆">重庆</Option>
                </Select>
            </Item>
            <h2 className={styles.subTitle}>工作信息</h2>
            <Item name="employee_type" label="阿姨类型">
                <Radio.Group>
                    <Radio value={'月嫂'}>月嫂</Radio>
                    <Radio value={'育儿嫂'}>育儿嫂</Radio>
                </Radio.Group>
            </Item>
            <Item name="work_type" label="工作类型">
                <Radio.Group>
                    <Radio value={'住家'}>住家</Radio>
                    <Radio value={'白班'}>白班</Radio>
                </Radio.Group>
            </Item>
            <Item name="work_years" label="工作年限">
                <Input placeholder="请输入工作年限"/>
            </Item>
            <Item name="work_count" label="历史接单数目">
                <Input placeholder="请输入历史接单数目"/>
            </Item>
            <Item name="work_city" label="接单城市">
                <Select placeholder="请选择接单城市(可多选) " mode="multiple" showSearch>
                    <Option value="广州">广州</Option>
                    <Option value="深圳">深圳</Option>
                    <Option value="北京">北京</Option>
                    <Option value="天津">天津</Option>
                    <Option value="上海">上海</Option>
                    <Option value="重庆">重庆</Option>
                    <Option value="杭州">杭州</Option>
                    <Option value="武汉">武汉</Option>
                </Select>
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
            <Item name="domain" label="擅长工作(可多选)">
                <Select placeholder="请选择擅长工作" mode="multiple" showSearch>
                    <Option value="低体重儿">低体重儿</Option>
                    <Option value="早产儿">早产儿</Option>
                    <Option value="双胞胎">双胞胎</Option>
                    <Option value="病患儿">病患儿</Option>
                    <Option value="病症产妇">病症产妇</Option>
                    <Option value="人工喂养">人工喂养</Option>
                    <Option value="混合喂养">混合喂养</Option>
                    <Option value="剖宫产伤口护理">剖宫产伤口护理</Option>
                    <Option value="顺产伤口护理">顺产伤口护理</Option>
                    <Option value="月子餐">月子餐</Option>
                    <Option value="无痛通乳">无痛通乳</Option>
                    <Option value="产后康复">产后康复</Option>
                </Select>
            </Item>
            <Item name="character" label="性格优势(可多选)">
                <Select placeholder="请选择性格优势" mode="multiple" showSearch>
                    <Option value="老实本分">老实本分</Option>
                    <Option value="热情开朗">热情开朗</Option>
                    <Option value="擅长沟通">擅长沟通</Option>
                    <Option value="待人亲切">待人亲切</Option>
                    <Option value="干活利落">干活利落</Option>
                    <Option value="手脚勤快">手脚勤快</Option>
                    <Option value="细心认真">细心认真</Option>
                    <Option value="城市可行">城市可行</Option>
                    <Option value="通情达理">通情达理</Option>
                    <Option value="有爱心">有爱心</Option>
                    <Option value="有耐心">有耐心</Option>
                    <Option value="尊敬老人">尊敬老人</Option>
                    <Option value="喜欢小孩">喜欢小孩</Option>
                    <Option value="喜欢动物">喜欢动物</Option>
                    <Option value="爽快大方">爽快大方</Option>
                    <Option value="朴实随和">朴实随和</Option>
                    <Option value="善于学习">善于学习</Option>
                    <Option value="内向话少">内向话少</Option>
                    <Option value="心态稳定">心态稳定</Option>
                    <Option value="心直口快">心直口快</Option>
                    <Option value="温和善良">温和善良</Option>
                    <Option value="大方得体">大方得体</Option>
                    <Option value="善于接受新事物">善于接受新事物</Option>
                    <Option value="尊重客户偏好">尊重客户偏好</Option>
                    <Option value="职业素养高">职业素养高</Option>
                </Select>
            </Item>
            <Item name="tag" label="圈子标签">
                <Input placeholder="请输入圈子标签"/>
            </Item>
            <Item name="salary" label="期望薪资" initialValue={'面议'}>
                <Input placeholder="请输入期望薪资"/>
            </Item>
            <Item name="intent" label="工作意向">
                <Radio.Group>
                    <Radio value={'暂不找工作'}>暂不找工作</Radio>
                    <Radio value={'正在找工作'}>正在找工作</Radio>
                </Radio.Group>
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