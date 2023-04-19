import { useRecoilState } from "recoil";
import useSpotify from "./useSpotify";
import { currentTrackState } from "@/atoms/playerAtom";
import { useEffect, useState } from "react";

const useSongInfo = () => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackState);
    const [songInfo, setSongInfo] = useState(null);
    // console.log("Track selected: " + currentTrackId);
    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        },
                    },
                ).then((response) => response.json());
                
                setSongInfo(trackInfo);
            }
        };

        // 
        fetchSongInfo();
    }, [currentTrackId, spotifyApi]);
    return songInfo;
};

export default useSongInfo;
