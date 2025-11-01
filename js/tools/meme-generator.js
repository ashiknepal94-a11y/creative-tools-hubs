// Meme Generator
const memeTemplate = document.getElementById('meme-template');
const memeTopText = document.getElementById('meme-top-text');
const memeBottomText = document.getElementById('meme-bottom-text');
const generateMemeBtn = document.getElementById('generate-meme');
const memeResult = document.getElementById('meme-result');
const downloadMemeBtn = document.getElementById('download-meme');

// Meme templates
const memeTemplates = {
    'drake': 'https://picsum.photos/seed/drake/500/500.jpg',
    'distracted-boyfriend': 'https://picsum.photos/seed/distracted/500/500.jpg',
    'woman-yelling': 'https://picsum.photos/seed/woman-yelling/500/500.jpg',
    'two-buttons': 'https://picsum.photos/seed/two-buttons/500/500.jpg',
    'expanding-brain': 'https://picsum.photos/seed/brain/500/500.jpg'
};

// Generate Meme
generateMemeBtn.addEventListener('click', () => {
    const template = memeTemplate.value;
    const topText = memeTopText.value.trim().toUpperCase();
    const bottomText = memeBottomText.value.trim().toUpperCase();
    
    if (!topText && !bottomText) {
        showNotification('Please enter at least one text field', 'error');
        return;
    }
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 500;
    canvas.height = 500;
    
    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Set text style
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.font = 'bold 40px Impact, sans-serif';
        ctx.textAlign = 'center';
        
        // Draw top text
        if (topText) {
            const topY = 50;
            ctx.strokeText(topText, canvas.width / 2, topY);
            ctx.fillText(topText, canvas.width / 2, topY);
        }
        
        // Draw bottom text
        if (bottomText) {
            const bottomY = canvas.height - 20;
            ctx.strokeText(bottomText, canvas.width / 2, bottomY);
            ctx.fillText(bottomText, canvas.width / 2, bottomY);
        }
        
        // Display meme
        memeResult.innerHTML = '';
        const resultImg = document.createElement('img');
        resultImg.src = canvas.toDataURL();
        memeResult.appendChild(resultImg);
        
        // Show download button
        downloadMemeBtn.style.display = 'block';
        
        showNotification('Meme generated successfully!', 'success');
    };
    
    img.onerror = function() {
        showNotification('Failed to load meme template', 'error');
    };
    
    img.src = memeTemplates[template];
});

// Download Meme
downloadMemeBtn.addEventListener('click', () => {
    const img = memeResult.querySelector('img');
    
    if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'meme.png';
        link.click();
        
        showNotification('Meme downloaded!', 'success');
    }
});