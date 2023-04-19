/* eslint-disable @next/next/no-img-element */
import useSpotify from "@/hooks/useSpotify";
import React from "react";
import { msToTime, timeDifference } from "./time";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "@/atoms/playerAtom";

const Song = ({ track, order }) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    
    const handlePlaySong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        });
    };
    return (
        <>
            <tr
                className="cursor-pointer hover:bg-slate-600"
                onClick={handlePlaySong}
            >
                <td className="w-12 text-center">
                    <p>{order + 1}</p>
                </td>
                <td className="pt-4">
                    <div className="flex space-x-4">
                        <div className="h-10 w-10">
                            <img
                                src={track.track.album.images[0].url}
                                className="object-cover"
                                alt=""
                            />
                        </div>
                        <div>
                            <p>{track.track.name}</p>
                            <p className="text-gray-300 text-sm after-span">
                                {track.track.artists.map((artist) => (
                                    <span key={artist.name}>{artist.name}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                </td>
                <td>{track.track.album.name}</td>
                <td className="text-center">
                    {timeDifference(track.added_at)}
                </td>
                <td className="text-center">
                    {msToTime(track.track.duration_ms)}
                </td>
            </tr>
        </>
    );
};

export default Song;
