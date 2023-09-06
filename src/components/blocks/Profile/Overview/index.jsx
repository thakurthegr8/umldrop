import React from 'react'
import styles from './ProfileOverviewBlock.module.css'
import Avatar from '@/src/components/elements/Avatar'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import { useProfile } from '@/src/providers/Profile'
import CollectionItem from '../Collections/CollectionItem'

const ProfileOverviewBlock = () => {
    const profile = useProfile();
    const { collections, user } = profile;
    return (
        <Layout.Container className={styles.main}>
            <Layout.Grid className={styles.main_layout}>
                <Layout.Col className={styles.profile_info}>
                    <Layout.Col className={styles.avatar_lg_wrapper}>
                        <Avatar seed={profile.user.name} dimensions={[256, 256]} />
                    </Layout.Col>
                    <Layout.Row className={styles.more_info_wrapper}>
                        <Layout.Col className={styles.avatar_sm_wrapper}>
                            <Avatar seed={profile.user.name} dimensions={[64, 64]} />
                        </Layout.Col>
                        <Layout.Col className={styles.more_info}>
                            <Typography.Heading className={styles.profile_name}>
                                {profile.user.name}
                            </Typography.Heading>
                            <Typography.Body className={styles.profile_username}>
                                {profile.user.username}
                            </Typography.Body>
                        </Layout.Col>
                    </Layout.Row>
                </Layout.Col>
                <Layout.Col className={styles.collections_layout_wrapper}>
                    <Typography.Heading className="font-bold">Collections</Typography.Heading>
                    {collections.length !== 0 ?
                        <Layout.Grid className={styles.collections_layout}>
                            {collections.map((item, index) => <CollectionItem collection={item} user={user} key={index} />)}
                        </Layout.Grid> : <Typography.Body>No collections for now</Typography.Body>}
                </Layout.Col>
            </Layout.Grid>
        </Layout.Container>
    )
}

export default ProfileOverviewBlock