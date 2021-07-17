import React, { useState} from 'react';
import Layout from "../components/layouts/Layout";
import SearchBar from "../components/common/SearchBar";
import RepertoireTable from "../components/repertoire/RepertoireTable";
import withAuth from "../middlewares/withAuth";
import { GetServerSideProps } from "next";
import Song from "../lib/types/song";
import AddSongModal from "../components/repertoire/AddSongModal";
import FilterRow from "../components/repertoire/FilterRow";
import styles from "../assets/scss/pages/_repertoire.module.scss";
import ActionRow from "../components/repertoire/ActionRow";
import Musician from "../lib/types/musician";
import useSWR from "swr";

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

    const [songs, setSongs] = useState<Song[]>([])
    const [musicians, setMusicians] = useState<Musician[]>([])

    const [filter, setFilter] = useState("title")
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongList, setFilteredSongList] = useState<Song[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useSWR(`/api/v1/users?category=id&order=ASC`)


    return (
        <>

            <Layout title="My Repertoire" user={user}>
                <div className={styles.container}>

                    <FilterRow setFilter={setFilter} />

                    <SearchBar
                        songs={songs}
                        setFilteredSongList={setFilteredSongList}
                        filter={filter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <ActionRow setIsModalOpen={setIsModalOpen} database="database1"/>

                    <RepertoireTable
                        songs={searchTerm ? filteredSongList : data?.songs}
                        user={user}
                        database="database1"
                        musicians={data?.musicians}
                        data={data}
                    />
                </div>



            </Layout>

                <AddSongModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    type="add"
                    database="database1"
                    data={data}
                    user={user}
                />

        </>
    )
}

