import React from "react";
import styles from "./ProfileAddCollectionBlock.module.css";
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { useCollections } from '@/src/providers/Collections';
import ProfileAddCollectionElement from './ProfileAddCollectionElement';
import CollectionItem from "./CollectionItem";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import Placeholder from "@/src/components/elements/Placeholder";




const ProfileCollectionsBlock = () => {
    const { collections, user } = useCollections();

    return (
        <Layout.Col className={styles.main_col_layout}>
            <ProfileAddCollectionElement />
            {collections.length !== 0 ?
                <Layout.Grid className={styles.collection_items_layout}>
                    {collections.map((item, index) => {
                        return <CollectionItem key={index} collection={item} user={user} />
                    })}
                </Layout.Grid> : <Placeholder title="It's empty in here..." description="This user current does not have any collections." />}
        </Layout.Col>
    )
}

export default ProfileCollectionsBlock;