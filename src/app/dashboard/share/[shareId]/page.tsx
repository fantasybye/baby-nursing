import Layout from "@/components/layout";

import ShareForm from "../form";

import styles from './page.module.css';


export default function ShareDetail({ params }: { params: { shareId: string } }) {
    const { shareId }= params
    return <>
        <Layout title="分享管理">
            <ShareForm id={shareId}/>
        </Layout>
    </>
}