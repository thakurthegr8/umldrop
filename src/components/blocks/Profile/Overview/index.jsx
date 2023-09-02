import Avatar from '@/src/components/elements/Avatar'
import Badge from '@/src/components/elements/Badge'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import { useProfile } from '@/src/providers/Profile'
import Link from 'next/link'
import React from 'react'

const ProfileOverviewBlock = () => {
    const profile = useProfile();
    const { collections, user } = profile;
    return (
        <Layout.Container className="h-full">
            <Layout.Grid className="grid-cols-1 md:grid-cols-4 gap-2 p-2 md:p-4 md:divide-x divide-dark_secondary">
                <Layout.Col className="gap-4">
                    <Layout.Col className="hidden md:block">
                        <Avatar seed={profile.user.name} dimensions={[256, 256]} />
                    </Layout.Col>
                    <Layout.Row className="gap-4">
                        <Layout.Col className="block md:hidden">
                            <Avatar seed={profile.user.name} dimensions={[64, 64]} />
                        </Layout.Col>
                        <Layout.Col className="justify-center">
                            <Typography.Heading className="font-semibold">{profile.user.name}</Typography.Heading>
                            <Typography.Body className="text-white/50">{profile.user.username}</Typography.Body>
                        </Layout.Col>
                    </Layout.Row>
                </Layout.Col>
                <Layout.Col className="col-span-3 md:pl-4 gap-4">
                    <Typography.Heading>Collections</Typography.Heading>
                    {collections.length !== 0 ?
                        <Layout.Grid className="grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
                            {collections.map((item, index) => {
                                return <Link href={`/${user.username}/${item.name}`} key={index}>
                                    <Layout.Card className="hover:border-primary transition-all active:bg-dark_secondary">
                                        <Layout.Row className="items-center justify-between">
                                            <Typography.Body>{item.name}</Typography.Body>
                                            <Badge>{item.private ? "Private" : "Public"}</Badge>
                                        </Layout.Row>
                                    </Layout.Card>
                                </Link>
                            })}
                        </Layout.Grid> : <Typography.Body>No collections for now</Typography.Body>}

                </Layout.Col>
            </Layout.Grid>
        </Layout.Container>
    )
}

export default ProfileOverviewBlock