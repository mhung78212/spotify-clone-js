import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import Head from 'next/head'


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
            {/* <div></div> */}
        </div>
  )
}
