import React from 'react';
import Layout from '../../components/layouts/Layout';

import withAuth from '../../middlewares/withAuth';
import Metronome from '../../components/common/Metronome';

export const getServerSideProps = withAuth(async ({ req }: any) => {
    return {
        props: {
            user: req.user,
        },
    };
});

interface Props {
    user: any;
}

export default function Bpm({ user }: Props) {
    return (
        <Layout user={user} title="Metronome">
            <Metronome defaultTempo={69} />
        </Layout>
    );
}
