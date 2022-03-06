import React from 'react';

import Layout from '../../components/Layout';
import withAuth from '../../middlewares/withAuth';

export const getServerSideProps = withAuth(async ({ req }: any) => {
    return {
        props: {
            user: req.user,
        },
    };
});

export default function PlaygroundPage({ user }: any) {
    return (
        <Layout user={user} title="PlaygroundPage">
            <div>something here</div>
        </Layout>
    );
}
