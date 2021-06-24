import { createChordsInKey, assignChordsToProg, fullBarProg, halfBarProg, renderSpacing } from "../../lib/utils/progression-generator-functions"

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
        let chord = 'G#m'
        expect(renderSpacing(-1, chord)).toBe("")
        expect(renderSpacing(0, chord)).toBe("")

    })
})