import React from 'react'
import Link from 'next/link';
import styles from "./LoginForm.module.css";
import Button from '@/src/components/utils/Button';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { useAuth } from '@/src/providers/Auth';

const LoginFormBlock = () => {
    const auth = useAuth();
    const onSubmit = async (data) => {
        await auth.loginWithEmailAndPassword(data);
    }
    return (
        <Layout.Container className={styles.main_container}>
            <Typography.Heading className={styles.login_text}>Login to UMLDROP</Typography.Heading>
            <Form onSubmit={onSubmit} autoComplete="off">
                <Layout.Col className={styles.form_col_layout}>
                    <Form.Input type="email" placeholder="Enter email" name="email" />
                    <Form.Input type="password" placeholder="Enter password" name="password" />
                    <Button className="btn-primary font-bold" loading={auth.loading} disabled={auth.loading}>Login</Button>
                </Layout.Col>
            </Form>
            <Link href="/register"><Button className="btn-secondary w-full mt-4">Register</Button></Link>
        </Layout.Container>
    )
}

export default LoginFormBlock;