import Avatar from '@/src/components/elements/Avatar'
import Badge from '@/src/components/elements/Badge'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import { useProfile } from '@/src/providers/Profile'
import React from 'react'

const ProfileOverviewBlock = () => {
    const profile = useProfile();
    const { collections } = profile;
    return (
        <Layout.Container className="h-full">
            <Layout.Grid className="grid-cols-4 gap-2 p-4 divide-x divide-dark_secondary">
                <Layout.Col className="gap-4">
                    <Avatar seed={profile.user.name} dimensions={[256, 256]} />
                    <Layout.Col>
                        <Typography.Heading className="font-semibold">{profile.user.name}</Typography.Heading>
                        <Typography.Body className="text-white/50">{profile.user.username}</Typography.Body>
                    </Layout.Col>
                </Layout.Col>
                <Layout.Col className="col-span-3 pl-4 gap-4">
                    <Typography.Heading>Collections</Typography.Heading>
                    {collections ? <Layout.Grid className="grid-cols-2 h-full items-start gap-4">
                        {collections.map((item, index) => {
                            return <Layout.Card key={index}>
                                <Layout.Row className="items-center justify-between">
                                    <Typography.Body>{item.name}</Typography.Body>
                                    <Badge>{item.private ? "Private" : "Public"}</Badge>
                                </Layout.Row>
                            </Layout.Card>
                        })}
                    </Layout.Grid> : <Typography.Body>No collections for now</Typography.Body>}

                </Layout.Col>
            </Layout.Grid>
        </Layout.Container>
    )
}

export default ProfileOverviewBlock