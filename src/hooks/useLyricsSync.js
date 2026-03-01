import { useRef, useEffect } from 'react';

export function useLyricsSync(lyrics, currentTime) {
    const containerRef = useRef(null);
    const activeRef = useRef(null);

    // Find the active lyric index
    let activeIndex = 0;
    for (let i = lyrics.length - 1; i >= 0; i--) {
        if (currentTime >= lyrics[i].time) {
            activeIndex = i;
            break;
        }
    }

    // Auto-scroll active lyric into center view
    useEffect(() => {
        if (activeRef.current && containerRef.current) {
            activeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [activeIndex]);

    return { activeIndex, containerRef, activeRef };
}
