import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "../assets/spotify-logo.png";

const Login = ({ providers }) => {
    const { name: providerName, id: providerId } = providers?.spotify;
    return (
        <div
            className="flex items-center flex-col justify-center bg-slate-800 h-screen w-screen
        "
        >
            <div className="mb-6">
                <Image src={Logo} alt="Logo Spotify" height={200} width={200} />
            </div>
            <button
                className="bg-[#18d860] text-white rounded-full p-5"
                onClick={() => {
                    signIn(providerId, { callbackUrl: "/" });
                }}
            >
                Login with {providerName}
            </button>
        </div>
    );
};

export default Login;

export const getServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
};
