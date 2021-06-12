// @ts-ignore
import chineseToPinyin from 'chinese-to-pinyin';
import axios from "axios";

const removeBrackets = (input: string) => {
    const removeIndex = input.search(/\(|（|-/g)

    return input.slice(0, removeIndex > -1 ? removeIndex : input.length).trim()
}

export const capitalizeString = (text : string) =>{
    if(!text) {
        return
    }
    return text.split(' ').map((word) =>
        word[0].toUpperCase() + word.slice(1)).join(' ')
}


export const getRomTitle = (title :string) => {
    title = removeBrackets(title)
    let romTitle = chineseToPinyin(title, {noTone: true})

    return capitalizeString(romTitle)?.replace(/,/g, ' ')

}

export const getSpotifyTrackId = (spotifyLink: string) => {
    if(!spotifyLink.includes('spotify:track:') && !spotifyLink.includes('https://open.spotify.com/track/')) {
        return ""
    }

    return spotifyLink
        .replace('spotify:track:', '')
        .replace('https://open.spotify.com/track/', '')
        .substring(0,22)
}

export const loadRepertoire = async() => {
    let response = await axios.get(`/api/v1/songs?category=id&order=ASC`)
    console.log(response.data)
    return response.data.songs
}

const keyIntMap = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]


export function convertDurationToMinSec(spotifyDuration : number) {

    let timeInSec = Math.round(spotifyDuration/1000)
    let min = Math.floor(timeInSec/60)
    let sec = Math.round(timeInSec - min * 60)

    return `${min}:${sec < 10 ? sec + '0' : sec}`
}

export function convertMinSecToMs(durationMinSec : string) {
    return parseInt(durationMinSec.split(':')[0]) * 60 + parseInt(durationMinSec.split(':')[1]) * 1000
}

export function convertKeyModeIntToKey(key: number, mode = 1) {

    if(key > 11 || key < 0 || mode > 1 || mode < 0 || key === undefined) {
        return
    }

    let keyString = keyIntMap[key]

    if(mode === 0) {
        keyString += 'm'
    }

    if(keyString === 'Dbm' || keyString === 'Gbm' || keyString === 'Abm') {
        return convertEnharmonic(keyString)
    }

    return keyString
}


export function convertEnharmonic(keyString: string) {
    let modeString;
    if(keyString[keyString.length - 1].toLowerCase() === 'm') {
        modeString = keyString[keyString.length - 1]
        keyString = keyString.substring(0,keyString.length - 1)
    }

    if(keyString.length > 2) return

    let note = keyString.replace(/[#b]/g,"")

    const accidental = keyString[keyString.length - 1]

    if(!/[A-Ga-g]/g.test(note) || note.length !== 1) return

    if(accidental !== '#' && accidental !== 'b') {
        return keyString
    }

    type EnharmonicPair = {
        [field: string] : string
    }

    const enharmonicPair : EnharmonicPair = {
        "Db" : "C#",
        "Eb" : "D#",
        "Gb" : "F#",
        "Ab" : "G#",
        "Bb" : "A#",
    }
    const result = accidental === '#'
        ?
        Object.keys(enharmonicPair).find(element => enharmonicPair[element] === keyString)
        :
        enharmonicPair[keyString]

    return result + (modeString ? modeString : "")

}
