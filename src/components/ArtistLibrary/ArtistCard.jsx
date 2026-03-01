import { useState } from 'react';
import { motion } from 'framer-motion';
import './ArtistLibrary.css';

const cardVariants = {
    hidden: { opacity: 0, y: 60, rotate: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
};

export default function ArtistCard({ artist: era, onSelect }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="artist-card"
            variants={cardVariants}
            layoutId={`artist-card-${era.id}`}
            onClick={onSelect}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.97 }}
            style={{ cursor: 'pointer', willChange: 'transform' }}
        >
            {/* ── Ambient glow behind card (leaks through) ── */}
            <motion.div
                className="card-glow"
                animate={{ opacity: isHovered ? 0.35 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: `radial-gradient(circle, ${era.accent}70 0%, transparent 65%)` }}
            />

            {/* ── Polaroid "photo" ─────────────────────────── */}
            <div className="card-photo">
                <motion.div
                    className="card-photo-img"
                    style={{ background: era.gradient }}
                    animate={{ scale: isHovered ? 1.03 : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Era symbol */}
                    <motion.span
                        className="era-symbol-large"
                        animate={{
                            textShadow: isHovered
                                ? `0 0 40px ${era.accent}cc, 0 2px 20px rgba(0,0,0,0.5)`
                                : '0 2px 20px rgba(0,0,0,0.4)',
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {era.eraSymbol || era.name[0]}
                    </motion.span>

                    {/* Shimmer on the photo */}
                    <div className="photo-shimmer" />
                </motion.div>
            </div>

            {/* ── Polaroid Caption ─────────────────────────── */}
            <div className="card-content">
                <motion.h2
                    className="card-name"
                    animate={{ color: isHovered ? era.accent : '#1a1410' }}
                    transition={{ duration: 0.3 }}
                >
                    {era.name}
                </motion.h2>
                <p className="card-genre">{era.genre}</p>

                <div className="card-meta">
                    <span className="card-songs">{era.songs.length} tracks</span>
                    <motion.div
                        className="card-arrow"
                        animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.5 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: era.accent }}
                    >
                        →
                    </motion.div>
                </div>

                {/* Tape-strip song bars */}
                <div className="card-preview">
                    {era.songs.map((song, i) => (
                        <motion.div
                            key={song.id}
                            className="preview-dot"
                            animate={{
                                backgroundColor: isHovered ? era.accent : 'rgba(0,0,0,0.12)',
                                scaleY: isHovered ? 1.6 : 1,
                            }}
                            transition={{ duration: 0.25, delay: i * 0.06 }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
