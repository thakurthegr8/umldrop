import React from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Button from '@/src/components/utils/Button'
import Form from '@/src/components/utils/Form'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import useRegister from '@/src/hooks/auth/useRegister'

const RegisterFormBlock = () => {
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
        <Layout.Container className="max-w-sm pt-2 h-screen overflow-y-scroll col-span-2 lg:col-span-1">
            <Typography.Heading className="text-center my-4 font-semibold">Register With UMLDROP</Typography.Heading>
            <Form onSubmit={onSubmit} autoComplete="off">
                <Layout.Col className="gap-4">
                    <Form.Input type="text" placeholder="Enter name" name="name" required />
                    <Form.Input type="email" placeholder="Enter email" name="email" required />
                    <Form.Input type="password" placeholder="Enter password" name="password" required />
                    <Form.Input type="password" placeholder="Confirm password" name="conf_password" required />
                    <Button className="btn-primary font-bold" loading={reg.loading} disabled={reg.loading}>Register</Button>
                </Layout.Col>
            </Form>
            <Link href="/login"><Button className="btn-secondary w-full mt-4">Login</Button></Link>
        </Layout.Container>
    )
}

export default RegisterFormBlock;