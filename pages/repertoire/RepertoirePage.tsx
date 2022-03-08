import React, { useState } from 'react';
import classnames from 'classnames/bind';
import useSWR from 'swr';
import { GetServerSideProps } from 'next';

import Layout from 'components/Layout';
import withAuth from 'middlewares/withAuth';
import SearchBar from 'components/common/SearchBar';
import RepertoireTable from 'components/repertoire/RepertoireTable';
import FilterRow from 'components/repertoire/FilterRow';

import { Musician, Song } from 'common/types';

import styles from './RepertoirePage.module.scss';
import AddSongModal from '../../components/repertoire/AddSongModal';
import ActionRow from '../../components/repertoire/ActionRow';

const cx = classnames.bind(styles);

export const getServerSideProps: GetServerSideProps = withAuth(
    async ({ req }: any) => {
        return {
            props: {
                user: req.user,
            },
        };
    }
);

type Props = {
    initialSongs?: Song[];
    initialData?: {
        songs: Song[];
        musicians: Musician[];
        genres: {
            id: number;
            name: string;
        }[];
        tags: {
            id: number;
            name: string;
        }[];
        moods: {
            id: number;
            name: string;
        }[];
        languages: {
            id: number;
            name: string;
        }[];
    };
    user: any;
};

export default function RepertoirePage({ user }: Props) {
    const { data } = useSWR(`/api/v1/users?category=id&order=ASC`);

    const [filter, setFilter] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongList, setFilteredSongList] = useState<Song[]>([]);

    return (
        <Layout title="My Repertoire" user={user}>
            <div className={cx('container')}>
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
                    data={data}
                />
            </div>
        </Layout>
    );
}
