import React from 'react';
import styles from "./DashboardCard.module.scss";
import GigItemRow from "./GigItemRow";

export default function DashboardCard({type, data, link} : any) {

    const renderCardTitle =(type: string, data: object[]) => {
        switch(type) {
            case "repertoire":
                return (
                    <>
                        <p>You have added</p>
                        <p><span className="text-primary">3</span> songs this week</p>
                    </>
                )
            case "gigs":
                return(
                    <>
                        <p>You have <span className="text-primary">3</span> gigs </p>
                        <p>this week</p>
                    </>
                )
        }
    }

    const renderList = (type: string, data: object[]) => {
        switch(type) {
            case "repertoire":
                return (
                    <>
                        <p>Recently added:</p>
                        <ul>
                            <li>Song 1</li>
                            <li>Song 2</li>
                            <li>Song 3</li>
                        </ul>
                    </>


                )
            case "gigs":
                return (
                    <ul>
                        <li><GigItemRow /></li>
                        <li><GigItemRow /></li>
                        <li><GigItemRow /></li>
                    </ul>
                )
        }
    }

    const renderFooter = (type: string, link: string) => {
        switch(type) {
            case "repertoire":
                return (
                    <a href={link}>Go to My Repertoire {'>'}</a>
                )
            case "gigs":
                return (
                    <a href={link}>Go to My Gigs {'>'}</a>
                )
        }
    }




    return (

        <div className={`${styles.container} card`}>
            <div className={styles.title}>
                {renderCardTitle(type, data)}

            </div>
           <div className={styles.list}>
               {renderList(type, data)}
           </div>

            <div className={styles.footer}>
                {renderFooter(type, link)}
            </div>
        </div>
    )
}

