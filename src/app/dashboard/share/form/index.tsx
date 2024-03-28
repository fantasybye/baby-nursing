"use client"
import { useEffect, useState } from "react";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { PreviewUploader } from "@/components/preview-uploader";

const { Item } = Form;

export default function ShareForm({ id } : { id?: string }) {
    const [form] = useForm();
    const [data, setData] = useState()

    useEffect(() => {
        if(id) {
            console.log(id)
        }
    },[id])
    return <Form form={form} labelCol={{ span: 4 }}>  
        <Item name="imgs"  label="上传图片">
            <PreviewUploader onChange={(urls) => { console.log(urls) }}/>
        </Item>
    </Form>
}