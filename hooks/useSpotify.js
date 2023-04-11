import { spotifyApi } from "@/config/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export const useSpotify = () => {
    const { data: session } = useSession();
    useEffect(() => {
        if (!session) return;
        if (session) {
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);
    return spotifyApi;
};
