import { selectedPlaylistState } from "@/atoms/playerAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs() {
    const selectedPlaylist = useRecoilValue(selectedPlaylistState);
    console.log("Playlist", selectedPlaylist.tracks);

    return (
        <div className="text-white p-6">
            {selectedPlaylist ? (
                <table className="w-[95%] m-auto">
                    <thead>
                        <tr className="h-12 border-b-2 text-center">
                            <th className="w-12">#</th>
                            <th className="w-[40%] text-left">Name</th>
                            <th className="w-[30%] text-left">Album</th>
                            <th>Added At</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedPlaylist?.tracks?.items.map((track, index) => (
                            <Song
                                key={track.track.id}
                                track={track}
                                order={index}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Songs;
