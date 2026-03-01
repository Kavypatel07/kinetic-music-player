import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayerProvider } from './context/PlayerContext';
import ArtistLibrary from './components/ArtistLibrary/ArtistLibrary';
import ArtistWall from './components/ArtistWall/ArtistWall';
import Player from './components/Player/Player';
import './index.css';

export default function App() {
  const [screen, setScreen] = useState('library');
  const [selectedEra, setSelectedEra] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  const goToWall = (era) => { setSelectedEra(era); setScreen('wall'); };
  const goToPlayer = (song) => { setSelectedSong(song); setScreen('player'); };
  const goBack = () => {
    if (screen === 'player') setScreen('wall');
    else if (screen === 'wall') { setScreen('library'); setSelectedEra(null); }
  };

  const accent = selectedEra?.accent || '#e8547a';

  return (
    <PlayerProvider>
      {/* ── Ambient Background ────────────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: 'var(--bg-primary)' }}>
        {/* Soft era-tinted glows */}
        <motion.div
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `
              radial-gradient(ellipse at 20% 35%, ${accent}22 0%, transparent 55%),
              radial-gradient(ellipse at 80% 70%, ${accent}12 0%, transparent 50%),
              radial-gradient(ellipse at 50% 0%,  #f472b618 0%, transparent 45%)
            `,
            transition: 'background 1.5s ease',
          }}
        />
        {/* Deep vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          boxShadow: 'inset 0 0 140px rgba(0,0,0,0.75)',
        }} />
        {/* Cherry blossom petals */}
        <Petals />
      </div>

      {/* ── Screens ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {screen === 'library' && (
          <motion.div key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
            transition={{ duration: 0.55 }}
            style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
          >
            <ArtistLibrary onSelectArtist={goToWall} />
          </motion.div>
        )}

        {screen === 'wall' && (
          <motion.div key="wall"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
          >
            <ArtistWall artist={selectedEra} onSelectSong={goToPlayer} onBack={goBack} />
          </motion.div>
        )}

        {screen === 'player' && (
          <motion.div key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
          >
            <Player song={selectedSong} artist={selectedEra} onBack={goBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </PlayerProvider>
  );
}

// ── Floating cherry blossom petals ────────────────────────────
const PETAL_SHAPES = ['✿', '❀', '✾', '⊹', '﹡', '◌'];
const PETAL_COLORS = ['#f9a8d4', '#fda4af', '#fbcfe8', '#e9d5ff', '#fde68a', '#bfdbfe'];

function Petals() {
  const petals = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -(Math.random() * 20 + 5),
      endY: 110 + Math.random() * 20,
      driftX: (Math.random() - 0.5) * 20,
      size: Math.random() * 16 + 10,
      opacity: Math.random() * 0.35 + 0.08,
      delay: Math.random() * 12,
      duration: Math.random() * 14 + 10,
      shape: PETAL_SHAPES[i % PETAL_SHAPES.length],
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      rotate: Math.random() * 360,
    })), []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {petals.map(p => (
        <motion.span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            fontSize: p.size,
            color: p.color,
            opacity: 0,
            userSelect: 'none',
          }}
          animate={{
            y: [`${p.startY}vh`, `${p.endY}vh`],
            x: [`0px`, `${p.driftX}vw`],
            rotate: [p.rotate, p.rotate + 360],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.shape}
        </motion.span>
      ))}
    </div>
  );
}
