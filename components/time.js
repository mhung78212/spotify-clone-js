export const timeDifference = (pastTime) => {
    const currentTime = new Date();
    const past = new Date(pastTime);
    const difference = currentTime.getTime() - past.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return `${days} ngày trước`;
};

export const msToTime = (duration) => {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
};
