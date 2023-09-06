import React, { useMemo } from 'react';
import Page from '@/src/components/pages';
import NavbarFixed from '@/src/components/sections/Navbar/NavbarFixed';
import Layout from '@/src/components/utils/Layout';
import { Tab } from '@headlessui/react';
import SettingsAccountBlock from '@/src/components/blocks/Settings/Main/Account';
import withAuthPage from '@/src/middlewares/withAuthPage';
import SettingsProfileBlock from '@/src/components/blocks/Settings/Main/Profile';
import SettingsBasicInfoBlock from '@/src/components/blocks/Settings/BasicInfo';
import SettingsTabListBlock from '@/src/components/blocks/Settings/Main/TabList';
import { LOGOTEXT } from '@/src/constants';
import { useRouter } from 'next/router';

const SettingsPage = (_props) => {
    const router = useRouter();
    const defaultValue = useMemo(() => {
        const tabs = {
            account: 0,
            profile: 1
        }
        if (!router.query?.tab) return 0;
        if (!Object.keys(tabs).includes(router.query.tab)) return 0;
        return tabs[router.query.tab];
    }, [])
    return (
        <Page page={`${LOGOTEXT} | Settings`}>
            <Layout.Col className="gap-4">
                <NavbarFixed />
                <Layout.Container className="max-w-4xl py-8 mt-12 flex flex-col gap-4">
                    <SettingsBasicInfoBlock />
                    <Tab.Group defaultIndex={defaultValue}>
                        <Layout.Col className="w-full md:flex-row gap-4">
                            <SettingsTabListBlock />
                            <Layout.Card className="md:w-2/3">
                                <Tab.Panels>
                                    <SettingsAccountBlock />
                                    <SettingsProfileBlock />
                                </Tab.Panels>
                            </Layout.Card>
                        </Layout.Col>
                    </Tab.Group>
                </Layout.Container>
            </Layout.Col>
        </Page>
    )
}

export default SettingsPage;

export const getServerSideProps = withAuthPage(async _ctx => {
    return {
        props: {
        }
    }
})