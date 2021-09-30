import React from 'react';
import { GetServerSideProps } from 'next';

import Layout from '../../components/Layout';
import withAuth from '../../middlewares/withAuth';

export const getServerSideProps: GetServerSideProps = withAuth(
    ({ req }: any) => {
        return {
            props: {
                user: req.user,
            },
        };
    }
);

export default function AdminPage({ user, children }: any) {
    return <Layout user={user}>{children}</Layout>;
}
