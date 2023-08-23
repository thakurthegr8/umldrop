import Logo from '@/src/components/elements/Logo';
import Navbar from '@/src/components/sections/Navbar';
import Button from '@/src/components/utils/Button';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import useLogin from '@/src/hooks/auth/useLogin';
import { useAuth } from '@/src/providers/Auth';
import Link from 'next/link';
import React from 'react'

const LoginPage = () => {
    const auth = useAuth();
    const onSubmit = async (data) => {
        await auth.loginWithEmailAndPassword(data);
    }
    return (
        <Layout.Grid className="fixed inset-0 grid-cols-2">
            <Layout.Row className="col-span-2 items-center justify-between p-3 border-b backdrop-blur border-dark_secondary">
                <Navbar />
            </Layout.Row>
            <Layout.Container className="max-w-sm pt-2 h-screen overflow-y-scroll col-span-2 lg:col-span-1">
                <Typography.Title className="text-center my-4 font-semibold text-7xl ">⚡️</Typography.Title>
                <Typography.Heading className="text-center my-4 font-semibold">Login to Ace SQL</Typography.Heading>
                <Form onSubmit={onSubmit} autoComplete="off">
                    <Layout.Col className="gap-4">
                        <Form.Input type="email" placeholder="Enter email" name="email" />
                        <Form.Input type="password" placeholder="Enter password" name="password" />
                        <Button className="btn-primary font-bold" loading={auth.loading} disabled={auth.loading}>Login</Button>
                    </Layout.Col>
                </Form>
                <Link href="/register"><Button className="btn-secondary w-full mt-4">Register</Button></Link>
            </Layout.Container>
            <Layout.Col className="border-l border-dark_secondary hidden lg:flex bg-no-repeat bg-[url('/assets/hero.png')] bg-cover bg-center" >
            </Layout.Col>
        </Layout.Grid>
    )
}

export default LoginPage;