import React from 'react';
import Head from 'next/head';

import withAuth from '../middlewares/withAuth';

export const getServerSideProps = withAuth(({ req }: any) => {
    if (req.user) {
        return {
            redirect: {
                permanent: false,
                destination: 'dashboard',
            },
        };
    }
});

const Home: React.FC = () => {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};

export default Home;
