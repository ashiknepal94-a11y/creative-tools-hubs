// Prompt Generator
const promptCategory = document.getElementById('prompt-category');
const generatePromptBtn = document.getElementById('generate-prompt');
const promptResult = document.getElementById('prompt-result');
const copyPromptBtn = document.getElementById('copy-prompt');

// Sample prompts data
const prompts = {
    fiction: [
        "Write a story about a character who discovers a mysterious object that grants them one wish, but with unexpected consequences.",
        "Create a tale set in a world where dreams can be recorded and replayed like movies.",
        "Write about a time traveler who accidentally changes a small historical event, leading to major consequences.",
        "Tell a story about a detective who can only solve crimes by experiencing the victim's last moments.",
        "Create a narrative about a society where emotions are considered a disease and people who feel too much are 'cured'."
    ],
    poetry: [
        "Write a poem about the changing seasons as a metaphor for human emotions.",
        "Create a sonnet about the beauty found in everyday objects.",
        "Write a free verse poem about the feeling of returning to a place from your childhood.",
        "Compose a haiku series about the relationship between technology and nature.",
        "Write a poem that uses the imagery of stars and galaxies to describe love."
    ],
    journal: [
        "Reflect on a time when you had to make a difficult decision. What did you learn from the experience?",
        "Write about a person who has had a significant impact on your life and why.",
        "Describe a place that makes you feel at peace and explain what it means to you.",
        "Reflect on a challenge you overcame and how it changed you.",
        "Write about a tradition in your family or culture and its significance to you."
    ],
    blog: [
        "Write a blog post about the benefits of incorporating mindfulness into your daily routine.",
        "Create a listicle with 10 tips for improving productivity while working from home.",
        "Write a review of a book, movie, or TV show that had a profound impact on you.",
        "Compose a how-to guide for beginners interested in a hobby you're passionate about.",
        "Write an opinion piece about a current social issue and propose potential solutions."
    ],
    dialogue: [
        "Write a dialogue between two old friends who haven't seen each other in 20 years.",
        "Create a conversation between a human and an artificial intelligence that has just gained consciousness.",
        "Write a dialogue between a parent and child discussing a difficult topic.",
        "Create a conversation between two people from completely different backgrounds who find common ground.",
        "Write a dialogue between a person and their future self from 20 years in the future."
    ]
};

// Generate Prompt
generatePromptBtn.addEventListener('click', () => {
    const category = promptCategory.value;
    const categoryPrompts = prompts[category];
    
    if (categoryPrompts && categoryPrompts.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryPrompts.length);
        const prompt = categoryPrompts[randomIndex];
        
        promptResult.textContent = prompt;
        copyPromptBtn.style.display = 'block';
        
        showNotification('Prompt generated successfully!', 'success');
    }
});

// Copy Prompt
copyPromptBtn.addEventListener('click', () => {
    const text = promptResult.textContent;
    copyToClipboard(text);
});