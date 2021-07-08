import React, {useState, useEffect, Dispatch, SetStateAction } from "react";
import SpotifySearchBar from "../common/SpotifySearchBar";
import Modal from "react-modal";
import styles from "../../assets/scss/components/_add-song-modal.module.scss";
import AlertBox from "../common/AlertBox";
import axios from "axios";
import {loadDatabaseData, loadUserMusicians, loadUserData} from "../../lib/library";
import convertDurationMsToMinSec from "../../lib/utils/convert-duration-ms-to-min-sec";
import ReactMusiciansDropdown from "../ReactMusiciansDropdown";

import Musician from "../../lib/types/musician";
import Song from "../../lib/types/song";
import Form from "../../lib/types/Form";
import LanguagesSingleDropdown from "../LanguagesSingleDropdown";

import ArtistsSingleDropdown from "../ArtistsSingleDropdown";
import KeysDropdown from "../KeysDropdown";
import CategoriesDropdown from "../CategoriesDropdown";

import generateMetaData from "../../lib/utils/generate-metadata";

type Option = {
    value: string,
    label: string
}



type Props = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    type: string
    song?: Song
    database: string
    setSongs: Dispatch<SetStateAction<Song[]>>
    musicians: Musician[]
    setMusicians: Dispatch<SetStateAction<Musician[]>>
    user: any
    data: any
}


export default function AddSongModal({ isModalOpen, setIsModalOpen, type, database, song, setSongs, musicians, setMusicians, data, user }: Props) {

    const [alertMessage, setAlertMessage] = useState("")
    const [form, setForm] = useState<Form>({})

    let url = `/api/v1/songs`

    if(database === 'master') {
        url = `api/v1/admin/songs`
    }

    useEffect(() => {

        if(type === 'edit' && song) {
            let { title, artist, romTitle, key, mode, tempo, durationMs, timeSignature,
                language, spotifyLink, youtubeLink, otherLink, composers, arrangers, songwriters, initialism,
                energy, danceability, valence, acousticness, instrumentalness, genres, moods, tags, dateReleased} = song

            let value : Form = {
                title,
                romTitle,
                artist: artist?.name,

                key,
                mode,
                tempo,

                durationMinSec: convertDurationMsToMinSec(durationMs),
                timeSignature,
                language: language?.name,

                spotifyLink,
                youtubeLink,
                otherLink,
                composers: composers?.map((composer:any) => ({value: composer.name, label: composer.name})),
                arrangers: arrangers?.map((arranger:any) => ({value: arranger.name, label: arranger.name})),
                songwriters: songwriters?.map((songwriter:any) => ({value: songwriter.name, label: songwriter.name})),
                initialism,
                energy,
                danceability,
                valence,
                acousticness,
                instrumentalness,
                genres: genres?.map((genre:any) => ({value: genre.name, label: genre.name})),
                moods : moods?.map((mood:any) => ({value: mood.name, label: mood.name})),
                tags: tags?.map((tag:any) => ({value: tag.name, label: tag.name})),
                dateReleased
            }

            setForm(value)
        }

    },[isModalOpen])

    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '85rem',
            height: '80rem',
            padding: '5rem',
        }
    };
    
    function handleInput(e : any) {
        setForm((prevState : any) => ({...prevState, [e.target.name]: e.target.value}))
    }

    function handleCloseModal() {
        setForm({})
        setIsModalOpen(false)
    }

    async function handleAddSong() {
        try {
            let { composers, songwriters, arrangers, genres, moods, tags } = form
            await axios.post(url, {
                ...form,
                composers: composers?.map((composer: Option) => composer.value),
                songwriters: songwriters?.map((songwriter : Option) => songwriter.value),
                arrangers: arrangers?.map((arranger : Option) => arranger.value),
                genres: genres?.map((genre : Option) => genre.value),
                moods: moods?.map((mood : Option) => mood.value),
                tags: tags?.map((tag : Option) => tag.value)
            }, {
                withCredentials: true,
                headers: {
                    "x-auth-token": `Bearer ${user.tokenString}`
                }
            })

            setAlertMessage("added successfully")

            let data = database === "database1" ? await loadUserData(user) : await loadDatabaseData(user.tokenString)
            let refreshedMusicians = await loadUserMusicians(user)

            setSongs(data.songs)
            setMusicians(refreshedMusicians)

            handleCloseModal()

            setTimeout(() => {
               setAlertMessage("")
            }, 5000)


        } catch (error) {
            console.log('wentwrong')
            console.log(error)
        }
    }

    function handleGenerateMetaData() {
        console.log(form)
        let metaData = generateMetaData(form)
        console.log(metaData)
    }

    async function handleEditSong(id : number) {

        try {
            let { composers, songwriters, arrangers, genres, moods, tags } = form

            await axios.put(`${url}/${id}`, {
                ...form,
                composers: composers?.map(composer => composer.value),
                songwriters: songwriters?.map(arranger => arranger.value),
                arrangers: arrangers?.map(arranger => arranger.value),
                genres: genres?.map(genre => genre.value),
                moods: moods?.map(mood => mood.value),
                tags: tags?.map(tag => tag.value)
            }, {
                withCredentials: true,
                headers: {
                    "x-auth-token": `Bearer ${user.tokenString}`
                }

            })

            let data = database === "database1" ? await loadUserData(user) : await loadDatabaseData(user.tokenString)

            let refreshedMusicians = await loadUserMusicians(user)

            setSongs(data.songs)
            setMusicians(refreshedMusicians)

            handleCloseModal()

            setTimeout(() => {
                setAlertMessage("")
            }, 5000)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >

            <div className={styles.container}>
                <input className={styles.titleInput} placeholder="Title" name="title" onChange={handleInput} value={form.title}/>

                { type === "add" && <SpotifySearchBar setFormValue={setForm} database={database} user={user}/> }

                <div className={styles.formRow}>
                    <label>Artist:
                        <ArtistsSingleDropdown
                            musicians={musicians}
                            selectedArtist={form.artist || ""}
                            setFormValue={setForm}
                        />
                    </label>


                </div>

                <div className={styles.formRow}>

                    <KeysDropdown
                        form={form}
                        setForm={setForm}
                    />

                    <label>Tempo:
                        <input className="form-control" name="tempo" type="number" onChange={handleInput} value={form.tempo || ""} />
                    </label>

                    <label>Duration:
                        <input className="form-control" name="durationMinSec" onChange={handleInput} placeholder="m:ss" value={form.durationMinSec}/>
                    </label>

                    <label>Time Signature:
                        <input className="form-control" name="timeSignature" onChange={handleInput} placeholder="4/4" value={form.timeSignature}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Language:
                        <LanguagesSingleDropdown
                            options={data.languages}
                            currentSelection={form.language || ""}
                            setFormValue={setForm}
                        />
                    </label>

                    <label>
                        Romanized Title:
                        <input className="form-control" name="romTitle" onChange={handleInput} value={form.romTitle} />
                    </label>

                    <label>Initialism:
                        <input className="form-control" name="initialism" onChange={handleInput} value={form.initialism}/>
                    </label>

                    <label>Date Released:
                        <input className="form-control" name="dateReleased" onChange={handleInput} value={form.dateReleased}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <ReactMusiciansDropdown
                        label="Composers"
                        role="composers"
                        musicians={musicians}
                        selectedMusicians={form.composers || []}
                        setFormValue={setForm}
                    />
                    <ReactMusiciansDropdown
                        label="Songwriters"
                        role="songwriters"
                        musicians={musicians}
                        selectedMusicians={form.songwriters || []}
                        setFormValue={setForm}
                    />
                </div>

                <div className={styles.formRow}>
                    <ReactMusiciansDropdown
                        label="Arrangers"
                        role="arrangers"
                        musicians={musicians}
                        selectedMusicians={form.arrangers || []}
                        setFormValue={setForm}
                    />
                    <CategoriesDropdown
                        label="Genres"
                        role="genres"
                        categories={data.genres}
                        selectedCategories={form.genres || []}
                        setFormValue={setForm}
                    />
                </div>

                <div className={styles.formRow}>
                    <CategoriesDropdown
                        label="Moods"
                        role="moods"
                        categories={data.moods}
                        selectedCategories={form.moods || []}
                        setFormValue={setForm}

                    />
                    <CategoriesDropdown
                        label="Tags"
                        role="tags"
                        categories={data.tags}
                        selectedCategories={form.tags || []}
                        setFormValue={setForm}

                    />
                </div>

                <div className={`${styles.formRow} ${styles.flexEnd}`}>
                    <label>Spotify Link:
                        <input className="form-control" name="spotifyLink" onChange={handleInput} value={form.spotifyLink}/>

                    </label>
                    {
                        type === "edit" &&
                        <div className={styles.syncCol}>
                            <button className="btn btn-primary">Sync from Spotify</button>
                            <button className="btn btn-primary">Sync from Database</button>
                        </div>
                    }
                </div>

                <div className={styles.formRow}>
                    <label>YouTube Link:
                        <input className="form-control" name="youtubeLink" onChange={handleInput} value={form.youtubeLink}/>
                    </label>

                    <label>Other Link:
                        <input className="form-control" name="otherLink" onChange={handleInput} value={form.otherLink}/>
                    </label>
                </div>

                <div className={styles.formRow}>


                </div>

                <br />
                <div className={styles.formRow}>
                    <label>
                        Energy:
                        <input type="number" name="energy" disabled={true} className="form-control" value={form.energy} />
                    </label>
                    <label>
                        Danceability:
                        <input type="number" name="danceability" disabled={true} className="form-control" value={form.danceability} />
                    </label>
                    <label>
                        Valence:
                        <input type="number" name="valence" disabled={true} className="form-control" value={form.valence} />
                    </label>
                    <label>
                        Acousticness:
                        <input type="number" name="acousticness" disabled={true} className="form-control" value={form.acousticness} />
                    </label>
                    <label>
                        Instrumentalness:
                        <input type="number" name="instrumentalness" disabled={true} className="form-control" value={form.instrumentalness} />
                    </label>


                </div>

                <div className={styles.buttonRow}>
                    {
                        type === 'edit' && song
                            ?
                            <button
                                className="btn btn-primary"
                                onClick={() => handleEditSong(song.id)}
                            >
                                Confirm Edit
                            </button>
                            :
                            <button
                                className="btn btn-primary"
                                onClick={handleAddSong}
                            >
                                Add
                            </button>
                    }
                    <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                    <button className="btn btn-primary" onClick={() => handleGenerateMetaData()}>Generate Metadata Head</button>
                    {
                        alertMessage &&
                        <AlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>
                    }
                </div>

            </div>


        </Modal>
    )
}
