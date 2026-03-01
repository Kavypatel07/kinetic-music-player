import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLyricsSync } from '../../hooks/useLyricsSync';
import { useDominantColor } from '../../hooks/useDominantColor';
import './Lyrics.css';

export default function LyricsScreen({ song, artist, currentTime, onSeek, onClose }) {
    const lyrics = song?.lyrics || [];
    const { activeIndex, containerRef, activeRef } = useLyricsSync(lyrics, currentTime);
    const color = useDominantColor(song?.albumGradient, song?.albumAccent || artist.accent);

    const backgroundStyle = {
        background: `
      radial-gradient(ellipse at 30% 20%, rgba(${color.r}, ${color.g}, ${color.b}, 0.40) 0%, transparent 58%),
      radial-gradient(ellipse at 70% 80%, rgba(${color.r}, ${color.g}, ${color.b}, 0.22) 0%, transparent 52%),
      linear-gradient(180deg, #120a06 0%, #1a1008 100%)
    `,
    };

    return (
        <motion.div
            className="lyrics-screen"
            style={backgroundStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Blur layer */}
            <div
                className="lyrics-blur-overlay"
                style={{ background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)` }}
            />

            {/* Header */}
            <motion.div
                className="lyrics-header"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <div className="lyrics-song-info">
                    <div className="lyrics-mini-art" style={{ background: song.albumGradient }} />
                    <div>
                        <div className="lyrics-song-title">{song.title}</div>
                        <div className="lyrics-song-artist" style={{ color: song.albumAccent || artist.accent }}>
                            {artist.name}
                        </div>
                    </div>
                </div>

                <button className="lyrics-close-btn" onClick={onClose}>
                    <span>↙</span> Close
                </button>
            </motion.div>

            {/* Lyrics scrollable container */}
            <div className="lyrics-container" ref={containerRef}>
                <div className="lyrics-spacer-top" />

                {lyrics.length === 0 ? (
                    <div className="lyrics-unavailable">No lyrics available</div>
                ) : (
                    lyrics.map((line, i) => {
                        const isActive = i === activeIndex;
                        const isPast = i < activeIndex;
                        const isFuture = i > activeIndex;

                        return (
                            <motion.div
                                key={i}
                                ref={isActive ? activeRef : null}
                                className={`lyric-line ${isActive ? 'lyric-active' : ''} ${isPast ? 'lyric-past' : ''} ${isFuture ? 'lyric-future' : ''}`}
                                onClick={() => onSeek(line.time)}
                                animate={{
                                    scale: isActive ? 1 : 0.95,
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                title={`Seek to ${Math.floor(line.time / 60)}:${String(Math.floor(line.time % 60)).padStart(2, '0')}`}
                            >
                                <motion.span
                                    animate={{
                                        color: isActive
                                            ? '#ffffff'
                                            : isPast
                                                ? `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`
                                                : 'rgba(255, 255, 255, 0.25)',
                                        textShadow: isActive
                                            ? `0 0 30px rgba(${color.r}, ${color.g}, ${color.b}, 0.8), 0 0 60px rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`
                                            : 'none',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {line.text}
                                </motion.span>

                                {/* Active indicator dot */}
                                {isActive && (
                                    <motion.div
                                        className="active-dot"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        style={{ background: song.albumAccent || artist.accent }}
                                    />
                                )}
                            </motion.div>
                        );
                    })
                )}

                <div className="lyrics-spacer-bottom" />
            </div>

            {/* Seek hint */}
            <motion.div
                className="lyrics-seek-hint"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                ✦ Tap any line to jump to that moment
            </motion.div>

            {/* Progress bar at bottom */}
            <div className="lyrics-progress-bar">
                <motion.div
                    className="lyrics-progress-fill"
                    style={{
                        background: `linear-gradient(90deg, ${song.albumAccent || artist.accent}, ${song.albumAccent || artist.accent}80)`,
                        width: `100%`,
                        scaleX: currentTime / (song.duration || 1),
                        transformOrigin: 'left',
                    }}
                />
            </div>
        </motion.div>
    );
}
