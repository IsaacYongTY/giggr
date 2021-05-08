export interface Artist {
        [key : string] : any,
        name: string,
        romName: string,
        enName: string


}

export default interface Song {
        [key: string] : any,
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
        languageId: number,
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
        youtubeLink: string,
        artist: Artist

        // enName: string,

}

