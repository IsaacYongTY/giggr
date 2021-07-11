import React, {useEffect, useState} from 'react';
import Layout from '../../components/layouts/Layout';
import axios from "axios";
import Musician from "../../lib/types/musician";
import withAuth from "../../middlewares/withAuth";


type Option = {
    value: string,
    label: string
}

export const getServerSideProps = withAuth(async({req, res} : any) => {
    return {
        props: {
            user: req.user
        }
    }
})


export default function Playground({ user }: any) {

    const [selectedMusicians, setSelectedMusicians] = useState<Musician[]>([])
    const [options, setOptions] = useState<Option[]>([])

    useEffect(() => {
        axios.get('/api/v1/musicians').then((res) => {

            setOptions(res.data.musicians.map((musician: Musician) => ({
                value: musician.name,
                label: musician.name
            })))
        })

        axios.get('api/v1/songs/1').then((res) => {

            console.log(res.data.song.composers)
            setSelectedMusicians(res.data.song.composers.map((composer: any) => ({value: composer.name, label: composer.name})))

        })
    },[])

    return (
        <Layout user={user} title="Playground">
            <div>something here</div>

        </Layout>
    )
}