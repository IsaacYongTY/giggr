import React from 'react';

import withAuth from 'middlewares/withAuth';

import Layout from 'components/Layout';
import Metronome from 'components/Metronome/Metronome';

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

const BpmPage: React.FC<BpmPageProps> = () => {
    return (
        <Layout title="Metronome">
            <Metronome defaultTempo={69} />
        </Layout>
    );
};

export default BpmPage;
