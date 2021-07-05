import { getNotesInKey, assignKeyToProgression, fullBarProg, halfBarProg, renderSpacing } from "../../lib/utils/progression-generator-functions"

describe("Progression Generator functions", () => {


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
            expect(assignKeyToProgression(9, "1b745")).toEqual(["A", "G", "D", "E"])
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

    describe("fullBarProg", () => {
        it("should return formatted string with bar lines, with maximum 4 bars per line", () => {
            expect(fullBarProg(0, "4536", 12))
                .toBe("| [F]            | [G]            | [Em]           | [Am]           |")
            expect(fullBarProg(1, "4536", 12))
                .toBe("| [Gb]           | [Ab]           | [Fm]           | [Bbm]          |")
            expect(fullBarProg(7, "7", 12))
                .toBe("| [F#dim7]       |")
            expect(fullBarProg(9, "15654325", 10))
                .toBe("| [A]          | [E]          | [F#m]        | [E]          |\n" +
                      "| [D]          | [C#m]        | [Bm7]        | [E]          |"
                )
            expect(fullBarProg(9, "4536251", 10))
                .toBe("| [D]          | [E]          | [C#m]        | [F#m]        |\n" +
                      "| [Bm7]        | [E]          | [A]          |"
                )
            expect(fullBarProg(11, "23M4m", 12))
                .toBe("| [C#m7]         | [D#]           | [Em]           |")
        })

        it("should read prefix and suffix and return formatted string with bar lines, with maximum 4 bars per line", () => {
            expect(fullBarProg(0, "4M5M3m6m", 8))
                .toBe("| [F]        | [G]        | [Em]       | [Am]       |")
            expect(fullBarProg(1, "4m5m3M6M", 12))
                .toBe("| [Gbm]          | [Abm]          | [F]            | [Bb]           |")
            expect(fullBarProg(6, "62M51", 12))
                .toBe("| [Ebm]          | [Ab]           | [Db]           | [Gb]           |")
            expect(fullBarProg(9, "1b745", 10))
                .toBe("| [A]          | [G]          | [D]          | [E]          |")
            expect(fullBarProg(9, "1m2M3M4m5m6M7m", 10))
                .toBe("| [Am]         | [B]          | [C#]         | [Dm]         |\n" +
                               "| [Em]         | [F#]         | [G#dim7]     |"
                )

        })

        it("should return empty string if invalid input is provided", () => {
            expect(fullBarProg(-1, "4536", 8)).toBe("")
            expect(fullBarProg(13, "4536", 8)).toBe("")
            expect(fullBarProg(6, "4536", -1)).toBe("")
            expect(fullBarProg(6, "4536", -1)).toBe("")
            expect(fullBarProg(6, "", 10)).toBe("")
            // expect(fullBarProg(6, undefined, 10)).toBe("")
            // expect(fullBarProg(-1, undefined, -1)).toBe("")
        })

    })

    describe("halfBarProg", () => {
        it("should return formatted string with bar lines, with maximum 4 bars per line", () => {
            expect(halfBarProg(0, "4536", 12))
                .toBe("| [F]      [G]      | [Em]     [Am]     |")
            expect(halfBarProg(2, "45362511", 12))
                .toBe("| [G]      [A]      | [F#m]    [Bm]     |\n" +
                               "| [Em7]    [A]      | [D]      [D]      |"
            )
            expect(halfBarProg(3, "2", 12))
                .toBe("| [Fm7]             |")
            expect(halfBarProg(11, "23M4m", 14))
                .toBe("| [C#m7]    [D#]      | [Em]                |")
            expect(halfBarProg(4, "251", 14))
                .toBe("| [F#m7]    [B]       | [E]                 |")
            expect(halfBarProg(0, "15451", 14))
                .toBe(  "| [C]       [G]       | [F]       [G]       |\n" +
                        "| [C]                 |"
                )
            expect(halfBarProg(7, "64151", 14))
                .toBe(  "| [Em]      [C]       | [G]       [D]       |\n" +
                        "| [G]                 |"
                )
            expect(halfBarProg(9, "4536251", 14))
                .toBe(  "| [D]       [E]       | [C#m]     [F#m]     |\n" +
                        "| [Bm7]     [E]       | [A]                 |"
                )

            expect(halfBarProg(10, "453625114", 14))
                .toBe("| [Eb]      [F]       | [Dm]      [Gm]      |\n" +
                               "| [Cm7]     [F]       | [Bb]      [Bb]      |\n" +
                               "| [Eb]                |"
                )
        })

        it("should read prefix and suffix and return formatted string with bar lines, with maximum 4 bars per line", () => {
            expect(halfBarProg(10, "4m5m3M6M2M5174", 14))
                .toBe("| [Ebm]     [Fm]      | [D]       [G]       |\n" +
                               "| [C]       [F]       | [Bb]      [Adim7]   |\n" +
                               "| [Eb]                |"
                )

        })
        it("should return empty string if invalid input is provided", () => {
            expect(halfBarProg(-1, "4536", 8)).toBe("")
            expect(halfBarProg(13, "4536", 8)).toBe("")
            expect(halfBarProg(6, "4536", -1)).toBe("")
            expect(halfBarProg(6, "4536", -1)).toBe("")
            expect(halfBarProg(6, "", 10)).toBe("")
            // expect(halfBarProg(6, undefined, 10)).toBe("")
            // expect(halfBarProg(-1, undefined, -1)).toBe("")
        })

        it("should round up to next number of spacing if odd is provided", () => {
            expect(halfBarProg(0, "4536", 11))
                .toBe("| [F]      [G]      | [Em]     [Am]     |")
            expect(halfBarProg(2, "45362511", 11))
                .toBe("| [G]      [A]      | [F#m]    [Bm]     |\n" +
                    "| [Em7]    [A]      | [D]      [D]      |"
                )
            expect(halfBarProg(3, "2", 11))
                .toBe("| [Fm7]             |")
            expect(halfBarProg(11, "23M4m", 13))
                .toBe("| [C#m7]    [D#]      | [Em]                |")
            expect(halfBarProg(4, "251", 13))
                .toBe("| [F#m7]    [B]       | [E]                 |")
            expect(halfBarProg(0, "15451", 13))
                .toBe(  "| [C]       [G]       | [F]       [G]       |\n" +
                    "| [C]                 |"
                )
        })
    })


})

