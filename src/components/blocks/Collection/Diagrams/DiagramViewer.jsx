import React from 'react';
import Link from 'next/link';
import Button from '@/src/components/utils/Button';
import CopyToClipboard from '@/src/components/utils/General/CopyToClipboard';
import Layout from '@/src/components/utils/Layout'
import Modal from '@/src/components/utils/Modal'
import PlantUmlEncoder from 'plantuml-encoder';
import DeleteDiagramConfirmation from './DeleteDiagramConfirmation';
import EditDiagramBlock from './EditDiagramBlock';
import DownloadDiagramBlock from './DownloadDiagramBlock';

const DiagramViewer = (props) => {
    const { isModalOpen, toggleModal, diagram } = props;
    return (
        <Modal open={isModalOpen} onClose={toggleModal} title="View Diagram">
            <Layout.Col className="h-[72vh] aspect-square w-screen md:w-full md:min-w-[40rem] overflow-hidden overflow-y-auto">
                <Layout.Col className="sm:flex-row p-4 justify-end gap-2 border-b border-dark_secondary md:items-center">
                    <Link href={`/playground?encoded_string=${diagram?.encoded_string}`}>
                        <Button className="btn-secondary w-full">Open in playground</Button></Link>
                    <DownloadDiagramBlock diagram={diagram} />
                    <EditDiagramBlock diagram={diagram} />
                    <DeleteDiagramConfirmation diagram={diagram} />
                </Layout.Col>
                <Layout.Grid className="grid-cols-1 ">
                    <Layout.Col className="text-sm rounded-md overflow-hidden p-2">
                        <Layout.Row className="justify-end p-2">
                            {diagram && <CopyToClipboard text={PlantUmlEncoder.decode(diagram?.encoded_string || "")} />}
                        </Layout.Row>
                        <pre className="bg-dark_secondary/50 p-2 rounded-md">
                            <code>
                                {diagram && PlantUmlEncoder.decode(diagram?.encoded_string)}
                            </code>
                        </pre>
                    </Layout.Col>
                    <Layout.Row className="p-2 aspect-video justify-center items-center">
                        <img src={`https://www.plantuml.com/plantuml/png/${diagram?.encoded_string}`} alt={diagram?.name} />
                    </Layout.Row>
                </Layout.Grid>
            </Layout.Col>
        </Modal>
    )
}

export default DiagramViewer