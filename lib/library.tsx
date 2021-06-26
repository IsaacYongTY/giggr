// @ts-ignore
import chineseToPinyin from 'chinese-to-pinyin';
import axios from "axios";
import {RefObject} from "react";

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

export const loadUserRepertoire = async(database = 'database1') => {

    let response;

    try {
        response = await axios.get(`/api/v1/songs?category=id&order=ASC`)

        return response.data.songs
    } catch (error) {
        console.log(error)
        return error.response
    }


}

export const loadDatabaseRepertoire = async() => {

    let response;


        response = await axios.get(`/api/v1/admin/songs?category=id&order=ASC`)




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

export function shakeAnimation(ref: RefObject<HTMLInputElement>) {

    ref.current?.classList.add("error-shake")
    ref.current?.classList.add("error-textbox-border")
    setTimeout(() => {
        ref.current?.classList.remove("error-shake")
    },1000)

}

export function convertMinSecToMs(durationMinSec : string) {
    return parseInt(durationMinSec.split(':')[0]) * 60 + parseInt(durationMinSec.split(':')[1]) * 1000
}



