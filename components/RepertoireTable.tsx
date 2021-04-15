import React from "react";
import {convertDurationToMinSec} from "../lib/library";

export default function RepertoireTable({songList} : any) {

    return (
        <div style={{ "overflow-y": "scroll", height: "80rem"}}>
        <table className="table">
            <thead>


            <tr>
                <th>
                    <div className="cell">
                        ID
                    </div>
                </th>
                <th>
                    <div className="cell">
                        Title
                    </div>
                </th>
                <th>
                    <div className="cell">Artist</div>
                </th>
                <th>
                    <div className="cell">Key</div>
                </th>
                <th>
                    <div className="cell">Duration</div>
                </th>
                <th>
                    <div className="cell">Time Signature</div>
                </th>
                <th>
                    <div className="cell">Language</div>
                </th>
                <th>
                    <div className="cell">Spotify Link</div>
                </th>
                <th>
                    <div className="cell">Test</div>
                </th>
            </tr>

            </thead>




            <tbody>
            {
                songList.map((song : any) => (
                    <tr>
                        <td>
                            <div className="cell">{song.id}</div>
                        </td>
                        <td>
                            <div className="cell">{song.romTitle?.split(' ').slice(0,2).join(' ')} {song.title}</div>
                        </td>
                        <td>
                            <div className="cell">{song.artist.enName}</div>
                        </td>
                        <td>
                            <div className="cell">{song.key}</div>
                        </td>
                        <td>
                            <div className="cell">{convertDurationToMinSec(song.durationMs)}</div>
                        </td>
                        <td>
                            <div className="cell">{song.timeSignature}</div>
                        </td>
                        <td>
                            <div className="cell">{song.language}</div>
                        </td>
                        <td>
                            <div className="cell">
                                <a href={song.spotifyLink}>Link</a>
                            </div>
                        </td>
                        <td><input /></td>
                    </tr>
                ))
            }
            </tbody>


        </table>
        </div>
    )
}