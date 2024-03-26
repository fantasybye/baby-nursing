import Layout from "@/components/layout";

import styles from './page.module.css';


export default function ShareDetail({ params }: { params: { shareId: string } }) {
    const { shareId }= params
    return <>
        <Layout title="分享">
            这是简历{shareId}
        </Layout>
    </>
}