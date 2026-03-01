<div align="center">

# � Lana Del Rey — Kinetic Music Player

*An intimate, physics-driven listening experience built for fans, by a fan.*

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=20232A" />
  <img src="https://img.shields.io/badge/Vite-7-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Framer_Motion-✦-FF0080?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Matter.js-Physics-4B4B4B?style=for-the-badge&logo=javascript&logoColor=white" />
</p>

</div>

---

## ✨ The Experience

> *"Choose an era and step into her world."*

This isn't a music player. It's a **shrine** — a beautifully crafted, interactive tribute to Lana Del Rey's discography, built with modern web technologies and a deep love for her aesthetic. Every screen feels like flipping through old film photographs.

---

## 📸 Screens

### 🌷 The Eras — Entry Page

> Five album eras presented as blush-toned polaroid cards, each tilted just slightly, the way a real photo would sit on a velvet table.

![The Eras Page — Polaroid Album Cards](./screenshots/eras_page.png)

---

### 🎴 The Physics Wall

> Click an era and its songs burst into a physics-driven space — tumbling, drifting postcards that follow your mouse like they're drawn to you.

![Born to Die Physics Wall — Floating Song Postcards](./screenshots/physics_wall.png)

---

### 🎧 The Player

> Click any postcard and it *morphs* seamlessly into the full music player. Playfair Display italic titles, a spinning vinyl, floating music notes, and audio that actually plays from local files.

![Music Player — Born to Die Playing](./screenshots/player.png)

---

### 🎶 Full-Screen Lyrics

> Open the lyrics view to see every line synced exactly to the timestamp. Click any line to seek to that moment. The background shifts to the song's colour story.

![Full-Screen Synced Lyrics](./screenshots/lyrics_fullscreen.png)

---

## �️ The Five Eras

| Era | Symbol | Vibe | Tracks |
|:---|:---:|:---|:---:|
| **Born to Die** (2012) | ♡ | deep rose · debut · cinematic | 7 |
| **Ultraviolence** (2014) | ✦ | antique gold · moody · noir | 8 |
| **Honeymoon** (2015) | ✿ | dusty mauve · dreamlike · soft | 4 |
| **Norman F'ing Rockwell!** (2019) | ☽ | teal · indie folk · literary | 4 |
| **Blue Banisters** (2021) | ✧ | powder blue · baroque · intimate | 12 |

**35 songs. All local. All with time-synced lyrics.**

---

## 🛠️ Tech Stack

| Technology | Why it's here |
|:---|:---|
| **React 18** | Component architecture + `Context API` for global audio state |
| **Vite 7** | Blazing-fast dev server · `import.meta.glob` handles all filename edge cases |
| **Framer Motion** | `layoutId` shared morphing, stagger entrances, blur transitions |
| **Matter.js** | 2D physics for the song postcards — gravity, bounce, mouse attraction |
| **Vanilla CSS3** | Raw control over variables, `backdrop-filter`, `@keyframes`, gradients |
| **Web Audio API** | `HTMLAudioElement` with seek, volume, queue, and `onEnded` |
| **Custom LRC Parser** | Hand-rolled `parseLRC.js` — reads `.lrc` timestamp files for synced lyrics |
| **Playfair Display** | The editorial serif font that ties the whole aesthetic together |

---

## 🌸 The Aesthetic

Built around a **vintage film / romantic darkroom** mood:

- 🌸 **Cherry blossom petals** (✿ ❀ ✾) drift across every screen
- 💗 **Blush polaroid cards** — warm paper background, alternating tilts, spring-bounce hover
- 🎀 **Song postcards** with rosewood vinyl record art on the physics wall
- ✨ Animated `Lana Del Rey` title: **rose → gold → cream shimmer** on loop
- 🕯️ Film grain overlay on every page for that analogue, worn-in feel
- 💅 Square vintage buttons in **Courier New**, highlighted in soft pinks

---

## ⚙️ Run It Locally

```bash
git clone https://github.com/yourusername/kinetic-music-player.git
cd kinetic-music-player

# Install dependencies
npm install

# Add your audio files to:
#   src/assets/audio/*.mp3
#   src/assets/lyrics/*.lrc

# Start the dev server
npm run dev
# → http://localhost:5173
```

> The app uses `import.meta.glob` under the hood, so any `.mp3` and `.lrc` files you drop into those folders are **automatically picked up** — no code changes needed.

---

## 🎓 About

Built as a personal portfolio piece at university — a deep-dive into advanced UI animation, physics in the browser, and the art of building interfaces that feel *alive*. Every design decision asked: *"What would Lana approve of?"*

🔗 [LinkedIn](#) &nbsp;·&nbsp; 🔗 [Portfolio](#) &nbsp;·&nbsp; 📧 [Email](#)

---

<div align="center">
  <i>Built with ♡ and a lot of Lana on repeat.</i>
</div>
