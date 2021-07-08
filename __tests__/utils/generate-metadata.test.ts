import Form from "../../lib/types/Form"
import convertKeyModeIntToKey from "../../lib/utils/convert-key-mode-int-to-key";

const sampleForm : Form = {
    title: "不遗憾",
    romTitle: "Bu Yi Han",
    artist: "Ronghao Li",
    durationMinSec: "5:29",
    timeSignature: "4/4",
    language: "mandarin",
    key: 2,
    mode: 1,
    tempo: 66,
    initialism: "byh",
    dateReleased: "2021-04-10",
    moods: [{value: "sad", label: "sad"}],
    genres: [{value: "pop", label: "pop"}, { value: "ballad", label: "ballad"}],
    tags: [{value: "theme song", label: "theme song"}]

}

const sampleForm2 : Form = {
    title: "我爱你",
    romTitle: "Wo Ai Ni",
    artist: "Crowd Lu",
    durationMinSec: "4:45",
    timeSignature: "4/4",
    language: "mandarin",
    key: 11,
    mode: 0,
    tempo: 93,
    initialism: "wan",
    dateReleased: "2008-11-10",
    moods: [{value: "sad", label: "sad"}],
    genres: [{value: "pop", label: "pop"}, { value: "funk", label: "funk"}],
    tags: [{value: "guitar", label: "guitar"}]

}
function generateMetaData(form: Form, pinyinSyllableNum = 0) : string {

    let { title, romTitle, artist, key, mode, tempo, durationMinSec,
        timeSignature, dateReleased, initialism, language } = form

    const displayedPinyin = pinyinSyllableNum && romTitle
        ? romTitle.split(' ').slice(0,pinyinSyllableNum).join(' ')
        : ""

    const keyString = key !== undefined && mode !== undefined
        ? convertKeyModeIntToKey(key, mode)
        : ""

    const yearReleased = dateReleased?.slice(0,4)

    return `${displayedPinyin} ${title}\n` +
    `${artist}\n` +
    `Key: ${keyString}\n` +
    `Tempo: ${tempo}\n` +
    `Duration: ${durationMinSec}\n` +
    `Time: ${timeSignature}\n`+
    `Keywords: ${initialism}, ${language}\n\n` +
    `Year Released: ${yearReleased}`
}

describe("generateMetaData", () => {
    it("should return metadata in OnSong format", () => {
        expect(generateMetaData(sampleForm, 2)).toBe("Bu Yi 不遗憾\n" +
            "Ronghao Li\n" +
            "Key: D\n" +
            "Tempo: 66\n" +
            "Duration: 5:29\n" +
            "Time: 4/4\n" +
            "Keywords: byh, mandarin\n\n" +
            "Year Released: 2021"
        )

        expect(generateMetaData(sampleForm2, 1)).toBe("Wo 我爱你\n" +
            "Crowd Lu\n" +
            "Key: Bm\n" +
            "Tempo: 93\n" +
            "Duration: 4:45\n" +
            "Time: 4/4\n" +
            "Keywords: wan, mandarin\n\n" +
            "Year Released: 2008"
        )

        expect(generateMetaData(sampleForm2, 99)).toBe("Wo Ai Ni 我爱你\n" +
            "Crowd Lu\n" +
            "Key: Bm\n" +
            "Tempo: 93\n" +
            "Duration: 4:45\n" +
            "Time: 4/4\n" +
            "Keywords: wan, mandarin\n\n" +
            "Year Released: 2008"
        )
    })
})