import { useEffect, useRef, useState } from 'react';

export function useDominantColor(gradient, accent) {
    // Since we use CSS gradients (not image URLs), we extract colors from the accent
    // Parse a hex/named accent color to RGB
    const [color, setColor] = useState({ r: 100, g: 50, b: 200 });

    useEffect(() => {
        if (!accent) return;
        // Convert hex to rgb
        const hex = accent.replace('#', '');
        if (hex.length === 6) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            setColor({ r, g, b });
        }
    }, [accent]);

    return color;
}
