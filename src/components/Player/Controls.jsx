import { motion } from 'framer-motion';
import './Player.css';

export default function Controls({ isPlaying, onToggle, onNext, onPrev, volume, onVolume, accent }) {
    return (
        <div className="controls-section">
            {/* Volume row */}
            <div className="volume-row">
                <span className="vol-icon">{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={e => onVolume(Number(e.target.value))}
                    className="volume-slider"
                    style={{ '--accent': accent }}
                />
                <span className="vol-pct">{Math.round(volume * 100)}%</span>
            </div>

            {/* Main controls row */}
            <div className="main-controls">
                {/* Shuffle (decorative) */}
                <motion.button
                    className="ctrl-btn icon-btn"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Shuffle"
                >
                    ⇄
                </motion.button>

                {/* Prev */}
                <motion.button
                    className="ctrl-btn icon-btn"
                    onClick={onPrev}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Previous"
                >
                    ⏮
                </motion.button>

                {/* Play / Pause */}
                <motion.button
                    className="ctrl-btn play-pause-btn"
                    onClick={onToggle}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, boxShadow: `0 8px 32px ${accent}50` }}
                >
                    <motion.span
                        key={isPlaying ? 'pause' : 'play'}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.15 }}
                    >
                        {isPlaying ? '⏸' : '▶'}
                    </motion.span>
                </motion.button>

                {/* Next */}
                <motion.button
                    className="ctrl-btn icon-btn"
                    onClick={onNext}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Next"
                >
                    ⏭
                </motion.button>

                {/* Repeat (decorative) */}
                <motion.button
                    className="ctrl-btn icon-btn"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Repeat"
                >
                    ↺
                </motion.button>
            </div>
        </div>
    );
}
