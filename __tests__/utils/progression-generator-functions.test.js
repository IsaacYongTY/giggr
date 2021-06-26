import { getNotesInKey, assignKeyToProgression, fullBarProg, halfBarProg, renderSpacing } from "../../lib/utils/progression-generator-functions"

describe("renderSpacing function" ,() => {
    it("should render string of spaces or input characters", () => {
        expect(renderSpacing(12, "A", "k")).toBe("kkkkkkkkkkkk")
        expect(renderSpacing(12, "F#m", "s")).toBe("ssssssssss")
        expect(renderSpacing(12, "Gm", " ")).toBe("           ")
    })

    it("should render string of spaces if no spacing character is provided", () => {
        expect(renderSpacing(12, "A")).toBe("            ")
        expect(renderSpacing(10, "F#m")).toBe("        ")
        expect(renderSpacing(12, "Gm")).toBe("           ")
        expect(renderSpacing(8, "Gm")).toBe("       ")
        expect(renderSpacing(6, "G#m")).toBe("    ")
    })

    it("should return empty string if input is invalid", () => {
        expect(renderSpacing(-1, "G#m")).toBe("")
        expect(renderSpacing(0, "Bm")).toBe("")

    })
})

describe("getNotesInKey", () => {
    it("should generate family chords according to key id", () => {
        expect(getNotesInKey(0)).toEqual(["C", "D", "E", "F", "G", "A", "B"])
        expect(getNotesInKey(3)).toEqual(["Eb", "F", "G", "Ab", "Bb", "C", "D"])
        expect(getNotesInKey(11)).toEqual(["B", "C#", "D#", "E", "F#", "G#", "A#"])
        expect(getNotesInKey(6)).toEqual(["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"])
    })

    it("should return an empty array if input is invalid", () => {
        expect(getNotesInKey(-1)).toEqual([])
        expect(getNotesInKey(13)).toEqual([])
    })
})

describe("assignKeyToProgression", () => {
    it("should assign the notes in key to family chords", () => {
        expect(assignKeyToProgression(0, "4536")).toEqual(["F", "G", "Em", "Am"])
        expect(assignKeyToProgression(3, "2511")).toEqual(["Fm7", "Bb", "Eb", "Eb"])
        expect(assignKeyToProgression(3, "13M44m")).toEqual(["Eb", "G", "Ab", "Abm"])
        expect(assignKeyToProgression(11, "1234567" )).toEqual(["B", "C#m7", "D#m", "E", "F#", "G#m", "A#dim7"])
        expect(assignKeyToProgression(5, "556M4m332")).toEqual(["C", "C", "D", "Bbm", "Am", "Am", "Gm7"])
    })

    it("should still output the correct family chords if the minor and major match the defaults", () => {
        expect(assignKeyToProgression(0, "4M5M3m6m")).toEqual(["F", "G", "Em", "Am"])
        expect(assignKeyToProgression(0, "1Mb74M5M")).toEqual(["C", "Bb", "F", "G"])
        expect(assignKeyToProgression(0, "1M2m3m4M5M6m7dim7"))
            .toEqual(["C", "Dm", "Em", "F", "G", "Am", "Bdim7"])
    })

    it("should return empty array if input is invalid", () => {
        expect(assignKeyToProgression(-1, "4536")).toEqual([])
        expect(assignKeyToProgression(15, "2233")).toEqual([])
        expect(assignKeyToProgression(5, "abc")).toEqual([])
        expect(assignKeyToProgression(5, "Mmmb#")).toEqual([])
        expect(assignKeyToProgression(5, "88756")).toEqual([])

        expect(assignKeyToProgression(7, "")).toEqual([])
    })
})