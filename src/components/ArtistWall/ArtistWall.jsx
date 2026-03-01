import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePhysicsEngine } from '../../hooks/usePhysicsEngine';
import SongPoster from './SongPoster';
import './ArtistWall.css';

export default function ArtistWall({ artist, onSelectSong, onBack }) {
    const containerRef = useRef(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [clickedId, setClickedId] = useState(null);

    const { bodyPositions, freeze, setMousePos } = usePhysicsEngine(
        artist?.songs || [],
        containerRef
    );

    const handleMouseMove = useCallback((e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos(e.clientX - rect.left, e.clientY - rect.top);
    }, [setMousePos]);

    const handleSongClick = useCallback((song) => {
        if (clickedId) return;
        setClickedId(song.id);
        freeze();
        setTimeout(() => onSelectSong(song), 100);
    }, [clickedId, freeze, onSelectSong]);

    if (!artist) return null;

    return (
        <div className="artist-wall" ref={containerRef} onMouseMove={handleMouseMove}>
            {/* Header */}
            <motion.div
                className="wall-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button className="back-btn" onClick={onBack}>
                    <span>←</span> Eras
                </button>
                <div className="wall-title-group">
                    <h2 className="wall-artist-name" style={{ color: artist.accent }}>
                        {artist.name}
                    </h2>
                    <span className="wall-genre">{artist.genre}</span>
                </div>
                <div className="wall-hint">move mouse · click to play</div>
            </motion.div>

            {/* Physics Posters */}
            <div className="posters-area">
                <AnimatePresence>
                    {bodyPositions.map((pos) => {
                        const song = artist.songs.find(s => s.id === pos.id);
                        if (!song) return null;
                        const isHovered = hoveredId === song.id;
                        const isDimmed = hoveredId && !isHovered;

                        return (
                            <SongPoster
                                key={song.id}
                                song={song}
                                artist={artist}
                                position={pos}
                                isHovered={isHovered}
                                isDimmed={isDimmed}
                                onClick={() => handleSongClick(song)}
                                onHoverStart={() => setHoveredId(song.id)}
                                onHoverEnd={() => setHoveredId(null)}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Ambient pulse circles */}
            <div className="wall-ambient" style={{ '--accent': artist.accent }}>
                <div className="pulse-ring" />
                <div className="pulse-ring" style={{ animationDelay: '1s', opacity: 0.3 }} />
            </div>
        </div>
    );
}
