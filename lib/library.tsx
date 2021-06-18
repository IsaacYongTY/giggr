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

export const loadRepertoire = async(database = 'database1') => {

    let response;
    console.log(database)
    if(database === 'master') {
        response = await axios.get(`/api/v1/admin/songs?category=id&order=ASC`)
    } else {
        response = await axios.get(`/api/v1/songs?category=id&order=ASC`)
    }

    console.log(response.data)
    return response.data.songs
}

export const loadMusicians = async(database = 'database1') => {

    let response;
    if(database === 'master') {
        response = await axios.get(`/api/v1/admin/musicians?category=name&order=ASC`)
    } else {
        response = await axios.get(`/api/v1/musicians?category=name&order=ASC`)
    }

    return response.data.musicians
}


export async function loadLanguages() {
    let res = await axios.get('/api/v1/languages', {
        withCredentials: true,
        // headers: {
        //     "x-auth-token": `Bearer ${req.user.token}`
        // }
    })

    return res.data.languages

}


export function convertMinSecToMs(durationMinSec : string) {
    return parseInt(durationMinSec.split(':')[0]) * 60 + parseInt(durationMinSec.split(':')[1]) * 1000
}



