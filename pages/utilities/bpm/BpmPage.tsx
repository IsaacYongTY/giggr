import React from 'react';

import withAuth from 'middlewares/withAuth';

import Layout from 'components/Layout';
import Metronome from 'components/common/Metronome/Metronome';

export const getServerSideProps = withAuth(async ({ req }: any) => {
    return {
        props: {
            user: req.user,
        },
    };
});

type BpmPageProps = {
    user: any;
};

export default function BpmPage({ user }: BpmPageProps) {
    return (
        <Layout user={user} title="Metronome">
            <Metronome defaultTempo={69} />
        </Layout>
    );
}
