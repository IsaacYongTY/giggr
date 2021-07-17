// @ts-ignore
import chineseToPinyin from 'chinese-to-pinyin'
import removeBracketsAndSuffixes from "./remove-brackets-and-suffixes";

export const capitalizeString = (romTitle : string) => romTitle.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

export default function getRomTitle(title : string) {
    title = removeBracketsAndSuffixes(title)
    let romTitle = chineseToPinyin(title, {removeTone: true})
    return capitalizeString(romTitle).replace(/,/g, ' ')

}
