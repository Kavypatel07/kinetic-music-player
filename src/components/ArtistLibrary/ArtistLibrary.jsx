import { motion } from 'framer-motion';
import { LIBRARY } from '../../data/library';
import ArtistCard from './ArtistCard';
import './ArtistLibrary.css';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
};

export default function ArtistLibrary({ onSelectArtist }) {
    return (
        <div className="artist-library">
            {/* ── Page Header ─────────────────────────────── */}
            <motion.div
                className="library-header"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
                <p className="header-byline">✦ An Intimate Listening Experience ✦</p>
                <h1 className="library-title">Lana Del Rey</h1>
                <p className="library-subtitle">
                    Choose an era and step into her world
                </p>
                <div className="header-divider" />
            </motion.div>

            {/* ── Era Cards ───────────────────────────────── */}
            <motion.div
                className="cards-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {LIBRARY.map((era) => (
                    <ArtistCard
                        key={era.id}
                        artist={era}
                        onSelect={() => onSelectArtist(era)}
                    />
                ))}
            </motion.div>

            {/* ── Footer Hint ─────────────────────────────── */}
            <motion.p
                className="library-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
            >
                ↑ click any era to enter ↑
            </motion.p>
        </div>
    );
}
