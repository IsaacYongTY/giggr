import { getSpotifyTrackId } from "../lib/library";

describe("getSpotifyTrackId", () => {
    it("should return the ID if link is passed", () => {
        expect(getSpotifyTrackId("https://open.spotify.com/track/0eDCVsJKGbQphGjRYa03vE?si=a9629713e16241db")).toBe("0eDCVsJKGbQphGjRYa03vE")
        expect(getSpotifyTrackId("https://open.spotify.com/track/66cBlqEs1viJJCE74CDfGB")).toBe("66cBlqEs1viJJCE74CDfGB")

    })

    it("should return undefined if invalid value is passed in", () => {
        expect(getSpotifyTrackId('')).toBe("")
        expect(getSpotifyTrackId('123456')).toBe("")
        expect(getSpotifyTrackId("66cBlqEs1viJJCE74CDfGB")).toBe("")
    })
})