import Layout from "@/components/layout";

import styles from './page.module.css';


export default function ResumeDetail({ params }: { params: { resumeId: string } }) {
    const { resumeId }= params
    return <>
        <Layout title="简历">
            这是简历{resumeId}
        </Layout>
    </>
}