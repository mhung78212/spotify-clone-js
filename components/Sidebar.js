import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusIcon,
    HeartIcon,
} from "@heroicons/react/solid";
import MenuButton from "./MenuButton";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
    const { data: session } = useSession();
    console.log(session);
    return (
        <div className="h-screen overflow-y-scroll scrollbar-hidden text-gray-500 bg-black max-w-[18rem] p-5 text-xs lg:text-sm border-r border-gray-900">
            <div className="space-y-4">
                {session?.user && (
                    <button onClick={() => signOut()}>
                        {session.user.name} - Log out
                    </button>
                )}
                <MenuButton icon={HomeIcon} label="Home" />
                <MenuButton icon={SearchIcon} label="Search" />
                <MenuButton icon={LibraryIcon} label="Library" />

                <hr className="border-t-[1px]  border-gray-400" />
                <MenuButton icon={PlusIcon} label="Create Playlist" />
                <MenuButton icon={HeartIcon} label="Liked Songs" />

                <hr className="border-t-[1px] border-gray-400" />

                {/* Plays list item */}
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
                <p className="cursor-pointer hover:text-white">Playlist 1</p>
            </div>
        </div>
    );
};

export default Sidebar;
