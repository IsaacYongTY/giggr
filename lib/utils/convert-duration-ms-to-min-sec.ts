export default function convertDurationMsToMinSec(durationMs : number) : string | undefined {

    if(durationMs < 0) return

    let timeInSec = Math.round(durationMs/1000)
    let min = Math.floor(timeInSec/60)
    let sec = Math.round(timeInSec - min * 60)

    return `${min}:${sec < 10 ? `0${sec}` : sec}`
}