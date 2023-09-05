import Button from '@/src/components/utils/Button';
import CopyToClipboard from '@/src/components/utils/General/CopyToClipboard';
import Layout from '@/src/components/utils/Layout'
import Modal from '@/src/components/utils/Modal'
import Link from 'next/link';
import PlantUmlEncoder from 'plantuml-encoder';
import React from 'react'

const DiagramViewer = (props) => {
    const { isModalOpen, toggleModal,diagram } = props;
    return (
        <Modal open={isModalOpen} onClose={toggleModal} title="View Diagram">
            <Layout.Col className="h-[72vh] w-screen md:w-full overflow-hidden overflow-y-auto">
                <Layout.Col className="md:flex-row p-4 justify-end gap-2 border-b border-dark_secondary md:items-center">
                    <Link href={`/playground?encoded_string=${diagram?.encoded_string}`}>
                        <Button className="btn-secondary w-full">Open in playground</Button></Link>
                    {/* <Button className="bg-dark_secondary/50 border border-dark_secondary">Download<DownloadIcon className='w-4 h-4 ml-1' /></Button>
                        {authorised && <Button className="btn-primary">Edit <PencilIcon className='w-3 h-3 ml-1' /></Button>}
                        {authorised && <Button className="bg-red-900/50 text-red-500"><TrashIcon className='w-5 h-5' /></Button>} */}
                </Layout.Col>
                <Layout.Grid className="grid-cols-1 md:grid-cols-2">
                    <Layout.Col className="text-sm rounded-md overflow-hidden">
                        <Layout.Row className="justify-end p-2">
                            {diagram && <CopyToClipboard text={PlantUmlEncoder.decode(diagram?.encoded_string || "")} />}
                        </Layout.Row>
                        <pre className="bg-dark_secondary/50 p-2">
                            {diagram && PlantUmlEncoder.decode(diagram?.encoded_string)}
                        </pre>
                    </Layout.Col>
                    <Layout.Col>
                        <img src={`https://www.plantuml.com/plantuml/png/${diagram?.encoded_string}`} alt={diagram?.name} className='w-full' />
                    </Layout.Col>
                </Layout.Grid>
            </Layout.Col>
        </Modal>
    )
}

export default DiagramViewer