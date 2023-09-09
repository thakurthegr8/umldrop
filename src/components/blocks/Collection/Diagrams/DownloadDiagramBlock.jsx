import React from 'react'
import DownloadIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import Button from '@/src/components/utils/Button'
import Dropdown from '@/src/components/utils/Dropdown';
import Layout from '@/src/components/utils/Layout';
import { Menu } from '@headlessui/react';
import Typography from '@/src/components/utils/Typography';
import { PLANTUML_BASE_URL } from '@/src/constants/image';

const DownloadDiagramBlock = (props) => {
    const { diagram } = props;

    return (
        <>
            <Dropdown MenuBtn={<Button className="bg-dark_secondary/50 border border-dark_secondary">Download<DownloadIcon className='w-4 h-4 ml-1' /></Button>}>
                <Menu.Items as={Layout.Col}>
                    <Menu.Item target='_blank' href={`${PLANTUML_BASE_URL}/svg/${diagram.encoded_string}`} download="diagram.svg" as="a" className="p-2 hover:bg-white/10 flex justify-between cursor-pointer">SVG</Menu.Item>
                    <Menu.Item target='_blank' href={`${PLANTUML_BASE_URL}/png/${diagram.encoded_string}`} download="diagram.png" as="a" className="p-2 hover:bg-white/10 flex justify-between cursor-pointer">PNG</Menu.Item>
                </Menu.Items>
            </Dropdown>
        </>
    )
}

export default DownloadDiagramBlock