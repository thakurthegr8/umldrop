import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./CollectionHeaderBlock.module.css";
import Button from '@/src/components/utils/Button';
import Drawer from '@/src/components/utils/Drawer';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import AddDiagramForm from './AddDiagramForm';
import Modal from '@/src/components/utils/Modal';
import UpdateCollectionForm from './UpdateCollectionForm';
import DeleteCollectionConfirmation from './DeleteCollectionConfirmation';

const CollectionHeaderBlock = (props) => {
    const [isAddDiagramDrawerOpen, setShowAddDiagramDrawer] = useState(false);
    const [isUpdateCollectionDrawerOpen, setShowUpdateCollectionDrawer] = useState(false);
    const [isDeleteCollectionModalOpen, setShowDeleteCollectionModal] = useState(false);
    const { collection, authorised } = props;
    const toggleAddDiagramDrawer = () => {
        setShowAddDiagramDrawer(prev => !prev);
    }
    const toggleUpdateCollectionDrawer = () => {
        setShowUpdateCollectionDrawer(prev => !prev);
    }
    const toggleDeleteCollectionModal = () => {
        setShowDeleteCollectionModal(prev => !prev);
    }
    return (
        <Layout.Grid className={styles.main}>
            <Layout.Col className="md:col-span-2">
                <Typography.Title className={styles.collection_name}>{collection.name}</Typography.Title>
                <Typography.Body className={styles.collection_description}>{collection.description}</Typography.Body>
            </Layout.Col>
            {authorised &&
                <Layout.Row className="gap-2 items-start md:justify-end">
                    <Button
                        className={`btn-secondary ${styles.add_diagram_btn}`}
                        onClick={toggleAddDiagramDrawer}>
                        Add New Diagram<PlusIcon className={styles.add_diagram_btn_icon} />
                    </Button>
                    <Button className="btn-icon" onClick={toggleUpdateCollectionDrawer}><PencilIcon className="w-5 h-5" /></Button>
                    <Button className="btn-icon" onClick={toggleDeleteCollectionModal}><TrashIcon className="w-5 h-5" /></Button>
                </Layout.Row>}
            <Drawer open={isAddDiagramDrawerOpen} onClose={toggleAddDiagramDrawer} title="Add Diagram">
                <AddDiagramForm collection={collection} />
            </Drawer>
            <Drawer open={isUpdateCollectionDrawerOpen} onClose={toggleUpdateCollectionDrawer} title="Update Collection">
                <UpdateCollectionForm collection={collection} />
            </Drawer>
            <Modal open={isDeleteCollectionModalOpen} onClose={toggleDeleteCollectionModal}>
                <DeleteCollectionConfirmation collection={collection} rejectDeletion={toggleDeleteCollectionModal} />
            </Modal>
        </Layout.Grid>
    )
}

export default CollectionHeaderBlock;