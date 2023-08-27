import React from 'react'
import RegisterFormBlock from '@/src/components/blocks/Register/Form';
import RegisterHeroBlock from '@/src/components/blocks/Register/Hero';
import AuthNavbar from '@/src/components/sections/Auth/Navbar';
import Layout from '@/src/components/utils/Layout';
import Page from '@/src/components/pages';
import { LOGOTEXT } from '@/src/constants';

const RegisterPage = () => {
    return (
        <Page page={`${LOGOTEXT} | Register with ace sql`}>
            <Layout.Grid className="fixed inset-0 grid-cols-2">
                <AuthNavbar />
                <RegisterFormBlock />
                <RegisterHeroBlock />
            </Layout.Grid>
        </Page>
    )
}

export default RegisterPage;