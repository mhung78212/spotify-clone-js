import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusIcon,
    HeartIcon,
} from "@heroicons/react/solid";
import MenuButton from "./MenuButton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "@/atoms/playerAtom";

const Sidebar = () => {
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();
    const [playLists, setPlaylists] = useState([]);
    const [playListId, setPlayListId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);
    // console.log(playListId);
    return (
        <div className="h-screen overflow-y-scroll scrollbar-hidden text-gray-500 bg-black max-w-[18rem] p-5 text-xs lg:text-sm border-r border-gray-900 mb-[5.6rem]">
            <div className="space-y-4">
                <MenuButton icon={HomeIcon} label="Home" />
                <MenuButton icon={SearchIcon} label="Search" />
                <MenuButton icon={LibraryIcon} label="Library" />

                <hr className="border-t-[1px]  border-gray-400" />
                <MenuButton icon={PlusIcon} label="Create Playlist" />
                <MenuButton icon={HeartIcon} label="Liked Songs" />

                <hr className="border-t-[1px] border-gray-400" />

                {playLists.map((playlist) => (
                    <p
                        key={playlist.id}
                        className="cursor-pointer hover:text-white"
                        onClick={() => setPlayListId(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
