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

export const loadUserRepertoire = async(user : any) => {

    try {
        const response = await axios.get(`/api/v1/songs?category=id&order=ASC`, {
            withCredentials: true,
            headers: {
                "x-auth-token": `Bearer ${user.tokenString}`
            }
        })

        return response.data
    } catch (error) {
        console.log('er')
        console.log(error)
        return error.response
    }


}

export const loadDatabaseData = async(tokenString : string) => {

    try {
        console.log('in funciton')
        console.log(tokenString)
        const response = await axios.get(`/api/v1/admin/songs?category=id&order=ASC`, {
            withCredentials: true,
            headers: {
                "x-auth-token": `Bearer ${tokenString}`
            }
        })

        return response.data
    } catch (error) {
        console.log('er')
        // console.log(error)
        return error.response
    }


}

export const loadUserMusicians = async(user: any) => {


    const response = await axios.get(`/api/v1/musicians?category=name&order=ASC`, {
        withCredentials: true,
        headers: {
            "x-auth-token": `Bearer ${user.tokenString}`
        }
    })


    return response.data.musicians
}

export const loadDatabaseMusicians = async() => {
    const response = await axios.get(`/api/v1/admin/musicians?category=name&order=ASC`)

    return response.data.musicians
}

export async function loadUserLanguages(user : any) {
    let res = await axios.get('/api/v1/languages', {
        withCredentials: true,
        headers: {
            "x-auth-token": `Bearer ${user.token}`
        }
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



