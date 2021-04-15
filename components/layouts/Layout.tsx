import React, { useState, useEffect } from 'react';
import Header from '../elements/Header';
import Sidebar from '../elements/Sidebar';
import styles from '../layouts/Layout.module.scss';
import { useRouter } from "next/router";
import Head from "next/head";

export default function Layout( props: any) {

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <Head>
                <title>{props.title} | GIGGR</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>


            <Header title={props.title}/>

            <div className={`${styles.layoutSidebar} ${isOpen ? styles.open : styles.close}`}>
                <div>
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} currentPathName={router.pathname}/>
                </div>

                <div className={`${styles.layoutContent} ${isOpen ? styles.contentOpen : styles.contentClose}`}>

                        {props.children}


                </div>

            </div>
        </>

    )

}