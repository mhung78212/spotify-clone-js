import Dashboard from "@/components/Dashboard";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
    return (
        <div className=" h-screen overflow-hidden">
            <Head>
                <title>Spotify 2.0</title>
                <meta name="description" content="Spotify" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex">
                <Sidebar />
                <Dashboard />
            </main>
            <div className="sticky bottom-0 text-white">
                <Player />
            </div>
        </div>
    );
}
export const getServerSideProps = async () => {
    const session = await getSession();
    return {
        props: {
            session,
        },
    };
};
