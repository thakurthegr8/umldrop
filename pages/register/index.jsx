import Logo from '@/src/components/elements/Logo';
import Navbar from '@/src/components/sections/Navbar';
import Button from '@/src/components/utils/Button';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import useLogin from '@/src/hooks/auth/useLogin';
import useRegister from '@/src/hooks/auth/useRegister';
import { useAuth } from '@/src/providers/Auth';
import React from 'react'
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const reg = useRegister();
    const onSubmit = async (data) => {
        if (data.conf_password != data.password) {
            toast("Passwords are mismatched", { type: "error" })
            return;
        }
        const { conf_password, ...regPayload } = data;
        await reg.registerWithEmailAndPassword(regPayload);
    }
    return (
        <Layout.Col className="h-screen">
            <Navbar />
            <Layout.Grid className="mt-12 pt-6 lg:grid-cols-2 divide-x h-full divide-dark_secondary">
                <Layout.Container className="max-w-sm pt-2">
                    <Typography.Title className="text-center my-4 font-semibold text-7xl ">⚡️</Typography.Title>
                    <Typography.Heading className="text-center my-4 font-semibold">Register With Ace SQL</Typography.Heading>
                    <Form onSubmit={onSubmit} autoComplete="off">
                        <Layout.Col className="gap-4">
                            <Form.Input type="text" placeholder="Enter name" name="name" required />
                            <Form.Input type="email" placeholder="Enter email" name="email" required />
                            <Form.Input type="password" placeholder="Enter password" name="password" required />
                            <Form.Input type="password" placeholder="Confirm password" name="conf_password" required />
                            <Button className="btn-primary font-bold">Register</Button>
                        </Layout.Col>
                    </Form>
                    <Button className="btn-secondary w-full mt-4">Login</Button>
                </Layout.Container>
                <Layout.Col className="hidden lg:flex bg-no-repeat bg-[url('/assets/hero.png')] bg-cover bg-center" >
                </Layout.Col>
            </Layout.Grid>
        </Layout.Col>
    )
}

export default RegisterPage;