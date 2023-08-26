import React from 'react';
import Page from '@/src/components/pages';
import NavbarFixed from '@/src/components/sections/Navbar/NavbarFixed';
import Layout from '@/src/components/utils/Layout';
import { useAuth } from '@/src/providers/Auth';
import Avatar from '@/src/components/elements/Avatar';
import Typography from '@/src/components/utils/Typography';
import { Tab } from '@headlessui/react';
import SettingsAccountBlock from '@/src/components/blocks/Settings/Main/Account';
import withAuthPage from '@/src/middlewares/withAuthPage';

const SettingsPage = (props) => {
    const auth = useAuth();
    return (
        <Page>
            <Layout.Col className="gap-2">
                <NavbarFixed />
                <Layout.Container className="max-w-4xl py-8 mt-20 flex flex-col gap-2">
                    <Layout.Card className="flex gap-2 items-center overflow-hidden">
                        <Avatar seed={auth?.data?.name} dimensions={[84, 84]} />
                        <Layout.Col>
                            <Typography.Subtitle className="capitalize font-bold">{auth?.data?.name}</Typography.Subtitle>
                            <Typography.Body className="text-secondary text-ellipsis w-full">{auth?.data?.id}</Typography.Body>
                        </Layout.Col>
                    </Layout.Card>
                    <Layout.Row>
                    </Layout.Row>
                    <Tab.Group>
                        <Layout.Col className="w-full md:flex-row gap-4">
                            <Layout.Card className="md:w-1/3 flex flex-col gap-2">
                                <Typography.Heading>Options</Typography.Heading>
                                <Tab.List className="flex flex-col divide-y divide-dark_secondary gap-2 text-secondary">
                                    <Tab className="rounded-md text-left cursor-pointer hover:bg-dark_secondary p-2 transition" as={Typography.Body}>Account</Tab>
                                    <Tab className="rounded-md text-left cursor-pointer hover:bg-dark_secondary p-2 transition pt-2" as={Typography.Body}>Profile</Tab>
                                </Tab.List>
                            </Layout.Card>
                            <Layout.Card className="md:w-2/3">
                                <Tab.Panels>
                                    <SettingsAccountBlock />
                                    <Tab.Panel>
                                        <Typography.Heading>Your Profile</Typography.Heading>
                                    </Tab.Panel>
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

export const getServerSideProps = withAuthPage(async ctx => {
    return {
        props: {
        }
    }
})