import React from 'react'
import LoginFormBlock from '@/src/components/blocks/Login/Form';
import LoginHeroBlock from '@/src/components/blocks/Login/Hero';
import Page from '@/src/components/pages';
import AuthNavbar from '@/src/components/sections/Auth/Navbar';
import Layout from '@/src/components/utils/Layout';
import { LOGOTEXT } from '@/src/constants';

const LoginPage = () => {
    return (
        <Page page={`${LOGOTEXT} | Continue to your account`}>
            <Layout.Grid className="fixed inset-0 grid-cols-2">
                <AuthNavbar />
                <LoginFormBlock />
                <LoginHeroBlock />
            </Layout.Grid>
        </Page>
    )
}

export default LoginPage;