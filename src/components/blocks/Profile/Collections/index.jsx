import React from "react";
import styles from "./ProfileAddCollectionBlock.module.css";
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { useCollections } from '@/src/providers/Collections';
import ProfileAddCollectionElement from './ProfileAddCollectionElement';
import CollectionItem from "./CollectionItem";



const ProfileCollectionsBlock = () => {
    const { collections, user } = useCollections();

    return (
        <Layout.Container className={styles.main}>
            <Layout.Col className={styles.main_col_layout}>
                <ProfileAddCollectionElement />
                {collections.length !== 0 ?
                    <Layout.Grid className={styles.collection_items_layout}>
                        {collections.map((item, index) => {
                            return <CollectionItem key={index} collection={item} user={user} />
                        })}
                    </Layout.Grid> : <Typography.Body>No collections for now</Typography.Body>}
            </Layout.Col>
        </Layout.Container >
    )
}

export default ProfileCollectionsBlock;