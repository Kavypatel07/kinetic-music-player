import { motion } from 'framer-motion';
import './ArtistWall.css';

export default function SongPoster({ song, artist, position, isHovered, isDimmed, onClick, onHoverStart, onHoverEnd }) {
    return (
        <motion.div
            className="song-poster"
            layoutId={`song-${song.id}`}
            style={{
                left: position.x,
                top: position.y,
                rotate: position.angle * (180 / Math.PI),
                zIndex: isHovered ? 50 : 10,
            }}
            animate={{
                scale: isHovered ? 1.12 : 1,
                filter: isDimmed
                    ? 'brightness(0.35) blur(1px)'
                    : isHovered
                        ? 'brightness(1.15)'
                        : 'brightness(0.9)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
        >
            {/* Album art (gradient-based) */}
            <div
                className="poster-art"
                style={{ background: song.albumGradient }}
            >
                {/* Vinyl record decoration */}
                <motion.div
                    className="poster-vinyl"
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 4, ease: 'linear', repeat: isHovered ? Infinity : 0 }}
                >
                    <div className="vinyl-inner" />
                </motion.div>

                {/* Play overlay on hover */}
                <motion.div
                    className="poster-play-overlay"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ background: `${song.albumAccent}30` }}
                >
                    <motion.div
                        className="play-btn-circle"
                        animate={{ scale: isHovered ? 1 : 0.6 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        style={{ borderColor: song.albumAccent }}
                    >
                        ▶
                    </motion.div>
                </motion.div>

                {/* Shimmer on hover */}
                <motion.div
                    className="poster-shimmer"
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? '100%' : '-100%' }}
                    transition={{ duration: 0.6 }}
                />
            </div>

            {/* Song info */}
            <div className="poster-info" style={{ borderTop: `2px solid ${song.albumAccent}40` }}>
                <p className="poster-title">{song.title}</p>
                <p className="poster-album">{song.album}</p>
                <div className="poster-duration" style={{ color: song.albumAccent }}>
                    {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
                </div>
            </div>
        </motion.div>
    );
}
