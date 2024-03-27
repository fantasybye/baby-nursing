"use client"
import { useEffect, useState } from "react";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";

export default function ResumeForm(id?: string) {
    const [form] = useForm();
    const [data, setData] = useState()

    useEffect(() => {
        if(id) {
            console.log(id)
        }
    },[id])
    return <Form></Form>
}