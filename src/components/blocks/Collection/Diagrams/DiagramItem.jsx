import React, { memo } from 'react'
import styles from "./CollectionDiagramsBlock.module.css";
import Link from 'next/link';
import moment from 'moment';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
import Button from '@/src/components/utils/Button';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { PLANTUML } from '@/src/constants/image';

const DiagramItem = (props) => {
    const { authorised, diagram, setCurrentDiagram, toggleModal } = props;
    const editLink = `/playground?action_type=edit&id=${diagram.id}&collection_name=${diagram.collection_name}&encoded_string=${diagram.encoded_string}`;
    const backdropStyles = {
        backgroundImage: `url("${PLANTUML.PNG}/${diagram.encoded_string}")`
    }
    const viewBtnHandler = () => {
        setCurrentDiagram(diagram);
        toggleModal();
    }
    return (
        <Layout.Col className={styles.diagram_item_main}>
            <Layout.Col className={styles.diagram_item_backdrop} style={backdropStyles} />
            <Layout.Col className={styles.diagram_item_description}>
                <Layout.Col>
                    <Typography.Caption className={styles.diagram_item_name}>
                        {diagram.name}
                    </Typography.Caption>
                    <Typography.Caption className={styles.diagram_item_created_at}>
                        Created at {moment(diagram.created_at).format("MMMM Do YYYY")}
                    </Typography.Caption>
                </Layout.Col>
                <Layout.Row className={styles.diagram_item_actions_panel}>
                    <Button className={`btn-secondary ${styles.diagram_item_view_btn}`} onClick={viewBtnHandler}>
                        View <EyeIcon className={styles.diagram_item_view_btn_icon} />
                    </Button>
                    {authorised &&
                        <Link href={editLink}>
                            <Button className="btn-icon">
                                <PencilIcon className={styles.diagram_item_edit_btn_icon} />
                            </Button>
                        </Link>}
                </Layout.Row>
            </Layout.Col>
        </Layout.Col>
    )
}

export default memo(DiagramItem);