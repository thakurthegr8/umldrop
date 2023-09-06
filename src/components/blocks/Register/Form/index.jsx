import React from 'react'
import styles from "./RegisterFormBlock.module.css"
import { toast } from 'react-toastify'
import Link from 'next/link'
import Button from '@/src/components/utils/Button'
import Form from '@/src/components/utils/Form'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import useRegister from '@/src/hooks/auth/useRegister'
import { FORM_FIELDS, HEADING, LOGIN_BTN_TEXT } from '@/src/constants/register'


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
        <Layout.Container className={styles.main_container}>
            <Typography.Heading className={styles.heading}>{HEADING}</Typography.Heading>
            <Form onSubmit={onSubmit} autoComplete="off">
                <Layout.Col className={styles.form_layout}>
                    {FORM_FIELDS.map((item) => <Form.Input {...item} key={item.name} />)}
                    <Button className="btn-primary font-bold" loading={reg.loading} disabled={reg.loading}>Register</Button>
                </Layout.Col>
            </Form>
            <Link href="/login">
                <Button className={`btn-secondary ${styles.login_btn}`}>
                    {LOGIN_BTN_TEXT}
                </Button>
            </Link>
        </Layout.Container>
    )
}

export default RegisterFormBlock;