import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentArtist, setCurrentArtist] = useState(null);
    const [queue, setQueue] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(0.8);

    const nextTrackRef = useRef(null);

    useEffect(() => {
        const audio = new Audio();
        audio.volume = 0.8;
        audioRef.current = audio;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onDurationChange = () => setDuration(audio.duration || 0);
        const onEnded = () => { if (nextTrackRef.current) nextTrackRef.current(); };
        const onError = (e) => {
            console.warn('[Player] Audio load error:', e.type, audio.src);
            setIsPlaying(false);
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('durationchange', onDurationChange);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('error', onError);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('durationchange', onDurationChange);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('error', onError);
            audio.pause();
        };
    }, []);

    useEffect(() => {
        if (!currentSong || !audioRef.current) return;
        audioRef.current.src = currentSong.audioSrc;
        audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play().catch(() => { });
        }
    }, [currentSong]);

    const playSong = useCallback((song, artist, songList) => {
        setCurrentSong(song);
        setCurrentArtist(artist);
        setQueue(songList || [song]);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.src = song.audioSrc;
            audioRef.current.load();
            audioRef.current.play().catch(() => { });
        }
    }, []);

    const togglePlay = useCallback(() => {
        if (!audioRef.current || !currentSong) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    }, [isPlaying, currentSong]);

    const seek = useCallback((time) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }, []);

    const setVolume = useCallback((val) => {
        if (!audioRef.current) return;
        audioRef.current.volume = val;
        setVolumeState(val);
    }, []);

    const nextTrack = useCallback(() => {
        if (!currentSong || !queue.length) return;
        const idx = queue.findIndex(s => s.id === currentSong.id);
        const next = queue[(idx + 1) % queue.length];
        playSong(next, currentArtist, queue);
    }, [currentSong, queue, currentArtist, playSong]);

    const prevTrack = useCallback(() => {
        if (!currentSong || !queue.length) return;
        if (currentTime > 3) {
            seek(0);
            return;
        }
        const idx = queue.findIndex(s => s.id === currentSong.id);
        const prev = queue[(idx - 1 + queue.length) % queue.length];
        playSong(prev, currentArtist, queue);
    }, [currentSong, queue, currentArtist, playSong, currentTime, seek]);

    // Keep nextTrackRef in sync so onEnded closure is never stale
    useEffect(() => { nextTrackRef.current = nextTrack; }, [nextTrack]);

    return (
        <PlayerContext.Provider value={{
            currentSong, currentArtist, queue, isPlaying,
            currentTime, duration, volume,
            playSong, togglePlay, seek, setVolume, nextTrack, prevTrack,
        }}>
            {children}
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);
