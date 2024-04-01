import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

import { getAudioFeatures, TrackData } from '../utilities/api/spotify/utils';

export async function getDataFromSpotify(trackId: string) {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    });

    const code = await spotifyApi.clientCredentialsGrant();
    await spotifyApi.setAccessToken(code.body.access_token);

    const data = await spotifyApi.getAudioFeaturesForTrack(trackId);
    const trackInfo = await spotifyApi.getTrack(trackId);

    return { audioFeatures: data.body, singleTrack: trackInfo.body };
}

type ResponseData = {
    result?: TrackData;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    try {
        const { trackId } = req.query as { [key: string]: string };

        if (!trackId) {
            return res.status(400).json({ error: 'No track id provided' });
        }

        const { audioFeatures, singleTrack } =
            await getDataFromSpotify(trackId);
        const trackInfo = await getAudioFeatures(audioFeatures, singleTrack);

        res.status(200).json({ result: trackInfo });
    } catch (err) {
        res.status(400).json({ error: err });
    }
}
