// @ts-ignore
import chineseToPinyin from 'chinese-to-pinyin';
import axios from "axios";

export const convertDurationToMinSec = function (spotifyDuration : number) {

    let timeInSec = Math.round(spotifyDuration/1000)
    let min = Math.floor(timeInSec/60)
    let sec = Math.round(timeInSec - min * 60)

    return `${min}:${sec < 10 ? sec + '0' : sec}`
}

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
    return response.data.songs
}