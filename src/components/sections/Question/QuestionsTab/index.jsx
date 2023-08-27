import React from 'react'
import { Tab } from '@headlessui/react';
import CodeDescription from '@/src/components/blocks/Question/CodeDescription';
import Layout from '@/src/components/utils/Layout';
import Submissions from '@/src/components/blocks/Question/Submissions';

const tabs = ["description", "submissions"]

const QuestionsTabSection = () => {
    return (
        <Tab.Group as={Layout.Col} className="h-screen items-start overflow-y-scroll pb-32 relative mkdwn">
            <Tab.List as={Layout.Row} className="outline-none items-center divide-x divide-dark_secondary border-b border-dark_secondary bg-general w-full sticky top-0">
                {tabs.map((item) => <Tab key={item} className="outline-none hover:bg-dark_secondary/50 active:bg-dark_secondary capitalize rounded-none p-2 cursor-pointer" as={'span'}>{item}</Tab>)}
            </Tab.List>
            <Tab.Panels className="p-4">
                <Tab.Panel className="gap-2" as={Layout.Col}>
                    <CodeDescription />
                </Tab.Panel>
                <Tab.Panel as={Layout.Col} className="h-full w-full">
                    <Submissions />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    )
}

export default QuestionsTabSection;