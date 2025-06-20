export const generateVariantColor = (baseColor: string, index: number): string => {
    // Convert hex to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    };

    // Convert RGB to hex
    const rgbToHex = (r: number, g: number, b: number): string => {
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    };

    // Generate a variant based on question index
    const [r, g, b] = hexToRgb(baseColor);
    const variation = Math.sin(index * 0.5) * 30; // Creates predictable but varied colors

    const newR = Math.min(255, Math.max(0, r + variation));
    const newG = Math.min(255, Math.max(0, g + variation * 0.7));
    const newB = Math.min(255, Math.max(0, b + variation * 0.3));

    return rgbToHex(newR, newG, newB);
};