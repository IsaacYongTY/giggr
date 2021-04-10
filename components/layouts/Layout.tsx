import React, {useState} from 'react';
import Header from '../elements/Header';
import Sidebar from '../elements/Sidebar';
import styles from '../layouts/Layout.module.scss';

export default function Layout( props: any) {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            <Header title={props.title}/>

            <div className={`${isOpen ? styles.layoutSidebarOpen : styles.layoutSidebarClose}`}>
                <div>
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
                </div>




                <div className={styles.layoutContent}>
                    <div className="container">
                        {props.children}
                    </div>

                </div>

            </div>




        </>

    )

}