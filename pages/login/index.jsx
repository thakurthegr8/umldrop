import Logo from '@/src/components/elements/Logo';
import Navbar from '@/src/components/sections/Navbar';
import Button from '@/src/components/utils/Button';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import useLogin from '@/src/hooks/auth/useLogin';
import { useAuth } from '@/src/providers/Auth';
import React from 'react'

const LoginPage = () => {
    const auth = useAuth();
    const onSubmit = async (data) => {
        await auth.loginWithEmailAndPassword(data);
    }
    return (
        <Layout.Col className="h-screen">
            <Navbar />
            <Layout.Grid className="mt-12 pt-6 lg:grid-cols-2 divide-x h-full divide-dark_secondary">
                <Layout.Container className="max-w-sm pt-12">
                    <Typography.Heading className="text-center my-4 font-semibold">Login to Ace SQL</Typography.Heading>
                    <Form onSubmit={onSubmit} autoComplete="off">
                        <Layout.Col className="gap-4">
                            <Form.Input type="email" placeholder="Enter email" name="email" />
                            <Form.Input type="password" placeholder="Enter password" name="password" />
                            <Button className="btn-primary font-bold">Submit</Button>
                        </Layout.Col>
                    </Form>
                    <Button className="btn-secondary w-full mt-4">Register</Button>
                </Layout.Container>
                <Layout.Col className="hidden lg:flex bg-no-repeat bg-[url('/assets/hero.png')] bg-cover bg-center" >
                </Layout.Col>
            </Layout.Grid>
        </Layout.Col>
    )
}

export default LoginPage;