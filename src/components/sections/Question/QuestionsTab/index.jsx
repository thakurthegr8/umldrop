import React from 'react'
import styles from "./QuestionsTab.module.css";
import { Tab } from '@headlessui/react';
import CodeDescription from '@/src/components/blocks/Question/CodeDescription';
import Layout from '@/src/components/utils/Layout';
import Submissions from '@/src/components/blocks/Question/Submissions';
import Typography from '@/src/components/utils/Typography';

const tabs = ["description", "submissions"]

const QuestionsTabSection = () => {
    return (
        <Tab.Group as={Layout.Col} className={`${styles.main} mkdwn`}>
            <Tab.List as={Layout.Row} className={styles.main_tab_list}>
                {tabs.map((item) => <Tab key={item} className={styles.main_tab_list_tab}>
                    {({ selected }) => <Typography.Caption className={selected ? styles.main_tab_list_tab_active : "bg-transparent p-4"}>{item}</Typography.Caption>}
                </Tab>)}
            </Tab.List>
            <Tab.Panels className={styles.main_tab_panels}>
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