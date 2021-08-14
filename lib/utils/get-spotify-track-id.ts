export default function getSpotifyTrackId(spotifyLink: string) : string {
    if (
        !spotifyLink.includes('spotify:track:') &&
        !spotifyLink.includes('https://open.spotify.com/track/')
    ) {
        return '';
    }

    return spotifyLink
        .replace('spotify:track:', '')
        .replace('https://open.spotify.com/track/', '')
        .substring(0, 22);
}
