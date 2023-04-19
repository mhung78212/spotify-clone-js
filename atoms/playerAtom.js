import { atom } from "recoil";

export const playlistIdState = atom({
    key: "playlistIdState",
    default: "",
});
export const selectedPlaylistState = atom({
    key: "selectedPlaylistState",
    default: "",
});
export const currentTrackState = atom({
    key: "currentTrackState",
    default: null,
});
export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
});
