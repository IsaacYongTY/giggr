import React from 'react';
import styles from "./DashboardCard.module.scss";
import GigItemRow from "../GigItemRow";
import Song from "../../../lib/types/song"


export default function DashboardCard({type, data, link, gigs, songs} : any) {
    console.log(gigs)



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
                        <p>You have <span className="text-primary">{gigs.length}</span> gigs </p>
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
                            {
                                songs.map((song : Song) => (
                                    <li>{song.title} - {song.artist?.name}</li>
                                ))
                            }
                        </ul>
                    </>


                )
            case "gigs":
                return (
                    <ul>
                        {
                            gigs.slice(0,3).map( (gig : any) => (
                                <li>
                                    <GigItemRow gig={gig} />
                                </li>
                            ))
                        }
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

