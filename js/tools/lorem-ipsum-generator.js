// Lorem Ipsum Generator
const loremType = document.getElementById('lorem-type');
const loremAmount = document.getElementById('lorem-amount');
const loremStart = document.getElementById('lorem-start');
const generateLoremBtn = document.getElementById('generate-lorem');
const loremResult = document.getElementById('lorem-result');
const copyLoremBtn = document.getElementById('copy-lorem');

// Lorem ipsum words
const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

// Generate Lorem Ipsum
generateLoremBtn.addEventListener('click', () => {
    const type = loremType.value;
    const amount = parseInt(loremAmount.value);
    const startWithLorem = loremStart.checked;
    
    if (isNaN(amount) || amount < 1) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    let loremText = '';
    
    if (type === 'paragraphs') {
        loremText = generateLoremParagraphs(amount, startWithLorem);
    } else if (type === 'sentences') {
        loremText = generateLoremSentences(amount, startWithLorem);
    } else if (type === 'words') {
        loremText = generateLoremWords(amount, startWithLorem);
    }
    
    // Display result
    loremResult.textContent = loremText;
    copyLoremBtn.style.display = 'block';
    
    showNotification('Lorem ipsum generated successfully!', 'success');
});

// Generate Lorem Paragraphs
function generateLoremParagraphs(count, startWithLorem) {
    let paragraphs = [];
    
    for (let i = 0; i < count; i++) {
        let paragraph = '';
        
        // Generate 5-7 sentences per paragraph
        const sentenceCount = Math.floor(Math.random() * 3) + 5;
        
        for (let j = 0; j < sentenceCount; j++) {
            let sentence = generateLoremWords(Math.floor(Math.random() * 10) + 5, false);
            
            // Capitalize first letter
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
            
            // Add period
            sentence += '.';
            
            paragraph += sentence + ' ';
        }
        
        // Start with "Lorem ipsum" for the first paragraph if requested
        if (i === 0 && startWithLorem) {
            paragraph = 'Lorem ipsum dolor sit amet, ' + paragraph;
        }
        
        paragraphs.push(paragraph.trim());
    }
    
    return paragraphs.join('\n\n');
}

// Generate Lorem Sentences
function generateLoremSentences(count, startWithLorem) {
    let sentences = [];
    
    for (let i = 0; i < count; i++) {
        let sentence = generateLoremWords(Math.floor(Math.random() * 10) + 5, false);
        
        // Capitalize first letter
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        
        // Add period
        sentence += '.';
        
        sentences.push(sentence);
    }
    
    // Start with "Lorem ipsum" for the first sentence if requested
    if (startWithLorem && sentences.length > 0) {
        sentences[0] = 'Lorem ipsum dolor sit amet, ' + sentences[0].substring(0, 1).toLowerCase() + sentences[0].substring(1);
    }
    
    return sentences.join(' ');
}

// Generate Lorem Words
function generateLoremWords(count, startWithLorem) {
    let words = [];
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * loremWords.length);
        words.push(loremWords[randomIndex]);
    }
    
    // Start with "Lorem ipsum" if requested
    if (startWithLorem && words.length >= 2) {
        words[0] = 'lorem';
        words[1] = 'ipsum';
    }
    
    return words.join(' ');
}

// Copy Lorem
copyLoremBtn.addEventListener('click', () => {
    const text = loremResult.textContent;
    copyToClipboard(text);
});