import React from 'react'
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Dialog, Transition } from '@headlessui/react';
import Layout from '../Layout';
import Button from '../Button';
import Typography from '../Typography';

const Drawer = (props) => {
    return (
        <Dialog onClose={props.onClose} open={props.open} className="bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 z-30" as={Layout.Row}>
            <Transition appear show={props.open}
                className="w-full z-10 flex justify-end"
                enter="transform transition duration-[400ms]"
                enterFrom="translate-y-20 sm:translate-y-0 sm:translate-x-20 opacity-0"
                enterTo="opacity-100 translate-y-0 sm:translate-y-0 md:translate-x-0"
                leave="transform duration-[400ms] transition ease-in-out"
                leaveFrom="translate-x-10"
                leaveTo="translate-x-0"
            >
                <Dialog.Panel className="bg-general w-full sm:w-1/2 md:w-1/3 h-screen sm:border-l border-dark_secondary">
                    <Layout.Row className="items-center justify-between border-b border-dark_secondary p-2 bg-dark_secondary/50">
                        <Typography.Body className="font-semibold text-white/80">{props.title}</Typography.Body>
                        <Button onClick={props.onClose} className="btn-icon">
                            <CloseIcon className="text-white w-6 h-6" />
                        </Button>
                    </Layout.Row>
                    {props.children}
                </Dialog.Panel>
            </Transition>
        </Dialog>
    )
}

Drawer.defaultProps = {
    title: "Title",
}

export default Drawer;