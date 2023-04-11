import { scopes, spotifyApi } from "@/config/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const refreshAccessToken = async (token) => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedTokens } = await spotifyApi.refreshAccessToken();
        console.log("RefreshingAccessToken:", refreshedTokens);

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        };
    } catch (error) {
        console.log("Error", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
};
const jwtCallback = ({ token, user, account }) => {
    let extendedToken;
    // Inital login
    if (account && user) {
        extendedToken = {
            ...token,
            user,
            accessToken: account.access_token,
            accessTokenExpires: Date.now() + account.expires_in * 1000, // convert to milliseconds
            refreshToken: account.refresh_token,
        };
        return extendedToken;
    }

    // Return previous token if the access token has not expired yet
    if (Date.now() < token.accessTokenExpires) {
        console.log("Expired access token");
        return token;
    }
    // Access token has expired, try to update it
    console.log("Refreshing access token");
    return refreshAccessToken(token);
};
const sessionCallback = async ({ session, token }) => {
    session.refreshToken = token.refreshToken;
    session.accessToken = token.accessToken;
    session.error = token.error;

    return session;
};

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: {
                url: "https://accounts.spotify.com/authorize",
                params: { scope: scopes },
            },
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt: jwtCallback,
        session: sessionCallback,
    },
};

export default NextAuth(authOptions);
