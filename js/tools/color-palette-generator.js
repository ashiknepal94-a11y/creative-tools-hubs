// Color Palette Generator
const paletteType = document.getElementById('palette-type');
const baseColor = document.getElementById('base-color');
const generatePaletteBtn = document.getElementById('generate-palette');
const paletteResult = document.getElementById('palette-result');
const exportPaletteBtn = document.getElementById('export-palette');

// Generate Color Palette
generatePaletteBtn.addEventListener('click', () => {
    const type = paletteType.value;
    const color = baseColor.value;
    
    let palette = [];
    
    switch (type) {
        case 'monochromatic':
            palette = generateMonochromaticPalette(color);
            break;
        case 'analogous':
            palette = generateAnalogousPalette(color);
            break;
        case 'complementary':
            palette = generateComplementaryPalette(color);
            break;
        case 'triadic':
            palette = generateTriadicPalette(color);
            break;
        case 'random':
            palette = generateRandomPalette();
            break;
    }
    
    displayPalette(palette);
    exportPaletteBtn.style.display = 'block';
    
    showNotification('Palette generated successfully!', 'success');
});

// Generate Monochromatic Palette
function generateMonochromaticPalette(baseColor) {
    const palette = [baseColor];
    const hsl = hexToHSL(baseColor);
    
    for (let i = 1; i <= 4; i++) {
        const lightness = Math.min(90, hsl.l + (i * 15));
        palette.push(HSLToHex(hsl.h, hsl.s, lightness));
    }
    
    for (let i = 1; i <= 4; i++) {
        const lightness = Math.max(10, hsl.l - (i * 15));
        palette.push(HSLToHex(hsl.h, hsl.s, lightness));
    }
    
    return palette;
}

// Generate Analogous Palette
function generateAnalogousPalette(baseColor) {
    const palette = [baseColor];
    const hsl = hexToHSL(baseColor);
    
    for (let i = 1; i <= 4; i++) {
        const hue = (hsl.h + (i * 30)) % 360;
        palette.push(HSLToHex(hue, hsl.s, hsl.l));
    }
    
    for (let i = 1; i <= 4; i++) {
        const hue = (hsl.h - (i * 30) + 360) % 360;
        palette.push(HSLToHex(hue, hsl.s, hsl.l));
    }
    
    return palette;
}

// Generate Complementary Palette
function generateComplementaryPalette(baseColor) {
    const palette = [baseColor];
    const hsl = hexToHSL(baseColor);
    
    // Add complementary color
    const complementaryHue = (hsl.h + 180) % 360;
    palette.push(HSLToHex(complementaryHue, hsl.s, hsl.l));
    
    // Add variations of the base color
    for (let i = 1; i <= 4; i++) {
        const lightness = Math.min(90, hsl.l + (i * 15));
        palette.push(HSLToHex(hsl.h, hsl.s, lightness));
    }
    
    // Add variations of the complementary color
    for (let i = 1; i <= 4; i++) {
        const lightness = Math.min(90, hsl.l + (i * 15));
        palette.push(HSLToHex(complementaryHue, hsl.s, lightness));
    }
    
    return palette;
}

// Generate Triadic Palette
function generateTriadicPalette(baseColor) {
    const palette = [baseColor];
    const hsl = hexToHSL(baseColor);
    
    // Add two triadic colors
    const triadicHue1 = (hsl.h + 120) % 360;
    const triadicHue2 = (hsl.h + 240) % 360;
    
    palette.push(HSLToHex(triadicHue1, hsl.s, hsl.l));
    palette.push(HSLToHex(triadicHue2, hsl.s, hsl.l));
    
    // Add variations of each color
    for (let i = 1; i <= 2; i++) {
        const lightness = Math.min(90, hsl.l + (i * 20));
        palette.push(HSLToHex(hsl.h, hsl.s, lightness));
        palette.push(HSLToHex(triadicHue1, hsl.s, lightness));
        palette.push(HSLToHex(triadicHue2, hsl.s, lightness));
    }
    
    return palette;
}

// Generate Random Palette
function generateRandomPalette() {
    const palette = [];
    
    for (let i = 0; i < 10; i++) {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
        const lightness = Math.floor(Math.random() * 40) + 40; // 40-80%
        
        palette.push(HSLToHex(hue, saturation, lightness));
    }
    
    return palette;
}

// Display Palette
function displayPalette(palette) {
    paletteResult.innerHTML = '';
    
    palette.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        
        const colorPreview = document.createElement('div');
        colorPreview.className = 'color-preview';
        colorPreview.style.backgroundColor = color;
        
        const colorCode = document.createElement('div');
        colorCode.className = 'color-code';
        colorCode.textContent = color.toUpperCase();
        
        colorCard.appendChild(colorPreview);
        colorCard.appendChild(colorCode);
        paletteResult.appendChild(colorCard);
    });
}

// Export Palette
exportPaletteBtn.addEventListener('click', () => {
    const colorCards = document.querySelectorAll('.color-card');
    let paletteData = 'Color Palette\n\n';
    
    colorCards.forEach((card, index) => {
        const colorCode = card.querySelector('.color-code').textContent;
        paletteData += `Color ${index + 1}: ${colorCode}\n`;
    });
    
    downloadFile(paletteData, 'color-palette.txt', 'text/plain');
});

// Color Conversion Functions
function hexToHSL(hex) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Find the maximum and minimum values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // Achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function HSLToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}