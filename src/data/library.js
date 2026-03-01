// ╔══════════════════════════════════════════════════════════╗
// ║   LANA DEL REY — Full Library                           ║
// ║   Audio + Lyrics loaded via Vite glob (handles spaces,  ║
// ║   parentheses, and all special characters safely)        ║
// ╚══════════════════════════════════════════════════════════╝

import { parseLRC } from '../utils/parseLRC';

// ── 1. Load all audio files as URL references ─────────────────
const audioModules = import.meta.glob('../assets/audio/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
});

// ── 2. Load all LRC files as raw text ────────────────────────
const lrcModules = import.meta.glob('../assets/lyrics/*.lrc', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// ── Helpers ───────────────────────────────────────────────────

/** Get audio URL by the song filename (case-insensitive, spaces ok) */
function audio(name) {
  const key = Object.keys(audioModules).find(k =>
    k.split('/').pop().toLowerCase() === `${name.toLowerCase()}.mp3`
  );
  return key ? audioModules[key] : '';
}

/** Get parsed lyrics by the song title substring */
function lyrics(nameFragment) {
  const key = Object.keys(lrcModules).find(k =>
    k.toLowerCase().includes(nameFragment.toLowerCase())
  );
  return key ? parseLRC(lrcModules[key]) : [];
}

// ── Duration helpers (approximate, in seconds) ───────────────
function dur(m, s) { return m * 60 + s; }

// ══════════════════════════════════════════════════════════════
// LIBRARY — each entry is one "Era" / album
// Each era has: id, name, genre, accent, gradient,
//   avatarGradient, eraSymbol, songs[]
// ══════════════════════════════════════════════════════════════
export const LIBRARY = [

  // ── Era 1: Born to Die (2012) ─────────────────────────────
  {
    id: 'era-born-to-die',
    name: 'Born to Die',
    genre: '2012  ·  Debut',
    accent: '#e8547a',
    gradient: 'linear-gradient(160deg, #2a0a14 0%, #7a1a30 55%, #c42450 100%)',
    avatarGradient: 'radial-gradient(circle at 35% 30%, #f8a0b8, #e8547a, #6a0020)',
    eraSymbol: '♡',
    songs: [
      { id: 'btd-born-to-die', title: 'Born to Die', album: 'Born to Die', duration: dur(4, 45), albumGradient: 'linear-gradient(135deg,#1a0010,#6a0a1a,#b01030)', albumAccent: '#e8547a', audioSrc: audio('Born to die'), lyricsSrc: lyrics('Born to Die') },
      { id: 'btd-summertime', title: 'Summertime Sadness', album: 'Born to Die', duration: dur(4, 5), albumGradient: 'linear-gradient(135deg,#1a0800,#7c2d12,#c2410c)', albumAccent: '#fb923c', audioSrc: audio('Summertime sadness'), lyricsSrc: lyrics('Summertime Sadness') },
      { id: 'btd-blue-jeans', title: 'Blue Jeans', album: 'Born to Die', duration: dur(3, 55), albumGradient: 'linear-gradient(135deg,#040a20,#1e3a6e,#2563a8)', albumAccent: '#60a5fa', audioSrc: audio('Blue jeans'), lyricsSrc: lyrics('Blue Jeans') },
      { id: 'btd-dark-paradise', title: 'Dark Paradise', album: 'Born to Die', duration: dur(3, 55), albumGradient: 'linear-gradient(135deg,#0d0020,#3b0764,#7c3aed)', albumAccent: '#a78bfa', audioSrc: audio('Dark paradise'), lyricsSrc: lyrics('Dark Paradise') },
      { id: 'btd-diet-mountain-dew', title: 'Diet Mountain Dew', album: 'Born to Die', duration: dur(3, 42), albumGradient: 'linear-gradient(135deg,#0f0515,#4a044e,#7e22ce)', albumAccent: '#e879f9', audioSrc: audio('Diet mountain dew'), lyricsSrc: lyrics('Diet Mountain Dew') },
      { id: 'btd-video-games', title: 'Video Games', album: 'Born to Die', duration: dur(4, 40), albumGradient: 'linear-gradient(135deg,#0a0a14,#1e3a5f,#2a5298)', albumAccent: '#93c5fd', audioSrc: audio('Video games'), lyricsSrc: lyrics('Video Games') },
      { id: 'btd-burning-desire', title: 'Burning Desire', album: 'Born to Die', duration: dur(4, 50), albumGradient: 'linear-gradient(135deg,#1a0500,#7c1a00,#c43800)', albumAccent: '#f97316', audioSrc: audio('Burning desire'), lyricsSrc: lyrics('Burning Desire') },
    ],
  },

  // ── Era 2: Ultraviolence (2014) ───────────────────────────
  {
    id: 'era-ultraviolence',
    name: 'Ultraviolence',
    genre: '2014  ·  Cinematic',
    accent: '#c8973a',
    gradient: 'linear-gradient(160deg, #1a0e00 0%, #5a3500 55%, #9a6010 100%)',
    avatarGradient: 'radial-gradient(circle at 40% 25%, #f5d090, #c8973a, #6b4400)',
    eraSymbol: '✦',
    songs: [
      { id: 'uv-cruel-world', title: 'Cruel World', album: 'Ultraviolence', duration: dur(6, 40), albumGradient: 'linear-gradient(135deg,#100800,#4a2800,#8a5000)', albumAccent: '#d4a847', audioSrc: audio('Cruel world'), lyricsSrc: lyrics('Cruel World') },
      { id: 'uv-ultraviolence', title: 'Ultraviolence', album: 'Ultraviolence', duration: dur(4, 10), albumGradient: 'linear-gradient(135deg,#0e0800,#3d2200,#7a4800)', albumAccent: '#b8860b', audioSrc: audio('Ultraviolence'), lyricsSrc: lyrics('Ultraviolence') },
      { id: 'uv-shades-of-cool', title: 'Shades of Cool', album: 'Ultraviolence', duration: dur(5, 45), albumGradient: 'linear-gradient(135deg,#050818,#0a1a40,#1a3a78)', albumAccent: '#60a5fa', audioSrc: audio('Shades of cool'), lyricsSrc: lyrics('Shades of Cool') },
      { id: 'uv-brooklyn-baby', title: 'Brooklyn Baby', album: 'Ultraviolence', duration: dur(5, 55), albumGradient: 'linear-gradient(135deg,#0a0a14,#252540,#3a3a70)', albumAccent: '#a78bfa', audioSrc: audio('Brooklyn baby'), lyricsSrc: lyrics('Brooklyn Baby') },
      { id: 'uv-west-coast', title: 'West Coast', album: 'Ultraviolence', duration: dur(4, 15), albumGradient: 'linear-gradient(135deg,#040c20,#0c2a50,#1a5090)', albumAccent: '#38bdf8', audioSrc: audio('West coast'), lyricsSrc: lyrics('West Coast') },
      { id: 'uv-pretty-cry', title: 'Pretty When You Cry', album: 'Ultraviolence', duration: dur(3, 50), albumGradient: 'linear-gradient(135deg,#200a20,#5a1a5a,#9a309a)', albumAccent: '#e879f9', audioSrc: audio('Pretty when you cry'), lyricsSrc: lyrics('Pretty When You Cry') },
      { id: 'uv-blue-velvet', title: 'Blue Velvet', album: 'Ultraviolence', duration: dur(3, 8), albumGradient: 'linear-gradient(135deg,#030815,#0a1a3e,#152a6a)', albumAccent: '#818cf8', audioSrc: audio('Blue velvet'), lyricsSrc: lyrics('Blue Velvet') },
      { id: 'uv-salvatore', title: 'Salvatore', album: 'Ultraviolence', duration: dur(4, 50), albumGradient: 'linear-gradient(135deg,#100800,#4a2400,#8a4800)', albumAccent: '#f59e0b', audioSrc: audio('Salvatore'), lyricsSrc: lyrics('Salvatore') },
    ],
  },

  // ── Era 3: Honeymoon (2015) ───────────────────────────────
  {
    id: 'era-honeymoon',
    name: 'Honeymoon',
    genre: '2015  ·  Dreamy',
    accent: '#d4a0c0',
    gradient: 'linear-gradient(160deg, #200a18 0%, #6a2040 55%, #b05880 100%)',
    avatarGradient: 'radial-gradient(circle at 38% 28%, #f5c8e0, #d4a0c0, #80304a)',
    eraSymbol: '✿',
    songs: [
      { id: 'hm-art-deco', title: 'Art Deco', album: 'Honeymoon', duration: dur(5, 20), albumGradient: 'linear-gradient(135deg,#1a0818,#5a2040,#9a4870)', albumAccent: '#f9a8d4', audioSrc: audio('Art Deco'), lyricsSrc: lyrics('Art Deco') },
      { id: 'hm-high-beach', title: 'High by the Beach', album: 'Honeymoon', duration: dur(4, 32), albumGradient: 'linear-gradient(135deg,#030c20,#0a2948,#18508a)', albumAccent: '#7dd3fc', audioSrc: audio('High by the beach'), lyricsSrc: lyrics('High By The Beach') },
      { id: 'hm-doin-time', title: "Doin' Time", album: 'Honeymoon', duration: dur(3, 29), albumGradient: 'linear-gradient(135deg,#100408,#400a20,#781840)', albumAccent: '#fb7185', audioSrc: audio("Doin' time"), lyricsSrc: lyrics("Doin' Time") },
      { id: 'hm-salvatore', title: 'White Mustang', album: 'Honeymoon', duration: dur(3, 3), albumGradient: 'linear-gradient(135deg,#0a0a0a,#282828,#484848)', albumAccent: '#e2e8f0', audioSrc: audio('White mustang'), lyricsSrc: lyrics('White Mustang') },
    ],
  },

  // ── Era 4: NFR! (2019) ────────────────────────────────────
  {
    id: 'era-nfr',
    name: "Norman F'ing Rockwell!",
    genre: '2019  ·  Indie Folk',
    accent: '#7eb8c0',
    gradient: 'linear-gradient(160deg, #08161a 0%, #1a4048 55%, #2a6878 100%)',
    avatarGradient: 'radial-gradient(circle at 40% 28%, #a8dce0, #7eb8c0, #1a4850)',
    eraSymbol: '☽',
    songs: [
      { id: 'nfr-normal-rockwell', title: 'Norman F. Rockwell', album: "NFR!", duration: dur(5, 38), albumGradient: 'linear-gradient(135deg,#060e10,#102830,#206070)', albumAccent: '#67e8f9', audioSrc: audio('Normal fucking rockwell'), lyricsSrc: lyrics("Norman") },
      { id: 'nfr-cinnamon-girl', title: 'Cinnamon Girl', album: "NFR!", duration: dur(5, 5), albumGradient: 'linear-gradient(135deg,#100c04,#3a2808,#6a4a14)', albumAccent: '#fcd34d', audioSrc: audio('Cinnamon girl'), lyricsSrc: lyrics('Cinnamon Girl') },
      { id: 'nfr-love', title: 'Love', album: "NFR!", duration: dur(4, 35), albumGradient: 'linear-gradient(135deg,#100010,#400040,#800080)', albumAccent: '#e879f9', audioSrc: audio('Love'), lyricsSrc: lyrics('- Love') },
      { id: 'nfr-lust-for-life', title: 'Lust for Life', album: "NFR!", duration: dur(4, 23), albumGradient: 'linear-gradient(135deg,#0a0010,#2e1065,#5b21b6)', albumAccent: '#c084fc', audioSrc: audio('Lust for life'), lyricsSrc: lyrics('Lust for Life') },
    ],
  },

  // ── Era 5: Blue Banisters (2021) ─────────────────────────
  {
    id: 'era-blue-banisters',
    name: 'Blue Banisters',
    genre: '2021  ·  Baroque Pop',
    accent: '#8ab4e8',
    gradient: 'linear-gradient(160deg, #080e1a 0%, #1a2d50 55%, #2a4880 100%)',
    avatarGradient: 'radial-gradient(circle at 35% 30%, #b8d4f8, #8ab4e8, #1a3060)',
    eraSymbol: '✧',
    songs: [
      { id: 'bb-blue-banisters', title: 'Blue Banisters', album: 'Blue Banisters', duration: dur(5, 0), albumGradient: 'linear-gradient(135deg,#060c18,#142240,#204080)', albumAccent: '#93c5fd', audioSrc: audio('Blue banisters'), lyricsSrc: lyrics('Blue Banisters') },
      { id: 'bb-beautiful', title: 'Beautiful', album: 'Blue Banisters', duration: dur(2, 30), albumGradient: 'linear-gradient(135deg,#180418,#4a1040,#8a2070)', albumAccent: '#f0abfc', audioSrc: audio('Beautiful'), lyricsSrc: lyrics('Beautiful') },
      { id: 'bb-dealer', title: 'Dealer', album: 'Blue Banisters', duration: dur(3, 5), albumGradient: 'linear-gradient(135deg,#100808,#3a1818,#6a2828)', albumAccent: '#fca5a5', audioSrc: audio('Dealer'), lyricsSrc: lyrics('Dealer') },
      { id: 'bb-tulsa', title: 'Tulsa Jesus Freak', album: 'Blue Banisters', duration: dur(3, 46), albumGradient: 'linear-gradient(135deg,#100a04,#3a2808,#6a4a18)', albumAccent: '#fcd34d', audioSrc: audio('Tulsa jesus freak'), lyricsSrc: lyrics('Tulsa Jesus Freak') },
      { id: 'bb-let-me-love', title: 'Let Me Love You Like a Woman', album: 'Blue Banisters', duration: dur(3, 31), albumGradient: 'linear-gradient(135deg,#180810,#50182a,#8a2840)', albumAccent: '#fda4af', audioSrc: audio('Let me love you like a woman'), lyricsSrc: lyrics('Let Me Love') },
      { id: 'bb-thunder', title: 'Thunder', album: 'Blue Banisters', duration: dur(3, 27), albumGradient: 'linear-gradient(135deg,#08080e,#181828,#282848)', albumAccent: '#818cf8', audioSrc: audio('Thunder'), lyricsSrc: lyrics('Thunder') },
      { id: 'bb-sweet', title: 'Sweet', album: 'Blue Banisters', duration: dur(2, 29), albumGradient: 'linear-gradient(135deg,#180a0a,#501414,#8a2020)', albumAccent: '#f87171', audioSrc: audio('Sweet'), lyricsSrc: lyrics('Sweet') },
      { id: 'bb-fishtail', title: 'Fishtail', album: 'Blue Banisters', duration: dur(3, 22), albumGradient: 'linear-gradient(135deg,#100818,#301040,#501870)', albumAccent: '#c084fc', audioSrc: audio('Fishtail'), lyricsSrc: lyrics('Fishtail') },
      { id: 'bb-peppers', title: 'Peppers', album: 'Blue Banisters', duration: dur(3, 16), albumGradient: 'linear-gradient(135deg,#0a1008,#182a10,#284a18)', albumAccent: '#86efac', audioSrc: audio('Peppers'), lyricsSrc: lyrics('Peppers') },
      { id: 'bb-margaret', title: 'Margaret', album: 'Blue Banisters', duration: dur(4, 4), albumGradient: 'linear-gradient(135deg,#180408,#501018,#901828)', albumAccent: '#fda4af', audioSrc: audio('Margaret'), lyricsSrc: lyrics('Margaret') },
      { id: 'bb-dance-die', title: 'Dance Till We Die', album: 'Blue Banisters', duration: dur(3, 25), albumGradient: 'linear-gradient(135deg,#100818,#30104a,#502080)', albumAccent: '#d8b4fe', audioSrc: audio('Dance till we die'), lyricsSrc: lyrics('Dance Till We Die') },
      { id: 'bb-let-light-in', title: 'Let the Light In', album: 'Blue Banisters', duration: dur(3, 8), albumGradient: 'linear-gradient(135deg,#080810,#181840,#282880)', albumAccent: '#a5b4fc', audioSrc: audio('Let the light in'), lyricsSrc: lyrics('Let The Light In') },
    ],
  },
];

// Each song's lyrics is in lyricsSrc (already parsed array)
// Rename lyricsSrc → lyrics for compatibility with Player/Lyrics components
LIBRARY.forEach(era => {
  era.songs.forEach(song => {
    song.lyrics = song.lyricsSrc;
    delete song.lyricsSrc;
  });
});
