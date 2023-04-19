/* eslint-disable @next/next/no-img-element */
import { playlistIdState, selectedPlaylistState } from "@/atoms/playerAtom";
import useSpotify from "@/hooks/useSpotify";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-red-500",
    "from-green-500",
    "from-pink-500",
    "from-purple-500",
    "from-yellow-500",
];

const Dashboard = () => {
    const [color, setColor] = useState(null);

    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [playListId, setPlayListId] = useRecoilState(playlistIdState);
    const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(
        selectedPlaylistState,
    );

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playListId]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playListId)
            .then((data) => {
                setSelectedPlaylist(data.body);
            })
            .catch((err) => console.log("Error get playlist", err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spotifyApi, playListId]);
    // console.log("Playlist", selectedPlaylist);

    return (
        <div className="flex-1 relative bg-black h-screen overflow-y-scroll scrollbar-hidden">
            <section className="absolute top-5 right-3">
                <div
                    className="flex items-center space-x-2 cursor-pointer bg-slate-800 p-2 rounded-full relative is-menu"
                    onClick={() => signOut()}
                >
                    <img
                        src={session?.user?.image || UserIcon}
                        alt="Avatar"
                        className="rounded-full object-cover"
                        width="30"
                        height="30"
                    />
                    <h2 className="text-white font-bold">
                        {session?.user.name}
                    </h2>
                    <ChevronDownIcon className="h-5 w-5 text-white" />
                </div>
            </section>
            <section
                className={`flex items-end p-4 space-x-3 bg-gradient-to-b to-black ${color} h-80 text-white w-full`}
            >
                {selectedPlaylist && (
                    <>
                        <img
                            src={selectedPlaylist.images[0]?.url || ''}
                            alt="Playlist Image"
                            className="shadow-2xl h-40 w-40 border"
                        />
                        <div>
                            <p>PLAYLIST</p>
                            <h1 className="text-2xl font-bold md:text-3xl xl:text-4xl">
                                {selectedPlaylist?.name}
                            </h1>
                        </div>
                    </>
                )}
            </section>
            <div className="">
                <Songs />
            </div>
        </div>
    );
};

export default Dashboard;
