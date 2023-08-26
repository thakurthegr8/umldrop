import React, { useContext } from 'react'
import styles from "./Progress.module.css"
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { useProfileProgress } from '@/src/providers/Profile/Progress';

const ProfileProgress = () => {
    const progressStats = useProfileProgress();
    return (
        <Layout.Card className="col-span-1 sm:col-span-2 flex flex-col gap-5">
            <Typography.Body className="font-semibold text-secondary text-left w-full">Your Progress</Typography.Body>
            {progressStats && Object.keys(progressStats).map((item) => progressStats[item].total !== 0 ? (<Layout.Col className="gap-1" key={item}>
                <Layout.Row className="justify-between items-center">
                <Typography.Caption className="capitalize">{item}</Typography.Caption>
                <Typography.Caption className="font-medium">{`${progressStats[item].solved}/${progressStats[item].total}`}</Typography.Caption>
                </Layout.Row>
                <Layout.Row className={styles[`${item}_progress_bg`]}>
                    <Layout.Row className={styles[`${item}_progress`]} style={{ width: `${progressStats[item].solved / progressStats[item].total * 80}%` }}></Layout.Row>
                </Layout.Row>
            </Layout.Col>) : null)
            }

        </Layout.Card >
    )
}

export default ProfileProgress;