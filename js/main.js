// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const modalTriggers = document.querySelectorAll('[id$="-link"]');
const modals = document.querySelectorAll('.info-modal');
const modalCloses = document.querySelectorAll('.info-modal-close');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Modals
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = `${trigger.id.replace('-link', '')}-modal`;
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        const modal = close.closest('.info-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            // Toggle active class
            faqItem.classList.toggle('active');
            
            // Toggle answer visibility
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                answer.style.maxHeight = '0';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Mobile Touch Events
    const touchElements = document.querySelectorAll('.nav-link, .btn, .faq-question');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Fix for mobile modal closing
    const modalCloseButtons = document.querySelectorAll('.info-modal-close');
    modalCloseButtons.forEach(close => {
        close.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const modal = this.closest('.info-modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    showNotification('Copied to clipboard!', 'success');
}

// Download Function
function downloadFile(data, filename, type) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    showNotification(`Downloaded ${filename}!`, 'success');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add animations to elements
    const animateElements = document.querySelectorAll('.feature-card, .blog-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

});
// AI Chat Functionality
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const quickActions = document.querySelectorAll('.quick-action');

// AI Responses Database
const aiResponses = {
    greeting: [
        "Hello! I'm your Creative Assistant. How can I help you today?",
        "Hi there! I'm here to help with your creative projects. What do you need?",
        "Welcome! I can assist you with creative tools, ideas, and troubleshooting. What's on your mind?"
    ],
    qr_help: [
        "To use the QR Code Generator: 1) Go to tools.html, 2) Click the QR Code tab, 3) Enter your URL or text, 4) Customize colors and size, 5) Click 'Generate QR Code', 6) Download your QR code!",
        "QR Code Generator is simple! Just enter any URL or text, adjust the appearance if you want, and click generate. You can create QR codes for websites, WiFi, contact info, and more!",
        "For QR codes: Choose your content type (URL, text, WiFi), enter the information, select size and colors, then generate. Perfect for sharing links, contact info, or WiFi passwords!"
    ],
    creative_ideas: [
        "Here are some creative ideas: 1) Create a QR code for your portfolio, 2) Generate a color palette for your brand, 3) Make an ASCII art signature, 4) Create a meme for social media, 5) Generate strong passwords for security.",
        "Creative inspiration: Design a personal logo, create custom QR codes for social media, generate unique color schemes, make ASCII art for your code comments, create memes that reflect your brand personality!",
        "Try these creative projects: Make QR codes for your business cards, generate color palettes for your website, create ASCII art for your GitHub profile, design memes for your social media, generate secure passwords for your accounts!"
    ],
    design_tips: [
        "Design tips: 1) Use consistent color schemes, 2) Follow the 60-30-10 rule, 3) Choose readable fonts, 4) Use white space effectively, 5) Test your designs on different devices.",
        "Design improvement: Study color theory, learn about typography basics, understand layout principles, practice with tools like our Color Palette Generator, get feedback from others, iterate on your designs!",
        "Design fundamentals: Learn about color harmony, understand visual hierarchy, master typography basics, practice layout principles, use our tools to experiment, always test your designs!"
    ],
    beginner_tools: [
        "For beginners, I recommend starting with: 1) QR Code Generator (easy to use), 2) Color Palette Generator (helps with design), 3) Password Generator (practical and useful), 4) Quote Generator (inspiring), 5) Lorem Ipsum Generator (for mockups).",
        "Beginner-friendly tools: Start with QR codes (very practical), try color palettes (helps with design), use password generator (security first), experiment with quotes (inspiration), try lorem ipsum (for mockups). All are intuitive and helpful!",
        "Best tools for beginners: QR Code Generator (most practical), Color Palette Generator (teaches color theory), Password Generator (essential skill), Quote Generator (daily inspiration), Emoji Art Generator (fun and creative)!"
    ],
    troubleshooting: [
        "Having issues? Try these: 1) Clear browser cache, 2) Check internet connection, 3) Try a different browser, 4) Disable browser extensions, 5) Make sure JavaScript is enabled.",
        "Troubleshooting tips: Refresh the page, check console for errors (F12), try incognito mode, update your browser, check if all files loaded properly, test on different devices.",
        "Common fixes: Clear cache and cookies, restart browser, check internet speed, disable ad blockers temporarily, update browser, test on different browsers, check for JavaScript errors!"
    ],
    analytics: [
        "Your analytics show 6 users in 30 minutes! That's great engagement. Focus on: 1) Which tools are most popular, 2) How long users stay, 3) What devices they use, 4) Where they're from.",
        "Analytics insights: You have good user engagement! Focus on popular tools, improve user experience, optimize for mobile, consider time zones for different regions, track conversion rates for premium features.",
        "Your analytics are impressive! 6 users in 30 minutes shows your tools are valuable. Monitor which tools get most use, optimize user flow, improve mobile experience, consider adding more features for popular tools!"
    ],
    default: [
        "That's interesting! Can you tell me more about what you're trying to accomplish?",
        "I'd be happy to help! Could you provide more details about your creative project?",
        "Great question! Let me help you with that. Can you give me more context about what you need?",
        "I understand! Here's what I recommend for your situation. Feel free to ask if you need more specific help!"
    ]
};

// Function to get AI response
function getAIResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    // Check for specific keywords
    if (lowerQuery.includes('qr code') || lowerQuery.includes('qr')) {
        return getRandomResponse(aiResponses.qr_help);
    } else if (lowerQuery.includes('creative') || lowerQuery.includes('idea')) {
        return getRandomResponse(aiResponses.creative_ideas);
    } else if (lowerQuery.includes('design') || lowerQuery.includes('tip')) {
        return getRandomResponse(aiResponses.design_tips);
    } else if (lowerQuery.includes('beginner') || lowerQuery.includes('start')) {
        return getRandomResponse(aiResponses.beginner_tools);
    } else if (lowerQuery.includes('troubleshoot') || lowerQuery.includes('problem') || lowerQuery.includes('issue')) {
        return getRandomResponse(aiResponses.troubleshooting);
    } else if (lowerQuery.includes('analytics') || lowerQuery.includes('user') || lowerQuery.includes('visitor')) {
        return getRandomResponse(aiResponses.analytics);
    } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
        return getRandomResponse(aiResponses.greeting);
    } else {
        return getRandomResponse(aiResponses.default);
    }
}

// Function to get random response
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to add message to chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'ai-message';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${content}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';
    typingContent.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to handle sending message
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response delay
    setTimeout(() => {
        removeTypingIndicator();
        
        // Get AI response
        const response = getAIResponse(message);
        addMessage(response);
        
        // Track the interaction
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('ai_assistant', 'message_sent');
        }
    }, 1000 + Math.random() * 1000); // 1-2 second delay
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick action buttons
quickActions.forEach(button => {
    button.addEventListener('click', () => {
        const query = button.getAttribute('data-query');
        chatInput.value = query;
        sendMessage();
        
        // Track the quick action
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('ai_assistant', 'quick_action');
        }
    });
});

// Initialize chat
document.addEventListener('DOMContentLoaded', () => {
    // Add initial greeting after a short delay
    setTimeout(() => {
        const greeting = getRandomResponse(aiResponses.greeting);
        addMessage(greeting);
    }, 1000);
});
// Blog Modal Functionality
const blogModal = document.getElementById('blogModal');
const modalBlogTitle = document.getElementById('modalBlogTitle');
const modalBlogCategory = document.getElementById('modalBlogCategory');
const modalBlogDate = document.getElementById('modalBlogDate');
const modalBlogImage = document.getElementById('modalBlogImage');
const modalBlogContent = document.getElementById('modalBlogContent');
const modalAuthorName = document.getElementById('modalAuthorName');
const modalAuthorBio = document.getElementById('modalAuthorBio');
const modalClose = document.querySelector('.blog-modal-close');

// Blog content database
const blogContent = {
    blog1: {
        title: "The Psychology of Color in Design",
        category: "Design",
        date: "July 15, 2023",
        image: "https://picsum.photos/seed/blog1/800/400.jpg",
        author: "Creative Tools Hub",
        authorBio: "Helping creators bring their ideas to life",
        content: `
            <h1>The Psychology of Color in Design</h1>
            <p>Color is one of the most powerful tools in a designer's arsenal. It can evoke emotions, influence decisions, and create memorable experiences. Understanding the psychology behind color choices can help you create more effective and impactful designs.</p>
            
            <h2>The Science Behind Color Perception</h2>
            <p>When light enters our eyes, it stimulates different photoreceptors that are sensitive to various wavelengths. Our brain processes these signals and interprets them as different colors. This biological process is influenced by both nature and nurture - some color preferences are universal, while others are culturally learned.</p>
            
            <h2>Red: Passion and Energy</h2>
            <p>Red is the most emotionally intense color. It increases heart rate, creates urgency, and stimulates appetite. In design, red is often used for call-to-action buttons, warning signs, and brands that want to convey excitement or passion.</p>
            
            <h2>Blue: Trust and Calm</h2>
            <p>Blue has the opposite effect of red - it creates a sense of calm, trust, and security. It's the most commonly used color in corporate branding because it conveys reliability and professionalism. Light blues feel friendly and approachable, while dark blues feel more serious and authoritative.</p>
            
            <h2>Green: Growth and Harmony</h2>
            <p>Green is the easiest color for the human eye to process. It's associated with nature, growth, and health. Light greens feel fresh and vibrant, while dark greens convey wealth and prestige. Green is often used by brands that want to appear natural, sustainable, or health-conscious.</p>
            
            <h2>Yellow: Optimism and Attention</h2>
            <p>Yellow is the most visible color in daylight. It's associated with happiness, optimism, and energy. However, too much yellow can cause eye strain and anxiety. Yellow is often used to grab attention, but should be used sparingly in large areas.</p>
            
            <h2>Purple: Creativity and Luxury</h2>
            <p>Purple combines the energy of red with the calm of blue. It's historically associated with royalty, creativity, and spirituality. Light purples feel romantic and nostalgic, while dark purveys convey luxury and sophistication.</p>
            
            <h2>Orange: Enthusiasm and Warmth</h2>
            <p>Orange combines the energy of red with the happiness of yellow. It's associated with enthusiasm, creativity, and warmth. Orange is often used by brands that want to appear friendly, fun, and affordable.</p>
            
            <h2>Black: Power and Elegance</h2>
            <p>Black conveys authority, power, and elegance. It can be sophisticated and timeless, but also intimidating or mournful. Black is often used in luxury branding and can make other colors pop when used as a background.</p>
            
            <h2>White: Purity and Simplicity</h2>
            <p>White represents purity, cleanliness, and simplicity. It can feel fresh and modern, but also sterile and cold. White is often used in healthcare and tech companies to convey cleanliness and innovation.</p>
            
            <h2>Applying Color Psychology in Your Designs</h2>
            <p>When choosing colors for your designs, consider:</p>
            <ul>
                <li><strong>Your audience:</strong> Different demographics respond differently to colors</li>
                <li><strong>Your brand personality:</strong> What emotions do you want to evoke?</li>
                <li><strong>Cultural context:</strong> Colors have different meanings in different cultures</li>
                <li><strong>Accessibility:</strong> Ensure sufficient contrast for readability</li>
                <li><strong>Trends:</strong> Stay current but true to your brand</li>
            </ul>
            
            <p>Remember that color psychology is not an exact science - it's about understanding general tendencies and using them to make informed design decisions that support your goals.</p>
        `
    },
    blog2: {
        title: "10 Creative Tools to Boost Your Productivity",
        category: "Productivity",
        date: "July 10, 2023",
        image: "https://picsum.photos/seed/blog2/800/400.jpg",
        author: "Creative Tools Hub",
        authorBio: "Helping creators bring their ideas to life",
        content: `
            <h1>10 Creative Tools to Boost Your Productivity</h1>
            <p>In today's fast-paced world, productivity is more important than ever. The right tools can help you work smarter, not harder, allowing you to accomplish more in less time. Here are 10 creative tools that can supercharge your productivity and help you achieve your goals.</p>
            
            <h2>1. QR Code Generator</h2>
            <p>QR codes have become essential for sharing information quickly. Use our QR code generator to create codes for websites, contact information, WiFi passwords, and more. Perfect for business cards, event promotions, or sharing links with mobile users.</p>
            
            <h2>2. Password Generator</h2>
            <p>Strong, unique passwords are crucial for online security. Our password generator creates complex passwords that are difficult to crack, helping you protect your accounts and sensitive information. Generate different passwords for each account to maximize security.</p>
            
            <h2>3. Color Palette Generator</h2>
            <p>Color choices can make or break a design. Our color palette generator helps you discover beautiful color combinations for your projects. Whether you're designing a website, presentation, or marketing materials, you'll find the perfect color scheme.</p>
            
            <h2>4. Quote Generator</h2>
            <p>Need inspiration? Our quote generator provides motivational and thought-provoking quotes from various categories. Perfect for social media posts, presentations, or when you need a quick dose of inspiration to get through the day.</p>
            
            <h2>5. ASCII Art Generator</h2>
            <p>Add a creative touch to your text with ASCII art. Our generator transforms regular text into artistic ASCII characters, perfect for code comments, email signatures, or creative social media posts.</p>
            
            <h2>6. Decision Maker</h2>
            <p>Can't decide? Our decision maker helps you make choices quickly and fairly. Simply list your options, and let randomness decide. Great for choosing restaurants, activities, or when you're feeling indecisive.</p>
            
            <h2>7. Meme Generator</h2>
            <p>Create engaging memes for social media with our meme generator. Choose from popular templates, add your text, and share viral-worthy content with your audience. Memes are excellent for social media marketing and engagement.</p>
            
            <h2>8. Emoji Art Generator</h2>
            <p>Express yourself creatively with emoji art. Create fun and expressive designs using emojis, perfect for social media posts, messaging apps, or adding personality to your communications.</p>
            
            <h2>9. Prompt Generator</h2>
            <p>Overcome writer's block with our prompt generator. Get creative writing prompts for fiction, poetry, journaling, and more. Perfect for writers, students, or anyone looking for creative inspiration.</p>
            
            <h2>10. Lorem Ipsum Generator</h2>
            <p>Create placeholder text for your design mockups with our Lorem Ipsum generator. Generate paragraphs, sentences, or words in various lengths to fill your design layouts while focusing on the visual elements.</p>
            
            <h2>How These Tools Boost Productivity</h2>
            <p>These tools save you time by automating repetitive tasks, providing instant results, and helping you make decisions quickly. Instead of spending hours on manual tasks, you can generate professional results in seconds.</p>
            
            <p>Many of these tools also serve as sources of inspiration, helping you overcome creative blocks and find new ideas. By having these tools readily available, you can maintain momentum and keep your creative projects moving forward.</p>
            
            <p>Remember, the best tool is the one that solves your specific problem. Experiment with different tools to discover which ones work best for your workflow and help you achieve your productivity goals.</p>
        `
    },
    blog3: {
        title: "Finding Inspiration When You're Feeling Stuck",
        category: "Inspiration",
        date: "July 5, 2023",
        image: "https://picsum.photos/seed/blog3/800/400.jpg",
        author: "Creative Tools Hub",
        authorBio: "Helping creators bring their ideas to life",
        content: `
            <h1>Finding Inspiration When You're Feeling Stuck</h1>
            <p>Creative blocks happen to everyone. Whether you're a writer, designer, artist, or entrepreneur, there are times when inspiration seems to vanish. The good news is that inspiration isn't something you wait for – it's something you can actively cultivate.</p>
            
            <h2>Change Your Environment</h2>
            <p>Your physical environment has a huge impact on your creativity. Try working in a different location – a coffee shop, park, library, or even just a different room in your house. New surroundings can stimulate new ideas and break you out of your routine.</p>
            
            <h2>Consume Diverse Content</h2>
            <p>Feed your mind with diverse content. Read books outside your usual genre, watch documentaries on unfamiliar topics, listen to different music genres, or explore art from different cultures. The more diverse your inputs, the more diverse your outputs.</p>
            
            <h2>Set Constraints</h2>
            <p>Constraints can actually boost creativity. Try limiting yourself to a specific color palette, time limit, or tool. Working within constraints forces you to think differently and can lead to innovative solutions.</p>
            
            <h2>Collaborate with Others</h2>
 <p>Bouncing ideas off others can provide fresh perspectives. Join creative communities, attend workshops, or simply share your work with friends. Sometimes an outside perspective is exactly what you need to break through a block.</p>
            
            <h2>Take a Break</h2>
            <p>Sometimes the best way to find inspiration is to stop looking for it. Take a walk, exercise, meditate, or work on something completely unrelated. Your brain continues processing in the background, and inspiration often strikes when you least expect it.</p>
            
            <h2>Keep an Idea Journal</h2>
            <p>Capture ideas as they come, even if they seem incomplete. Use a notebook, voice recorder, or notes app. Review your ideas regularly – sometimes a half-formed idea will suddenly make sense with fresh eyes.</p>
            
            <h2>Set Small, Achievable Goals</h2>
            <p>Instead of "write a novel," try "write 100 words." Small wins build momentum and confidence. Break large projects into tiny, manageable tasks that you can complete quickly.</p>
            
            <h2>Embrace Imperfection</h2>
            <p>Perfectionism can paralyze creativity. Give yourself permission to create badly. The goal is to create, not to create perfectly. You can always refine later, but you can't refine a blank page.</p>
            
            <h2>Study the Masters</h2>
            <p>Analyze the work of creators you admire. What makes their work effective? What techniques do they use? Studying others can inspire your own unique approach.</p>
            
            <h2>Create a Routine</h2>
            <p>Establish a creative routine, even if it's just 15 minutes a day. Consistency builds momentum and trains your brain to be creative on demand.</p>
            
            <h2>Remember Your "Why"</h2>
<p>Reconnect with why you started creating in the first place. What excites you about your craft? What impact do you want to make? Your "why" is your most powerful source of motivation.</p>
            
            <h2>When All Else Fails</h2>
            <p>Try these quick fixes: Change your physical position, listen to music, doodle randomly, use our creative tools for inspiration, or simply start working – inspiration often follows action.</p>
            
            <p>Remember, creative blocks are normal. They're not a sign that you've lost your creativity – they're often a sign that you're growing and challenging yourself. Be patient with yourself, trust the process, and keep creating.</p>
        `
    }
};

// Function to open blog modal
function openBlogModal(blogId) {
    const blog = blogContent[blogId];
    
    if (!blog) return;
    
    // Set modal content
    modalBlogTitle.textContent = blog.title;
    modalBlogCategory.textContent = blog.category;
    modalBlogDate.textContent = blog.date;
    modalBlogImage.src = blog.image;
    modalBlogContent.innerHTML = blog.content;
    modalAuthorName.textContent = blog.author;
    modalAuthorBio.textContent = blog.authorBio;
    
    // Show modal
    blogModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Track blog view
    if (typeof trackToolUsage === 'function') {
        trackToolUsage('blog', 'view_article');
    }
}

// Function to close blog modal
function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for blog modals
document.addEventListener('DOMContentLoaded', () => {
    // Read More buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const blogId = button.getAttribute('data-blog-id');
            openBlogModal(blogId);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeBlogModal);
    
    // Close modal on background click
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            closeBlogModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blogModal.classList.contains('active')) {
            closeBlogModal();
        }
    });
});
