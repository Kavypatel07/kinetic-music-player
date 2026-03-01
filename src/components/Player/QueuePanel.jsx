import { motion } from 'framer-motion';
import './Player.css';

function formatTime(t) {
    if (!t || isNaN(t)) return '0:00';
    return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
}

export default function QueuePanel({ queue, currentSong, artist, onClose, onSelect }) {
    return (
        <motion.div
            className="queue-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
            <div className="queue-header">
                <h3 className="queue-title">Queue</h3>
                <button className="queue-close" onClick={onClose}>✕</button>
            </div>
            <div className="queue-artist-label" style={{ color: artist.accent }}>
                {artist.name}
            </div>

            <div className="queue-list">
                {queue.map((song, i) => {
                    const isActive = song.id === currentSong?.id;
                    return (
                        <motion.div
                            key={song.id}
                            className={`queue-item ${isActive ? 'queue-item-active' : ''}`}
                            onClick={() => onSelect(song)}
                            whileHover={{ x: 6 }}
                            transition={{ duration: 0.2 }}
                            style={isActive ? { borderLeft: `3px solid ${artist.accent}` } : {}}
                        >
                            <div className="queue-num" style={{ color: isActive ? artist.accent : undefined }}>
                                {isActive ? '▶' : i + 1}
                            </div>
                            <div className="queue-item-info">
                                <div className="queue-item-title">{song.title}</div>
                                <div className="queue-item-album">{song.album}</div>
                            </div>
                            <div className="queue-item-dur">{formatTime(song.duration)}</div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
