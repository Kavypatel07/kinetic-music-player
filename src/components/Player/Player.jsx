import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';
import Controls from './Controls';
import QueuePanel from './QueuePanel';
import LyricsScreen from '../Lyrics/LyricsScreen';
import './Player.css';

function formatTime(t) {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
}

export default function Player({ song, artist, onBack }) {
    const { playSong, currentSong: ctxSong, currentTime, duration, isPlaying, volume, seek, setVolume, togglePlay, nextTrack, prevTrack, queue } = usePlayer();
    const [showQueue, setShowQueue] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);

    // Derive the song to display: prefer context's currentSong (updated by next/prev)
    const currentSongData = ctxSong || song;

    // Start playing the selected song on mount
    useEffect(() => {
        if (song && artist) {
            playSong(song, artist, artist.songs);
        }
    }, []);


    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="player-screen">
            {/* Background ambient */}
            <div
                className="player-bg-glow"
                style={{ background: `radial-gradient(ellipse at center, ${currentSongData?.albumAccent || artist.accent}25 0%, transparent 65%)` }}
            />

            {/* Header */}
            <motion.div
                className="player-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <button className="back-btn-player" onClick={onBack}>← Back</button>
                <span className="player-header-title">Now Playing</span>
                <button
                    className="queue-toggle-btn"
                    onClick={() => setShowQueue(v => !v)}
                    style={{ color: showQueue ? artist.accent : undefined }}
                >
                    ☰ Queue
                </button>
            </motion.div>

            {/* Main Content */}
            <div className="player-main">
                {/* Album Art - the morphing shared element */}
                <motion.div
                    className="album-art-container"
                    layoutId={`song-${song.id}`}
                    initial={{ borderRadius: 16 }}
                    animate={{ borderRadius: 24 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <motion.div
                        className="album-art"
                        style={{ background: currentSongData?.albumGradient || song.albumGradient }}
                        animate={{ rotate: isPlaying ? [0, 1.5, -1.5, 0] : 0 }}
                        transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
                    >
                        {/* Vinyl grooves */}
                        <div className="album-vinyl-center" />
                        {[80, 100, 120, 140, 160].map((r, i) => (
                            <div key={i} className="album-groove" style={{ width: r, height: r }} />
                        ))}

                        {/* Floating notes */}
                        <AnimatePresence>
                            {isPlaying && [0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    className="floating-note"
                                    initial={{ y: 0, opacity: 1, x: (i - 1) * 30 }}
                                    animate={{ y: -80, opacity: 0, x: (i - 1) * 30 + (Math.random() * 20 - 10) }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, delay: i * 0.7, repeat: Infinity, repeatDelay: 1.5 }}
                                >
                                    {['♪', '♫', '♬'][i]}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Song info + controls */}
                <motion.div
                    className="player-info-area"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Song Info */}
                    <div className="song-info">
                        <h1 className="song-title">{currentSongData?.title || song.title}</h1>
                        <p className="song-artist" style={{ color: artist.accent }}>{artist.name}</p>
                        <p className="song-album">{currentSongData?.album || song.album}</p>
                    </div>

                    {/* Progress */}
                    <div className="progress-section">
                        <input
                            type="range"
                            className="progress-bar"
                            min={0}
                            max={duration || 100}
                            value={currentTime}
                            step={0.1}
                            onChange={e => seek(Number(e.target.value))}
                            style={{
                                '--progress-pct': `${progressPct}%`,
                                '--accent': currentSongData?.albumAccent || artist.accent,
                            }}
                        />
                        <div className="time-labels">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <Controls
                        isPlaying={isPlaying}
                        onToggle={togglePlay}
                        onNext={nextTrack}
                        onPrev={prevTrack}
                        volume={volume}
                        onVolume={setVolume}
                        accent={currentSongData?.albumAccent || artist.accent}
                    />

                    {/* Lyrics button */}
                    <motion.button
                        className="lyrics-btn"
                        onClick={() => setShowLyrics(true)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        style={{ borderColor: `${artist.accent}40`, color: artist.accent }}
                    >
                        ✦ Full-Screen Lyrics
                    </motion.button>
                </motion.div>
            </div>

            {/* Queue Panel */}
            <AnimatePresence>
                {showQueue && (
                    <QueuePanel
                        queue={queue}
                        currentSong={currentSongData}
                        artist={artist}
                        onClose={() => setShowQueue(false)}
                        onSelect={(s) => {
                            playSong(s, artist, artist.songs);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Lyrics Screen */}
            <AnimatePresence>
                {showLyrics && (
                    <LyricsScreen
                        song={currentSongData || song}
                        artist={artist}
                        currentTime={currentTime}
                        onSeek={seek}
                        onClose={() => setShowLyrics(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
