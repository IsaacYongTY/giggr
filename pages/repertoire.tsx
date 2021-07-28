import React, { useState} from 'react';
import Layout from "../components/layouts/Layout";
import SearchBar from "../components/common/SearchBar";
import RepertoireTable from "../components/repertoire/RepertoireTable";
import withAuth from "../middlewares/withAuth";
import { GetServerSideProps } from "next";
import Song from "../lib/types/song";
import FilterRow from "../components/repertoire/FilterRow";
import styles from "../assets/scss/pages/_repertoire.module.scss";
import Musician from "../lib/types/musician";
import useSWR from "swr";
import axios from "axios";
import AlertBox from "../components/common/AlertBox";

export const getServerSideProps : GetServerSideProps = withAuth( async({ req, res } : any) => {

    return {
        props: {
            user: req.user
        }
    }

})

type Props = {
    initialSongs?: Song[],
    initialData?: {
        songs: Song[]
        musicians: Musician[]
        genres: {
            id: number,
            name: string
        }[],
        tags: {
            id: number,
            name: string
        }[],
        moods: {
            id: number,
            name: string
        }[],
        languages: {
            id: number,
            name: string
        }[],
    }
    user: any
}

interface Data {

    songs: Song[]
    musicians: Musician[]
    genres: { id: number, name: string }[],
    tags: { id: number, name: string }[],
    moods: { id: number, name: string }[],
    languages: { id: number, name: string }[],
}
export default function Repertoire({ user }: Props) {

    const { data } = useSWR(`/api/v1/users?category=id&order=ASC`)

    const [filter, setFilter] = useState("title")
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongList, setFilteredSongList] = useState<Song[]>([]);



    return (
        <>

            <Layout title="My Repertoire" user={user}>
                <div className={styles.container}>

                    <FilterRow setFilter={setFilter} />

                    <SearchBar
                        songs={data?.songs}
                        setFilteredSongList={setFilteredSongList}
                        filter={filter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />



                    <RepertoireTable
                        songs={searchTerm ? filteredSongList : data?.songs}
                        user={user}
                        database="database1"
                        data={data}
                    />


                </div>



            </Layout>



        </>
    )
}

