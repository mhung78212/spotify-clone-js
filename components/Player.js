/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { currentTrackState, isPlayingState } from "@/atoms/playerAtom";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import {
    FastForwardIcon,
    HeartIcon,
    PauseIcon,
    PlayIcon,
    RewindIcon,
    VolumeOffIcon,
    VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Player = () => {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    // The id of the song being played
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();
    console.log({ songInfo });

    const fetchCurrentTrack = () => {
        // Check for song info
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Data: ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentTrack();
            setVolume(50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrackState, spotifyApi, session]);

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };
    // Change the volume
    const handleVolumeChange = (e) => {
        setVolume(Number(e.target.value));
    };
    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume);
        }, 500),
        [],
    );
    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    // const handleSkipSong = async (skipTo) => {
    //     console.log(skipTo);
    //     if (skipTo === "prev") await spotifyApi.skipToPrevious();
    //     else await spotifyApi.skipToNext();

    // //    songInfo = await spotifyApi.getMyCurrentPlayingTrack()

    // };

    return (
        <div className="h-[5.6rem] bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <>
                {/* Left */}
                <div className="flex items-center space-x-4">
                    <img
                        className="h-14 w-14 object-cover"
                        src={songInfo?.album.images?.[0]?.url}
                        alt=""
                    />
                    <div>
                        <h3>{songInfo?.name}</h3>
                        <p className="text-gray-300 text-xs after-span ">
                            {songInfo?.artists.map((artist) => (
                                <span
                                    className="hover:underline hover:text-white cursor-pointer"
                                    key={artist.name}
                                >
                                    {artist.name}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div>
                        {/* <HeartIcon className="h-5 w-5 cursor-pointer" /> */}
                    </div>
                </div>
                {/* Center */}
                <div className="flex justify-evenly items-center">
                    <RewindIcon
                        className="w-10 h-10 cursor-pointer"
                        // onClick={() => handleSkipSong("prev")}
                    />
                    {isPlaying ? (
                        <PauseIcon
                            className="w-10 h-10 cursor-pointer"
                            onClick={handlePlayPause}
                        />
                    ) : (
                        <PlayIcon
                            className="w-10 h-10 cursor-pointer"
                            onClick={handlePlayPause}
                        />
                    )}
                    <FastForwardIcon
                        className="w-10 h-10 cursor-pointer"
                        // onClick={() => handleSkipSong("next")}
                    />
                </div>
                {/* Right */}
                <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
                    <VolumeUpIcon className="w-10 h-10" />
                    <input
                        className="rounded-lg overflow-hidden appearance-none bg-gray-500 h-3 w-128 "
                        type="range"
                        min={0}
                        max={100}
                        onChange={handleVolumeChange}
                        step={5}
                    />
                </div>
            </>
        </div>
    );
};

export default Player;
