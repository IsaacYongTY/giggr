import convertEnharmonic from "./convert-enharmonic";
import { noteArray } from "../data/data";

export default function convertKeyModeIntToKey(key: number, mode : number) {

    if(key > 11 || key < 0 || mode > 1 || mode < 0 || key === undefined) {
        return
    }

    let keyString = noteArray[key]

    if(mode === 0) {
        keyString += 'm'
    }

    if(keyString === 'Dbm' || keyString === 'Gbm' || keyString === 'Abm') {
        return convertEnharmonic(keyString)
    }

    return keyString
}
