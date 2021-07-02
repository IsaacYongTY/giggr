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
import LanguagesSingleDropdown from "../LanguagesSingleDropdown";

import ArtistsSingleDropdown from "../ArtistsSingleDropdown";
import KeysDropdown from "../KeysDropdown";
import CategoriesDropdown from "../CategoriesDropdown";


type Option = {
    value: string,
    label: string
}

interface Form {
    [key: string] : any
    title?: string
    romTitle?: string
    artist?: string

    key?: number
    mode?: number
    tempo?: number,

    durationMinSec?: string
    timeSignature?: string
    language?: string

    spotifyLink?: string
    youtubeLink?: string
    otherLink?: string

    composers?: Option[]
    songwriters?: Option[]
    arrangers?: Option[]

    initialism?: string

    acousticness?: number
    danceability?: number
    energy?: number
    instrumentalness?: number
    valence?: number

    moods?: Option[]
    genres?: Option[]
    tags?: Option[]


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

    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const [formValue, setFormValue] = useState<Form>({})



    let url = `/api/v1/songs`

    if(database === 'master') {
        url = `api/v1/admin/songs`
    }

    useEffect(() => {



        if(type === 'edit' && song) {
            let { title, artist, romTitle, key, mode, tempo, durationMs, timeSignature,
                language, spotifyLink, youtubeLink, otherLink, composers, arrangers, songwriters, initialism,
                energy, danceability, valence, acousticness, instrumentalness, genres, moods, tags } = song
            console.log(song)
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

            }

            setFormValue(value)
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
        setFormValue((prevState : any) => ({...prevState, [e.target.name]: e.target.value}))
    }

    function handleCloseModal() {
        setFormValue({})
        setIsModalOpen(false)
    }

    async function handleAddSong() {
        try {
            await axios.post(url, {
                ...formValue,
                composers: formValue.composers?.map((composer: Option) => composer.value),
                songwriters: formValue.songwriters?.map((songwriter : Option) => songwriter.value),
                arrangers: formValue.arrangers?.map((arranger : Option) => arranger.value),
                genres: formValue.genres?.map((genre : Option) => genre.value),
                moods: formValue.moods?.map((mood : Option) => mood.value),
                tags: formValue.tags?.map((tag : Option) => tag.value)
            }, {
                withCredentials: true,
                headers: {
                    "x-auth-token": `Bearer ${user.tokenString}`
                }
            })

            setIsAlertOpen(true)

            let data = database === "database1" ? await loadUserData(user) : await loadDatabaseData(user.tokenString)
            let refreshedMusicians = await loadUserMusicians(user)

            setSongs(data.songs)
            setMusicians(refreshedMusicians)

            handleCloseModal()

            setTimeout(() => {
                setIsAlertOpen(false)
            }, 5000)


        } catch (error) {
            console.log('wentwrong')
            console.log(error)
        }
    }

    console.log(data)
    async function handleEditSong(id : number) {

        try {
            await axios.patch(`${url}/${id}`, {
                ...formValue,
                composers: formValue.composers?.map(composer => composer.value),
                songwriters: formValue.songwriters?.map(arranger => arranger.value),
                arrangers: formValue.arrangers?.map(arranger => arranger.value),
                genres: formValue.genres?.map(genre => genre.value),
                moods: formValue.moods?.map(mood => mood.value),
                tags: formValue.tags?.map(tag => tag.value)
            }, {
                withCredentials: true,
                headers: {
                    "x-auth-token": `Bearer ${user.tokenString}`
                }

            })

            let data = database === "database1" ? await loadUserData(user) : await loadDatabaseData(user.tokenString)
            console.log(data)

            let refreshedMusicians = await loadUserMusicians(user)
            console.log(refreshedMusicians)
            setSongs(data.songs)
            setMusicians(refreshedMusicians)

            handleCloseModal()

            setTimeout(() => {
                setIsAlertOpen(false)
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
                <input className={styles.titleInput} placeholder="Title" name="title" onChange={handleInput} value={formValue.title}/>

                { type === "add" && <SpotifySearchBar setFormValue={setFormValue} database={database} user={user}/> }

                <div className={styles.formRow}>
                    <label>Artist:
                        <ArtistsSingleDropdown
                            musicians={musicians}
                            selectedArtist={formValue.artist || ""}
                            setFormValue={setFormValue}
                        />
                    </label>

                    <label>
                        Romanized Title:
                        <input className="form-control" name="romTitle" onChange={handleInput} value={formValue.romTitle} />
                    </label>
                </div>

                <div className={styles.formRow}>

                    <KeysDropdown
                        formValue={formValue}
                        setFormValue={setFormValue}
                    />

                    <label>Tempo:
                        <input className="form-control" name="tempo" type="number" onChange={handleInput} value={formValue.tempo || ""} />
                    </label>

                    <label>Duration:
                        <input className="form-control" name="durationMinSec" onChange={handleInput} placeholder="m:ss" value={formValue.durationMinSec}/>
                    </label>

                    <label>Time Signature:
                        <input className="form-control" name="timeSignature" onChange={handleInput} placeholder="4/4" value={formValue.timeSignature}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Language:
                        <LanguagesSingleDropdown
                            options={data.languages}
                            currentSelection={formValue.language || ""}
                            setFormValue={setFormValue}
                        />
                    </label>

                    <label>Initialism:
                        <input className="form-control" name="initialism" onChange={handleInput} value={formValue.initialism}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <ReactMusiciansDropdown
                        label="Composers"
                        role="composers"
                        musicians={musicians}
                        selectedMusicians={formValue.composers || []}
                        setFormValue={setFormValue}
                    />
                    <ReactMusiciansDropdown
                        label="Songwriters"
                        role="songwriters"
                        musicians={musicians}
                        selectedMusicians={formValue.songwriters || []}
                        setFormValue={setFormValue}
                    />
                </div>

                <div className={styles.formRow}>
                    <ReactMusiciansDropdown
                        label="Arrangers"
                        role="arrangers"
                        musicians={musicians}
                        selectedMusicians={formValue.arrangers || []}
                        setFormValue={setFormValue}
                    />
                    <CategoriesDropdown
                        label="Genres"
                        role="genres"
                        categories={data.genres}
                        selectedCategories={formValue.genres || []}
                        setFormValue={setFormValue}
                    />
                </div>

                <div className={styles.formRow}>
                    <CategoriesDropdown
                        label="Moods"
                        role="moods"
                        categories={data.moods}
                        selectedCategories={formValue.moods || []}
                        setFormValue={setFormValue}

                    />
                    <CategoriesDropdown
                        label="Tags"
                        role="tags"
                        categories={data.tags}
                        selectedCategories={formValue.tags || []}
                        setFormValue={setFormValue}

                    />
                </div>

                <div className={`${styles.formRow} ${styles.flexEnd}`}>
                    <label>Spotify Link:
                        <input className="form-control" name="spotifyLink" onChange={handleInput} value={formValue.spotifyLink}/>

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
                        <input className="form-control" name="youtubeLink" onChange={handleInput} value={formValue.youtubeLink}/>
                    </label>

                    <label>Other Link:
                        <input className="form-control" name="otherLink" onChange={handleInput} value={formValue.otherLink}/>
                    </label>
                </div>

                <br />
                <div className={styles.formRow}>
                    <label>
                        Energy:
                        <input type="number" name="energy" disabled={true} className="form-control" value={formValue.energy} />
                    </label>
                    <label>
                        Danceability:
                        <input type="number" name="danceability" disabled={true} className="form-control" value={formValue.danceability} />
                    </label>
                    <label>
                        Valence:
                        <input type="number" name="valence" disabled={true} className="form-control" value={formValue.valence} />
                    </label>
                    <label>
                        Acousticness:
                        <input type="number" name="acousticness" disabled={true} className="form-control" value={formValue.acousticness} />
                    </label>
                    <label>
                        Instrumentalness:
                        <input type="number" name="instrumentalness" disabled={true} className="form-control" value={formValue.instrumentalness} />
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
                    <button className="btn btn-primary" onClick={() => console.log("generate metadata head")}>Generate Metadata Head</button>
                    {
                        isAlertOpen &&
                        <AlertBox message="added successfully" timeout={5} setIsAlertOpen={setIsAlertOpen}/>
                    }
                </div>

            </div>


        </Modal>
    )
}
