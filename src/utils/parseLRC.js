/**
 * Parses LRC (Lyric) file format into { time, text } array.
 * Supports standard [mm:ss.xx] timestamps.
 * Skips metadata tags (id, ar, al, ti, etc.) and blank lines.
 */
export function parseLRC(raw) {
    if (!raw) return [];
    const lines = raw.split('\n');
    const metaKeys = new Set(['id', 'ar', 'al', 'ti', 'au', 'by', 're', 've', 'length', 'offset']);
    const result = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Skip metadata tags like [ar: Lana Del Rey]
        const metaMatch = trimmed.match(/^\[([a-z]+):\s*.+\]$/i);
        if (metaMatch && metaKeys.has(metaMatch[1].toLowerCase())) continue;

        // Match timing tag(s) + text: [mm:ss.xx]text
        const timeReg = /\[(\d{1,2}):(\d{2})\.(\d{2,3})\]/g;
        let match;
        const times = [];
        let lastIndex = 0;

        while ((match = timeReg.exec(trimmed)) !== null) {
            const min = parseInt(match[1], 10);
            const sec = parseInt(match[2], 10);
            const ms = match[3].length === 2
                ? parseInt(match[3], 10) / 100
                : parseInt(match[3], 10) / 1000;
            times.push(min * 60 + sec + ms);
            lastIndex = timeReg.lastIndex;
        }

        if (times.length === 0) continue;

        // Text is everything after the last timestamp tag
        const text = trimmed.slice(lastIndex).trim();
        // Skip empty/whitespace-only lines
        if (!text) continue;

        for (const time of times) {
            result.push({ time, text });
        }
    }

    // Sort by time (in case of unordered LRC)
    result.sort((a, b) => a.time - b.time);
    return result;
}
