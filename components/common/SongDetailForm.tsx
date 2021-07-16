import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import SpotifySearchBar from "./SpotifySearchBar";
import styles from "../../assets/scss/components/repertoire/_add-song-modal.module.scss";
import ArtistsSingleDropdown from "../repertoire/ArtistsSingleDropdown";
import KeysDropdown from "./KeysDropdown";
import LanguagesSingleDropdown from "../repertoire/LanguagesSingleDropdown";
import MusiciansMultiSelectDropdown from "../repertoire/MusiciansMultiSelectDropdown";
import CategoriesDropdown from "../repertoire/CategoriesDropdown";
import ButtonWithLoader from "./ButtonWithLoader";
import axios from "../../config/axios";
import {loadDatabaseData, loadUserData, loadUserMusicians} from "../../lib/library";
import Form from "../../lib/types/Form";
import convertDurationMsToMinSec from "../../lib/utils/convert-duration-ms-to-min-sec";
import Song from "../../lib/types/song";
import Musician from "../../lib/types/musician";
import SingleDropdown from "../repertoire/SingleDropdown";
import {mutate, trigger} from "swr";

type Option = {
    value: string,
    label: string
}

interface Data {

    songs: Song[]
    musicians: Musician[]
    genres: { id: number, name: string }[],
    tags: { id: number, name: string }[],
    moods: { id: number, name: string }[],
    languages: { id: number, name: string }[],
}
interface Props {
    type: string
    database: string
    form: Form
    setForm: Dispatch<SetStateAction<Form>>
    user: any
    handleCloseModal: any
    song: Song | undefined
    setAlertMessage: any
    setAlertType: any
    musicians: Musician[]
    isModalOpen: boolean,
    data: Data
    handleInput: any
}
export default function SongDetailForm({type, database, form, user, handleCloseModal, song,
   setAlertMessage, setAlertType, musicians, setForm,
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
            let { composers, songwriters, arrangers, genres, moods, tags, id, title, romTitle, key, myKey, mode, tempo,
            timeSignature, spotifyLink, youtubeLink, otherLink, initialism, status } = form

            const editedForm = {
                ...form,
                composers: composers?.map((composer: Option) => composer.value),
                songwriters: songwriters?.map((songwriter : Option) => songwriter.value),
                arrangers: arrangers?.map((arranger : Option) => arranger.value),
                genres: genres?.map((genre : Option) => genre.value),
                moods: moods?.map((mood : Option) => mood.value),
                tags: tags?.map((tag : Option) => tag.value)
            }


            const foundSong = data.songs.find(song => song.id === editedForm.id)
            const foundIndex = data.songs.findIndex(song => song.id === editedForm.id)

            const tempSong : Song= {
                id: id || -1,
                title: title || "",
                romTitle: romTitle || "",
                key: key || -1,
                myKey: myKey || -1,
                mode: mode || -1,
                tempo: tempo || 0,
                timeSignature: timeSignature || "",

                spotifyLink: spotifyLink || "",
                youtubeLink: youtubeLink || "",
                otherLink: otherLink || "",

                initialism: initialism || "",

                acousticness: 0,
                danceability: 0,
                energy: 0,
                instrumentalness: 0,
                valence: 0,
                dateReleased: "",

                status: status || "",
                languageId: -1,
                durationMs: 0,
                artist: {
                    name: editedForm.artist || "",
                    romName: "",
                    spotifyName: ""
                },
                artistId: foundSong?.artistId || -1,
                language: { id: 1,  name: editedForm.language || ""},
                composers: editedForm.composers?.map((composer: string) => ({
                    name: composer,
                    romName: "",
                    spotifyName: ""
                })) || [],
                songwriters: editedForm.songwriters?.map((songwriter: string) => ({
                    name: songwriter,
                    romName: "",
                    spotifyName: ""
                })) || [],
                arrangers: editedForm.arrangers?.map((arranger: string) => ({
                    name: arranger,
                    romName: "",
                    spotifyName: ""
                })) || [],
                genres: editedForm.genres?.map((genre : string) => ({ id: -1, name: genre})) || [],
                moods: editedForm.moods?.map((mood : string) => ({ id: -1, name: mood})) || [],
                tags: editedForm.tags?.map((tags : string) => ({ id: -1, name: tags})) || [],
            }


            data.songs.push(tempSong)


            mutate('/api/v1/users?category=id&order=ASC', data, false )

            handleCloseModal()

            setIsLoading(false)

            setAlertMessage("added successfully")
            setAlertType("success")

            setTimeout(() => {
                setAlertMessage("")
            }, 5000)

            await axios.post(url, editedForm )
            trigger('/api/v1/users?category=id&order=ASC')


        } catch (error) {
            setIsLoading(false)
            console.log('wentwrong')
            console.log(error)
        }
    }

    async function handleEditSong(id : number, closeModal: boolean) {

        setIsLoading(true)
        try {

            let { composers, songwriters, arrangers, genres, moods, tags, id, title, romTitle, key, myKey, mode, tempo,
                timeSignature, spotifyLink, youtubeLink, otherLink, initialism, status } = form

            const editedForm = {
                ...form,
                composers: composers?.map((composer: Option) => composer.value),
                songwriters: songwriters?.map((songwriter : Option) => songwriter.value),
                arrangers: arrangers?.map((arranger : Option) => arranger.value),
                genres: genres?.map((genre : Option) => genre.value),
                moods: moods?.map((mood : Option) => mood.value),
                tags: tags?.map((tag : Option) => tag.value)
            }


            const foundSong = data.songs.find(song => song.id === editedForm.id)
            const foundIndex = data.songs.findIndex(song => song.id === editedForm.id)

            const tempSong : Song= {
                ...editedForm,
                id: id || -1,
                title: title || "",
                romTitle: romTitle || "",
                key: key || -1,
                myKey: myKey || -1,
                mode: mode || -1,
                tempo: tempo || 0,
                timeSignature: timeSignature || "",

                spotifyLink: spotifyLink || "",
                youtubeLink: youtubeLink || "",
                otherLink: otherLink || "",

                initialism: initialism || "",

                acousticness: 0,
                danceability: 0,
                energy: 0,
                instrumentalness: 0,
                valence: 0,
                dateReleased: "",

                status: status || "",
                languageId: -1,
                durationMs: 0,
                artist: {
                    name: editedForm.artist || "",
                    romName: "",
                    spotifyName: ""
                },
                artistId: foundSong?.artistId || -1,
                language: { id: 1,  name: editedForm.language || ""},
                composers: editedForm.composers?.map((composer: string) => ({
                    name: composer,
                    romName: "",
                    spotifyName: ""
                })) || [],
                songwriters: editedForm.songwriters?.map((songwriter: string) => ({
                    name: songwriter,
                    romName: "",
                    spotifyName: ""
                })) || [],
                arrangers: editedForm.arrangers?.map((arranger: string) => ({
                    name: arranger,
                    romName: "",
                    spotifyName: ""
                })) || [],
                genres: editedForm.genres?.map((genre : string) => ({ id: -1, name: genre})) || [],
                moods: editedForm.moods?.map((mood : string) => ({ id: -1, name: mood})) || [],
                tags: editedForm.tags?.map((tags : string) => ({ id: -1, name: tags})) || [],
            }
            if(foundIndex > -1) {
                data.songs[foundIndex] = tempSong
                console.log(data.songs)
            }

            mutate('/api/v1/users?category=id&order=ASC', data, false )

            if(closeModal) {
                handleCloseModal()
            }

            setIsLoading(false)

            setAlertMessage("added successfully")
            setAlertType("success")

            setTimeout(() => {
                setAlertMessage("")
            }, 3000)

            await axios.put(`${url}/${form.id}`, editedForm )
            trigger('/api/v1/users?category=id&order=ASC')

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }


    useEffect(() => {

        if(type === 'edit' && song) {
            console.log('running')
            let { id, title, artist, romTitle, key, myKey, mode, tempo, durationMs, timeSignature,
                language, spotifyLink, youtubeLink, otherLink, composers, arrangers, songwriters, initialism,
                energy, danceability, valence, acousticness, instrumentalness, genres, moods, tags, dateReleased, status} = song

            let value : Form = {
                id,
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
                dateReleased,

                status,
                artistId: song.artistId,
                languageId: song.languageId,
                durationMs: song.durationMs

            }

            setForm(value)
        }
        console.log(data)
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
                {
                    !user?.isAdmin &&
                    <KeysDropdown
                        label="My Key"
                        keyProp="myKey"
                        form={form}
                        setForm={setForm}
                        showIsMinorCheckbox={false}
                    />
                }

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

                <label>Status:
                    <SingleDropdown
                        name="status"
                        options={["New", "In Progress", "Learned", "Charted"]}
                        currentSelection={form.status || ""}
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
                        <>
                            <ButtonWithLoader
                                onClick={() => handleEditSong(song.id, false)}
                                isLoading={isLoading}
                                label="Save"
                            />
                            <button className="btn btn-danger-outlined" onClick={handleCloseModal}>Close</button>
                            <ButtonWithLoader
                                onClick={() => handleEditSong(song.id, true)}
                                isLoading={isLoading}
                                label="Save and Close"
                            />
                        </>

                        :
                        <>
                            <ButtonWithLoader
                                onClick={handleAddSong}
                                isLoading={isLoading}
                                label="Add"
                            />
                            <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                        </>

                }

        </div>
        </div>
    )
}