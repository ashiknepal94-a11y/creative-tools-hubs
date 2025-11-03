// Tool-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initQRCodeGenerator();
    initColorPaletteGenerator();
    initPasswordGenerator();
    initQuoteGenerator();
    initEmojiArtGenerator();
    initPromptGenerator();
    initASCIIArtGenerator();
    initDecisionMaker();
    initMemeGenerator();
    initLoremIpsumGenerator();
});

// QR Code Generator
function initQRCodeGenerator() {
    const generateBtn = document.getElementById('generate-qr');
    const downloadBtn = document.getElementById('download-qr');
    const qrType = document.getElementById('qr-type');
    const qrContent = document.getElementById('qr-content');
    const qrSize = document.getElementById('qr-size');
    const qrSizeValue = document.getElementById('qr-size-value');
    const qrColor = document.getElementById('qr-color');
    const qrBgColor = document.getElementById('qr-bg-color');
    const qrResult = document.getElementById('qr-result');
    
    if (!generateBtn || !qrResult) return;
    
    // Update size value display
    qrSize.addEventListener('input', function() {
        qrSizeValue.textContent = this.value + 'px';
    });
    
    generateBtn.addEventListener('click', function() {
        const content = qrContent.value.trim();
        if (!content) {
            showNotification('Please enter content for the QR code', 'warning');
            return;
        }
        
        // Clear previous QR code
        qrResult.innerHTML = '';
        
        // Generate QR code
        const qr = new QRCode(qrResult, {
            text: content,
            width: parseInt(qrSize.value),
            height: parseInt(qrSize.value),
            colorDark: qrColor.value,
            colorLight: qrBgColor.value,
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Show download button
        downloadBtn.style.display = 'inline-flex';
        
        // Track usage
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('qr-code', 'generate');
        }
    });
    
    downloadBtn.addEventListener('click', function() {
        const canvas = qrResult.querySelector('canvas');
        if (canvas) {
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'qrcode.png';
                a.click();
                URL.revokeObjectURL(url);
                
                showNotification('QR code downloaded!', 'success');
            });
        }
    });
}

// Color Palette Generator
function initColorPaletteGenerator() {
    const generateBtn = document.getElementById('generate-palette');
    const paletteType = document.getElementById('palette-type');
    const baseColor = document.getElementById('base-color');
    const paletteResult = document.getElementById('palette-result');
    
    if (!generateBtn || !paletteResult) return;
    
    generateBtn.addEventListener('click', function() {
        const type = paletteType.value;
        const color = baseColor.value;
        
        // Generate palette based on type
        let palette = [];
        
        switch(type) {
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
            default:
                palette = generateRandomPalette();
        }
        
        // Display palette
        paletteResult.innerHTML = '';
        palette.forEach(color => {
            const colorCard = document.createElement('div');
            colorCard.className = 'color-card';
            colorCard.innerHTML = `
                <div class="color-preview" style="background-color: ${color}"></div>
                <div class="color-code">${color}</div>
            `;
            paletteResult.appendChild(colorCard);
        });
        
        // Track usage
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('color-palette', 'generate');
        }
    });
}

function generateMonochromaticPalette(baseColor) {
    const palette = [];
    const rgb = hexToRgb(baseColor);
    
    for (let i = 0; i < 5; i++) {
        const factor = 0.2 + (i * 0.2);
        const r = Math.round(rgb.r * factor);
        const g = Math.round(rgb.g * factor);
        const b = Math.round(rgb.b * factor);
        palette.push(rgbToHex(r, g, b));
    }
    
    return palette;
}

function generateAnalogousPalette(baseColor) {
    const palette = [baseColor];
    const hsl = hexToHsl(baseColor);
    
    for (let i = 1; i < 5; i++) {
        const hue = (hsl.h + (i * 30)) % 360;
        palette.push(hslToHex(hue, hsl.s, hsl.l));
    }
    
    return palette;
}

function generateComplementaryPalette(baseColor) {
    const palette = [baseColor];
    const hsl = hexToHsl(baseColor);
    
    const complementaryHue = (hsl.h + 180) % 360;
    palette.push(hslToHex(complementaryHue, hsl.s, hsl.l));
    
    // Add two more colors for a 5-color palette
    palette.push(hslToHex((hsl.h + 30) % 360, hsl.s * 0.8, hsl.l));
    palette.push(hslToHex((hsl.h + 210) % 360, hsl.s * 0.8, hsl.l));
    
    return palette;
}

function generateTriadicPalette(baseColor) {
    const palette = [baseColor];
    const hsl = hexToHsl(baseColor);
    
    const hue1 = (hsl.h + 120) % 360;
    const hue2 = (hsl.h + 240) % 360;
    
    palette.push(hslToHex(hue1, hsl.s, hsl.l));
    palette.push(hslToHex(hue2, hsl.s, hsl.l));
    
    // Add two more colors for a 5-color palette
    palette.push(hslToHex((hsl.h + 60) % 360, hsl.s * 0.8, hsl.l));
    palette.push(hslToHex((hsl.h + 300) % 360, hsl.s * 0.8, hsl.l));
    
    return palette;
}

function generateRandomPalette() {
    const palette = [];
    for (let i = 0; i < 5; i++) {
        palette.push('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    }
    return palette;
}

// Password Generator
function initPasswordGenerator() {
    const generateBtn = document.getElementById('generate-password');
    const passwordLength = document.getElementById('password-length');
    const passwordLengthValue = document.getElementById('password-length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const passwordResult = document.getElementById('password-result');
    const copyBtn = document.getElementById('copy-password');
    
    if (!generateBtn || !passwordResult) return;
    
    // Update length value display
    passwordLength.addEventListener('input', function() {
        passwordLengthValue.textContent = this.value;
    });
    
    generateBtn.addEventListener('click', function() {
        const length = parseInt(passwordLength.value);
        const useUppercase = includeUppercase.checked;
        const useLowercase = includeLowercase.checked;
        const useNumbers = includeNumbers.checked;
        const useSymbols = includeSymbols.checked;
        
        let charset = '';
        if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useNumbers) charset += '0123456789';
        if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!charset) {
            showNotification('Please select at least one character type', 'warning');
            return;
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        passwordResult.textContent = password;
        copyBtn.style.display = 'inline-flex';
        
        // Track usage
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('password', 'generate');
        }
    });
    
    copyBtn.addEventListener('click', function() {
        copyToClipboard(passwordResult.textContent);
    });
}

// Quote Generator
function initQuoteGenerator() {
    const generateBtn = document.getElementById('generate-quote');
    const quoteCategory = document.getElementById('quote-category');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const shareBtn = document.getElementById('share-quote');
    
    if (!generateBtn || !quoteText) return;
    
    // Sample quotes database
    const quotes = {
        motivational: [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
        ],
        inspirational: [
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
            { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" }
        ],
        success: [
            { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
            { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
            { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" }
        ]
    };
    
    generateBtn.addEventListener('click', function() {
        const category = quoteCategory.value;
        const categoryQuotes = quotes[category] || quotes.motivational;
        const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
        
        quoteText.textContent = `"${randomQuote.text}"`;
        quoteAuthor.textContent = `— ${randomQuote.author}`;
        shareBtn.style.display = 'inline-flex';
        
        // Track usage
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('quote', 'generate');
        }
    });
    
    shareBtn.addEventListener('click', function() {
        const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
        copyToClipboard(quote);
    });
}

// Add placeholder functions for other tools
function initEmojiArtGenerator() {
    console.log('Emoji Art Generator initialized');
}

function initPromptGenerator() {
    console.log('Prompt Generator initialized');
}

function initASCIIArtGenerator() {
    console.log('ASCII Art Generator initialized');
}

function initDecisionMaker() {
    console.log('Decision Maker initialized');
}

function initMemeGenerator() {
    console.log('Meme Generator initialized');
}

function initLoremIpsumGenerator() {
    console.log('Lorem Ipsum Generator initialized');
}

// Helper functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
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

function hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l;
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
    
    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}
