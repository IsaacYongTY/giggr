import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../../assets/scss/components/repertoire/_search-bar.module.scss";
import Song, { Artist } from "../../lib/types/song";

interface Props {
    setFilteredSongList: Dispatch<SetStateAction<Song[]>>,
    songs: Song[],
    filter: string,
    searchTerm : string,
    setSearchTerm: Dispatch<SetStateAction<string>>
}
export default function SearchBar({ setFilteredSongList, songs, filter, searchTerm, setSearchTerm }: Props ) {

    useEffect(() => {
        setFilteredSongList((prevState) => {
            if(filter === "artist") {
                return songs.filter((song: Song) =>  song.artist?.enName?.toLowerCase().includes(searchTerm))
            }
            if(filter === "initialism" || filter === "title") {
                return songs?.filter((song: Song ) => song[filter]?.toLowerCase().includes(searchTerm))
            }
            return []

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