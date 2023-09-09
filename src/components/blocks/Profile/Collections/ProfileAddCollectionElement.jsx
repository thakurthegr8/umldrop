import React, { useState } from "react";
import styles from "./ProfileAddCollectionBlock.module.css";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Button from "@/src/components/utils/Button";
import Drawer from "@/src/components/utils/Drawer";
import Form from "@/src/components/utils/Form";
import Layout from "@/src/components/utils/Layout";
import { useAuth } from "@/src/providers/Auth";
import { useCollections } from "@/src/providers/Collections";
import { toast } from "react-toastify";

const ProfileAddCollectionElement = () => {
    const auth = useAuth();
    const [drawerOpen, toggleDrawer] = useState(false);
    const collections = useCollections();
    const onSubmit = async (data) => {
        const res = await collections.addCollections.dispatch(data);
        if (res.error) {
            toast(res.error.message, { type: "error" })
        } else if (res.data) {
            collections.mutate((state) => [...state, res.data]);
            toggle();
        }
    }
    const toggle = () => {
        toggleDrawer(prevValue => !prevValue);
    }
    if (!auth.data || auth.data.username !== collections.user.username) return null;
    return <Layout.Row className={styles.add_collection_element_main}>
        <Button className="btn-primary" onClick={toggle}>New<PlusIcon className={styles.add_collection_element_add_btn_icon} /></Button>
        <Drawer open={drawerOpen} onClose={toggle} title="Add Collection">
            <Form onSubmit={onSubmit}>
                <Layout.Col className={styles.add_collection_element_layout}>
                    <Form.Input type="text" name="name" placeholder="Enter name" required />
                    <Form.Input type="text" name="description" placeholder="Enter description" required />
                    <Layout.Row>
                        <Button className="btn-primary" loading={collections.addCollections.loading}>Submit</Button>
                    </Layout.Row>
                </Layout.Col>
            </Form>
        </Drawer>
    </Layout.Row>;
}

export default ProfileAddCollectionElement;