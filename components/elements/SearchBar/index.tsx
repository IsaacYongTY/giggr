import React, {useEffect, useState} from "react";
import styles from "./SearchBar.module.scss";
import Song, { Artist } from "../../../lib/types/song";

export default function SearchBar({ setFilteredSongList, songs, filter, searchTerm, setSearchTerm }: any ) {

    useEffect(() => {
        setFilteredSongList((prevState: any) => {
            if(filter === "artist") {
                return songs.filter((song: Song) =>  song.artist?.enName?.toLowerCase().includes(searchTerm))
            }

            return songs?.filter((song: Song ) => song[filter]?.toLowerCase().includes(searchTerm))
        })

    },[searchTerm, filter])


    function handleSetSearchTerm(e: React.ChangeEvent<HTMLInputElement>):void {
        setSearchTerm(() => e.target.value)
    }

    return (

        <div className={styles.searchBar}>
            <input
                type="text"
                className="form-control"
                name="searchTerm"
                onChange={handleSetSearchTerm}
                placeholder="Search..."
                autoComplete="off"
            />

        </div>


    )

}