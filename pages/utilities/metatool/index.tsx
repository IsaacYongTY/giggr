import React, { useState } from 'react';
import classnames from 'classnames/bind';

import Layout from '../../../components/Layout';
import SpotifySearchBar from '../../../components/common/SpotifySearchBar';
import AlertBox from '../../../components/common/AlertBox';
import MetaToolForm from '../../../components/common/MetaToolForm';

import withAuth from '../../../middlewares/withAuth';

import styles from './metatool.module.scss';

const cx = classnames.bind(styles);

export const getServerSideProps = withAuth(async ({ req }: any) => {
    return {
        props: {
            user: req.user,
        },
    };
});

export interface Props {
    user: {
        tierId: number;
        name: string;
        tokenString: string;
        isAdmin: boolean;
    };
}

export default function Index({ user }: Props) {
    const [formValue, setFormValue] = useState<any>({});
    const [alertOptions, setAlertOptions] = useState({ message: '', type: '' });

    const [isContribute, setIsContribute] = useState(user?.isAdmin);

    return (
        <Layout user={user} title="Spotify Meta Tool">
            <div className={cx('container')}>
                <div className={cx('search=bar-container')}>
                    <SpotifySearchBar
                        setFormValue={setFormValue}
                        isContribute={isContribute}
                        user={user}
                        database="master"
                    />
                </div>

                <MetaToolForm
                    formValue={formValue}
                    setFormValue={setFormValue}
                    setAlertOptions={setAlertOptions}
                />

                {user?.isAdmin && (
                    <div className={cx('checkbox-row-container')}>
                        <input
                            type="checkbox"
                            id="contributeCheckbox"
                            defaultChecked={isContribute}
                            onChange={() =>
                                setIsContribute((prevState) => !prevState)
                            }
                        />
                        <label htmlFor="contributeCheckbox">
                            Contribute to Database?
                        </label>
                    </div>
                )}

                <AlertBox
                    setAlertOptions={setAlertOptions}
                    message={alertOptions.message}
                    type={alertOptions.type}
                />
            </div>
        </Layout>
    );
}
