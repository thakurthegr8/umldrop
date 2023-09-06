import React, { useState } from 'react'
import styles from "./CollectionDiagramsBlock.module.css";
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import DiagramViewer from './DiagramViewer';
import DiagramItem from './DiagramItem';

const CollectionDiagramsBlock = (props) => {
    const { diagrams, authorised } = props;
    const [isModalOpen, setShowModal] = useState(false);
    const [diagram, setCurrentDiagram] = useState(null);
    const toggleModal = () => {
        setShowModal(prev => !prev);
    }
    return (
        <Layout.Col>
            {diagrams.length !== 0 ?
                <Layout.Grid className={styles.main_grid_layout}>
                    {diagrams.map((item) => <DiagramItem key={item.id} diagram={item} authorised={authorised} setCurrentDiagram={setCurrentDiagram} toggleModal={toggleModal} />)}
                </Layout.Grid> :
                <Typography>No diagrams for now</Typography>}
            <DiagramViewer isModalOpen={isModalOpen} toggleModal={toggleModal} diagram={diagram} />
        </Layout.Col>
    )
}

export default CollectionDiagramsBlock