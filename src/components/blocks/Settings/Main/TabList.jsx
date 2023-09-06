import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { Tab } from '@headlessui/react';
import React from 'react'

const tabItems = [
    { tab: "account" },
    { tab: "profile" }
]

const SettingsTabListBlock = () => {
    return (
        <Layout.Card className="md:w-1/3 flex flex-col gap-2">
            <Typography.Heading className="font-semibold">Options</Typography.Heading>
            <Tab.List className="flex flex-col divide-y divide-dark_secondary gap-2">
                {tabItems.map(item => <Tab key={item.tab}  className="rounded-md text-left cursor-pointer hover:bg-dark_secondary transition capitalize" as={Layout.Col}>
                    {({selected})=>(<Typography.Caption className={selected ? "bg-dark_secondary p-2 rounded-md":"p-2 rounded-md"}>{item.tab}</Typography.Caption>)}
                </Tab>)}
            </Tab.List>
        </Layout.Card>
    )
}

export default SettingsTabListBlock;