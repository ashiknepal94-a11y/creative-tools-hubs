// Quote Generator
const quoteCategory = document.getElementById('quote-category');
const generateQuoteBtn = document.getElementById('generate-quote');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const shareQuoteBtn = document.getElementById('share-quote');

// Sample quotes data
const quotes = {
    motivational: [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" }
    ],
    inspirational: [
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
        { text: "Your limitation—it's only your imagination.", author: "Unknown" },
        { text: "Great things never come from comfort zones.", author: "Unknown" },
        { text: "Dream it. Wish it. Do it.", author: "Unknown" },
        { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" }
    ],
    success: [
        { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
        { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" }
    ],
    life: [
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "Get busy living or get busy dying.", author: "Stephen King" },
        { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
        { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" }
    ],
    love: [
        { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
        { text: "The greatest happiness you can have is knowing that you do not necessarily require happiness.", author: "William Saroyan" },
        { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
        { text: "We are most alive when we're in love.", author: "John Updike" },
        { text: "The only thing we never get enough of is love; and the only thing we never give enough of is love.", author: "Henry Miller" }
    ],
    friendship: [
        { text: "A real friend is one who walks in when the rest of the world walks out.", author: "Walter Winchell" },
        { text: "Friends are the family you choose.", author: "Jess C. Scott" },
        { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
        { text: "True friendship comes when the silence between two people is comfortable.", author: "David Tyson" },
        { text: "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'", author: "C.S. Lewis" }
    ]
};

// Generate Quote
generateQuoteBtn.addEventListener('click', () => {
    const category = quoteCategory.value;
    const categoryQuotes = quotes[category];
    
    if (categoryQuotes && categoryQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
        const quote = categoryQuotes[randomIndex];
        
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        
        shareQuoteBtn.style.display = 'block';
        
        showNotification('Quote generated successfully!', 'success');
    }
});

// Share Quote
shareQuoteBtn.addEventListener('click', () => {
    const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: text
        })
        .then(() => showNotification('Quote shared successfully!', 'success'))
        .catch(err => console.log('Error sharing:', err));
    } else {
        copyToClipboard(text);
    }
});