import Form from "../types/Form";
import Song from "../types/song";
import convertDurationMinSecToMs from "./convert-duration-min-sec-to-ms";
import convertKeyModeIntToKey from "./convert-key-mode-int-to-key";

export default function convertSongFormToTempSong(form: Form) : Song {
    let {
        artist, composers, songwriters, arrangers, genres, moods, tags, id, title, romTitle, key, myKey, mode, tempo,
        timeSignature, spotifyLink, youtubeLink, otherLink, initialism, status
    } = form

    return {
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
        durationMs: convertDurationMinSecToMs(form.durationMinSec || "") || 0,
        artist: {
            name: artist || "",
            romName: "",
            spotifyName: ""
        },
        artistId: -1,
        language: {id: 1, name: form.language || ""},
        composers: composers?.map(composer => ({
            name: composer.value,
            romName: "",
            spotifyName: ""
        })) || [],
        songwriters: songwriters?.map(songwriter => ({
            name: songwriter.value,
            romName: "",
            spotifyName: ""
        })) || [],
        arrangers: arrangers?.map(arranger => ({
            name: arranger.value,
            romName: "",
            spotifyName: ""
        })) || [],
        genres: genres?.map(genre => ({id: -1, name: genre.value})) || [],
        moods: moods?.map(mood => ({id: -1, name: mood.value})) || [],
        tags: tags?.map(tags => ({id: -1, name: tags.value})) || [],
    }
}

