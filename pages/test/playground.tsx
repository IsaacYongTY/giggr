import React, {useEffect, useState} from 'react';
import Layout from '../../components/layouts/Layout';

import ReactMusiciansDropdown from "../../components/ReactMusiciansDropdown";
import axios from "axios";
import Musician from "../../lib/types/musician";


type Option = {
    value: string,
    label: string
}


export default function Playground() {

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
        <Layout title="Playground">
            <div>something here</div>
            <ReactMusiciansDropdown options={options} selectedMusicians={selectedMusicians} setSelectedMusicians={setSelectedMusicians}/>
            {/*<MusiciansDropdown />*/}
        </Layout>
    )
}