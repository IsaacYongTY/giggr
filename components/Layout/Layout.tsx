import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Header from './Header';
import Sidebar from './Sidebar';

import styles from './Layout.module.scss';

interface Props {
    title?: string;
    user?: any;
    children: ReactNode;
}
export default function Layout({ title, user, children }: Props) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <Head>
                <title>{title} | GIGGR</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header title={title} setIsOpen={setIsOpen} isOpen={isOpen} />

            <div className={`${styles.layoutSidebar} ${isOpen ? styles.open : styles.close}`}>
                <div>
                    <Sidebar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        currentPathName={router.pathname}
                        user={user}
                    />
                </div>

                <div className={`${styles.layoutContent}`}>{children}</div>
            </div>
        </>
    );
}