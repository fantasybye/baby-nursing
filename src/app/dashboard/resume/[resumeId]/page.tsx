"use client"
import Layout from "@/components/layout";

import ResumeForm from "../form";

import styles from './page.module.css';


export default function ResumeDetail({ params }: { params: { resumeId: string } }) {
    const { resumeId }= params;
   
    return <>
        <Layout title="分享">
            <ResumeForm id={resumeId} />
        </Layout>
    </>
}