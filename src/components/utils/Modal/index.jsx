import React from 'react'
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Dialog } from '@headlessui/react';
import Layout from '../Layout';
import Button from '../Button';
import Typography from '../Typography';

const Modal = (props) => {
    return (
        <Dialog onClose={props.onClose} open={props.open} className="bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 justify-center z-10 items-center" as={Layout.Col}>
            <Dialog.Panel className="bg-black border rounded-md border-dark_secondary">
                <Layout.Row className="items-center justify-between border-b border-dark_secondary p-2">
                    <Typography.Body className="font-semibold text-white/80">{props.title}</Typography.Body>
                    <Button onClick={props.onClose} className="btn-icon">
                        <CloseIcon className="text-white w-6 h-6" />
                    </Button>
                </Layout.Row>
                {props.children}
            </Dialog.Panel>
        </Dialog>
    )
}

Modal.defaultProps = {
    title: "Title",
}

export default Modal;