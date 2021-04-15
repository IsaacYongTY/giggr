import React, {useState} from "react";
import styles from "./SearchBar.module.scss";

export default function SearchBar({ setFilteredSongList, songList, filter, searchTerm, setSearchTerm }: any) {


    function handleSetSearchTerm(e: any) {
        setSearchTerm(() => e.target.value)
        setFilteredSongList((prevState: any) => {
            // if(filter === "artist") {
            //
            //     return songList.filter((song: any) => song[filter]['enName'].includes(searchTerm))
            // }

            return songList.filter((song: any) => song[filter].includes(searchTerm))
        }

        )
    }
    console.log(searchTerm)
    return (
        <div className={styles.searchBar}>
            <input type="text" className="form-control" name="searchTerm" onChange={handleSetSearchTerm}/>
            {/*<button className="btn btn-primary" >Search</button>*/}
        </div>
    )
}