export default interface Song {
    title: string,
    artistId: number,
    acousticness: number,
    bpm: number,
    createdAt: Date,
    updatedAt: Date,
    danceability: number,
    dateReleased: Date,
    durationMs: number,
    energy: number,
    id: number,
    initialism: string,
    instrumentalness: number,
    key: string,
    language: string,
    mode: number,
    mood: any,
    genre: any,
    myKey: string,
    performStatus: string,
    romTitle: string,
    spotifyLink: string,
    status: string,
    timeSignature: string,
    valence: number,
    verified: boolean,
    youtubeLink: string
    artist: {
        name: string,
        romName: string,
        enName: string
    }

}