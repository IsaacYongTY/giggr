import React from 'react';

import Layout from 'components/Layout';
import withAuth from 'middlewares/withAuth';

export const getServerSideProps = withAuth(async ({ req }: any) => {
    return {
        props: {
            user: req.user,
        },
    };
});

type PlaygroundPageProps = {
    user?: any;
};

const PlaygroundPage: React.FC<PlaygroundPageProps> = () => {
    return (
        <Layout title="PlaygroundPage">
            <div>something here</div>
        </Layout>
    );
};

export default PlaygroundPage;
