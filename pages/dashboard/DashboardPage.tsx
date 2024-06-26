import React from 'react';
import classnames from 'classnames/bind';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { Switch } from '@material-ui/core';

import Layout from 'components/Layout';
import DashboardCardList from 'pages/dashboard/DashboardCardList';
import withAuth from 'middlewares/withAuth';

import styles from './dashboard.module.scss';

const cx = classnames.bind(styles);

type DashboardPageProps = {
    user: any;
};

export const getServerSideProps: GetServerSideProps = withAuth(
    async ({ req }: any) => {
        return {
            props: {
                user: req.user,
            },
        };
    },
);

const DashboardPage: React.FC<DashboardPageProps> = () => {
    const { data: { gigs } = {} } = useSWR(`/api/v1/gigs`);
    const { data: { songs } = {} } = useSWR(
        `/api/v1/songs?number=5&category=createdAt&order=DESC`,
    );

    return (
        <Layout title="Dashboard">
            <div className={cx('container')}>
                <h2>Welcome!</h2>
                <Switch color="primary" />
                <DashboardCardList gigs={gigs} songs={songs} />
            </div>
        </Layout>
    );
};

export default DashboardPage;
