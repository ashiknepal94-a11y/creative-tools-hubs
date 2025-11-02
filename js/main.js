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

// AI Assistant Floating Logo
const aiAssistant = document.getElementById('aiAssistant');
const aiChatSection = document.getElementById('ai-chat');

// Function to scroll to AI chat
function scrollToAIChat() {
    aiChatSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Focus on chat input after scrolling
    setTimeout(() => {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.focus();
        }
    }, 800);
    
    // Add pulse animation to logo
    aiAssistant.querySelector('.ai-logo').classList.add('pulse');
    
    // Remove pulse after 3 seconds
    setTimeout(() => {
        aiAssistant.querySelector('.ai-logo').classList.remove('pulse');
    }, 3000);
    
    // Track AI assistant usage
    if (typeof trackToolUsage === 'function') {
        trackToolUsage('ai_assistant', 'logo_clicked');
    }
}

// Event listener for AI assistant
aiAssistant.addEventListener('click', scrollToAIChat);

// Show/hide AI assistant based on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Hide AI assistant when user scrolls past the AI chat section
    if (scrollPosition > aiChatSection.offsetTop + windowHeight) {
        aiAssistant.style.display = 'none';
    } else {
        aiAssistant.style.display = 'block';
    }
});

// Add entrance animation when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        aiAssistant.style.opacity = '0';
        aiAssistant.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            aiAssistant.style.opacity = '1';
            aiAssistant.style.transform = 'translateY(0)';
        }, 500);
    }, 1000);
});

// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mainNav = document.getElementById('main-nav');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'hidden';
});

// Close mobile menu
mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on navigation links
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Contact Form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Here you would normally send the form data to your server
    // For now, we'll just show a success message
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    
    // Clear form
    contactForm.reset();
    
    // Close modal
    const contactModal = document.getElementById('contact-modal');
    if (contactModal) {
        setTimeout(() => {
            contactModal.classList.remove('active');
        }, 2000);
    }
});
