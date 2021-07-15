import React, {useEffect, useState} from "react"
import SpotifySearchBar from "./SpotifySearchBar";
import styles from "../../assets/scss/components/repertoire/_add-song-modal.module.scss";
import ArtistsSingleDropdown from "../repertoire/ArtistsSingleDropdown";
import KeysDropdown from "./KeysDropdown";
import LanguagesSingleDropdown from "../repertoire/LanguagesSingleDropdown";
import MusiciansMultiSelectDropdown from "../repertoire/MusiciansMultiSelectDropdown";
import CategoriesDropdown from "../repertoire/CategoriesDropdown";
import ButtonWithLoader from "./ButtonWithLoader";
import axios from "axios";
import {loadDatabaseData, loadUserData, loadUserMusicians} from "../../lib/library";
import Form from "../../lib/types/Form";
import convertDurationMsToMinSec from "../../lib/utils/convert-duration-ms-to-min-sec";
import Song from "../../lib/types/song";
import Musician from "../../lib/types/musician";

type Option = {
    value: string,
    label: string
}

interface Props {
    type: string
    database: string
    form: Form
    setForm: any
    user: any
    handleCloseModal: any
    song: Song | undefined
    setSongs: any
    setMusicians: any
    setAlertMessage: any
    setAlertType: any
    musicians: Musician[]
    isModalOpen: boolean,
    data: any
    handleInput: any
}
export default function SongDetailForm({type, database, form, user, handleCloseModal, song,
    setSongs, setMusicians, setAlertMessage, setAlertType, musicians, setForm,
    isModalOpen, data, handleInput
} : Props) {

    const [isLoading, setIsLoading] = useState(false)

    let url = `/api/v1/songs`

    if(database === 'master') {
        url = `api/v1/admin/songs`
    }

    async function handleAddSong() {
        setIsLoading(true)
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

            let data = database === "database1" ? await loadUserData(user) : await loadDatabaseData(user.tokenString)
            let refreshedMusicians = await loadUserMusicians(user)

            setSongs(data.songs)
            setMusicians(refreshedMusicians)

            handleCloseModal()

            setIsLoading(false)

            setAlertMessage("added successfully")
            setAlertType("success")

            setTimeout(() => {
                setAlertMessage("")
            }, 5000)



        } catch (error) {
            setIsLoading(false)
            console.log('wentwrong')
            console.log(error)
        }
    }

    async function handleEditSong(id : number) {

        setIsLoading(true)
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

            setIsLoading(false)

            setAlertMessage("added successfully")
            setAlertType("success")

            setTimeout(() => {
                setAlertMessage("")
            }, 3000)

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {

        if(type === 'edit' && song) {
            let { title, artist, romTitle, key, myKey, mode, tempo, durationMs, timeSignature,
                language, spotifyLink, youtubeLink, otherLink, composers, arrangers, songwriters, initialism,
                energy, danceability, valence, acousticness, instrumentalness, genres, moods, tags, dateReleased} = song

            let value : Form = {
                title,
                romTitle,
                artist: artist?.name,

                key,
                myKey,
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

    return (
        <div>
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
                    label="Key"
                    form={form}
                    setForm={setForm}
                />
                <KeysDropdown
                    label="My Key"
                    keyProp="myKey"
                    form={form}
                    setForm={setForm}
                    showIsMinorCheckbox={false}
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
                        options={data?.languages}
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
                <MusiciansMultiSelectDropdown
                    label="Composers"
                    role="composers"
                    musicians={musicians}
                    selectedMusicians={form.composers || []}
                    setFormValue={setForm}
                />
                <MusiciansMultiSelectDropdown
                    label="Songwriters"
                    role="songwriters"
                    musicians={musicians}
                    selectedMusicians={form.songwriters || []}
                    setFormValue={setForm}
                />
            </div>

            <div className={styles.formRow}>
                <MusiciansMultiSelectDropdown
                    label="Arrangers"
                    role="arrangers"
                    musicians={musicians}
                    selectedMusicians={form.arrangers || []}
                    setFormValue={setForm}
                />
                <CategoriesDropdown
                    label="Genres"
                    role="genres"
                    categories={data?.genres}
                    selectedCategories={form.genres || []}
                    setFormValue={setForm}
                />
            </div>

            <div className={styles.formRow}>
                <CategoriesDropdown
                    label="Moods"
                    role="moods"
                    categories={data?.moods}
                    selectedCategories={form.moods || []}
                    setFormValue={setForm}

                />
                <CategoriesDropdown
                    label="Tags"
                    role="tags"
                    categories={data?.tags}
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
                        <ButtonWithLoader
                            onClick={() => handleEditSong(song.id)}
                            isLoading={isLoading}
                            label="Confirm Edit"
                        />
                        :
                        <ButtonWithLoader
                            onClick={handleAddSong}
                            isLoading={isLoading}
                            label="Add"
                        />

                }
                <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
        </div>
        </div>
    )
}