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

export default function Playground({ user }: any) {
    return (
        <Layout user={user} title="Playground">
            <div>something here</div>
        </Layout>
    );
}
