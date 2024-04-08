"use client"
import Layout from "@/components/layout";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ResumeForm from "../form";

import styles from './page.module.css';

function EditForm() {
    const params = useSearchParams();
    const resumeId = params.get('id')

    return <ResumeForm id={resumeId} />
}


export default function ResumeDetail() {
    return (
        <Layout title="编辑简历">
            <Suspense><EditForm /></Suspense>
        </Layout>  
    )
}