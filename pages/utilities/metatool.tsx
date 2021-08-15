import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import SpotifySearchBar from '../../components/common/SpotifySearchBar';
import styles from '../../assets/scss/pages/_metatool.module.scss';
import AlertBox from '../../components/common/AlertBox';
import withAuth from '../../middlewares/withAuth';
import MetaToolForm from '../../components/common/MetaToolForm';

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

export default function MetaTool({ user }: Props) {
    const [formValue, setFormValue] = useState<any>({});
    const [alertOptions, setAlertOptions] = useState({ message: '', type: '' });
    const [isContribute, setIsContribute] = useState(user.isAdmin);

    return (
        <Layout user={user} title="Spotify Meta Tool">
            <div className={styles.container}>
                <div className={styles.searchBarContainer}>
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

                {user.isAdmin && (
                    <div className={styles.checkboxRowContainer}>
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
