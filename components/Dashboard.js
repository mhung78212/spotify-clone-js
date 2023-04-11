import { ChevronDownIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const colors = [
    "indigo-500",
    "blue-500",
    "red-500",
    "green-500",
    "pink-500",
    "purple-500",
    "yellow-500",
];

const Dashboard = () => {
    const { data: session } = useSession();

    const [color, setColor] = useState(null);
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, []);
    return (
        <div className="flex-1 relative">
            <section className="absolute top-5 right-3">
                <div className="flex items-center space-x-2 cursor-pointer bg-slate-800 py-2 px-4 rounded-full">
                    <Image
                        src={session?.user.image}
                        alt="Avatar"
                        className="rounded-full"
                        width="40"
                        height="40"
                    />
                    <h2 className="text-white">{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5 text-white" />
                </div>
            </section>
            <section
                className={`flex items-center space-x-7 bg-gradient-to-b to-black from-${color} h-80 text-white w-full`}
            ></section>
        </div>
    );
};

export default Dashboard;
