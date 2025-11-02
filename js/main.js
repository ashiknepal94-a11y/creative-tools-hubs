// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const modalTriggers = document.querySelectorAll('[id$="-link"]');
const modals = document.querySelectorAll('.info-modal');
const modalCloses = document.querySelectorAll('.info-modal-close');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initModals();
    initSmoothScrolling();
    initFAQAccordion();
    initHeaderScrollEffect();
    initAnimations();
    initAIChat();
    initTouchEvents();
    initNotificationSystem();
    initUtilityFunctions();
    initAnalytics();
});

// Mobile Navigation
function initMobileNavigation() {
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        // Add overlay for better mobile experience
        createOverlay();
    } else {
        document.body.style.overflow = '';
        removeOverlay();
    }
}

function closeMobileMenu() {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    removeOverlay();
}

// Create overlay for mobile menu
function createOverlay() {
    if (document.getElementById('mobile-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'mobile-overlay';
    overlay.className = 'mobile-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 99;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMobileMenu);
}

function removeOverlay() {
    const overlay = document.getElementById('mobile-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }
}

// Modals
function initModals() {
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = `${trigger.id.replace('-link', '')}-modal`;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.info-modal');
            closeModal(modal);
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    modal.style.opacity = '0';
    modal.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
    }, 10);
}

function closeModal(modal) {
    modal.style.opacity = '0';
    modal.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate header height for offset
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(targetId);
                }
            }
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            // Check if this item is already active
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(q => {
                const item = q.parentElement;
                const itemAnswer = item.querySelector('.faq-answer');
                const itemIcon = q.querySelector('i');
                
                item.classList.remove('active');
                itemAnswer.style.maxHeight = '0';
                itemIcon.classList.remove('fa-chevron-up');
                itemIcon.classList.add('fa-chevron-down');
            });
            
            // If this item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animations
function initAnimations() {
    // Add animations to elements
    const animateElements = document.querySelectorAll('.feature-card, .blog-card, .pricing-card, .tool-panel');
    
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
}

// Touch Events for Mobile
function initTouchEvents() {
    const touchElements = document.querySelectorAll('.nav-link, .btn, .faq-question, .tool-tab');
    
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
            closeModal(modal);
        });
    });
}

// Notification System
function initNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    notification.innerHTML = `${icon} <span>${message}</span>`;
    notification.style.cssText = `
        background-color: ${type === 'success' ? '#4caf50' : 
                            type === 'error' ? '#f44336' : 
                            type === 'warning' ? '#ff9800' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        margin-bottom: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                container.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Utility Functions
function initUtilityFunctions() {
    // Copy to Clipboard Function
    window.copyToClipboard = function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    };
    
    function fallbackCopyToClipboard(text) {
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
    window.downloadFile = function(data, filename, type) {
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
    };
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// AI Chat Functionality
function initAIChat() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const quickActions = document.querySelectorAll('.quick-action');
    
    if (!chatInput || !sendButton || !chatMessages) return;
    
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
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
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
    
    // Initialize chat with greeting after a short delay
    setTimeout(() => {
        const greeting = getRandomResponse(aiResponses.greeting);
        addMessage(greeting);
    }, 1000);
}

// AI Assistant Floating Logo
function initAIAssistant() {
    const aiAssistant = document.getElementById('aiAssistant');
    const aiChatSection = document.getElementById('ai-chat');
    
    if (!aiAssistant || !aiChatSection) return;
    
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
}

// Analytics
function initAnalytics() {
    // Track tool usage
    window.trackToolUsage = function(toolName, action) {
        // This would normally send data to your analytics service
        console.log(`Analytics: ${toolName} - ${action}`);
        
        // Example: Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'tool_name': toolName
            });
        }
    };
    
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-W3124HJ28V', {
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
    
    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'outbound',
                    'event_label': this.href
                });
            }
        });
    });
}

// Initialize AI Assistant if it exists
document.addEventListener('DOMContentLoaded', initAIAssistant);

// Add CSS for animations and mobile improvements
const additionalCSS = `
/* Mobile Menu Overlay */
.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: 0;
    transition: opacity 0.3s ease;
}

/* Header Scroll Effect */
.header.scrolled {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

/* Animation Classes */
.animate-fade-in {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Typing Indicator */
.typing-indicator {
    display: flex;
    gap: 5px;
}

.typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #999;
    animation: typing 1.4s infinite;
}

.typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
    }
    30% {
        transform: translateY(-10px);
    }
}

/* Pulse Animation */
.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
}

/* Mobile Responsive Improvements */
@media (max-width: 768px) {
    .nav {
        position: fixed;
        top: 0;
        left: -100%;
        width: 80%;
        height: 100vh;
        background-color: #fff;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 80px;
        transition: left 0.3s ease;
        z-index: 100;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    }
    
    .nav.active {
        left: 0;
    }
    
    .nav ul {
        flex-direction: column;
        width: 100%;
        padding: 0 20px;
    }
    
    .nav li {
        margin: 10px 0;
    }
    
    .nav-link {
        display: block;
        padding: 10px 0;
        font-size: 18px;
    }
    
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 21px;
        cursor: pointer;
        z-index: 101;
    }
    
    .hamburger span {
        display: block;
        height: 3px;
        width: 100%;
        background-color: #333;
        transition: all 0.3s ease;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .info-modal-content {
        width: 95%;
        max-width: 500px;
        margin: 5% auto;
    }
    
    .info-modal-body {
        max-height: 70vh;
        overflow-y: auto;
    }
    
    .ai-chat-section {
        padding: 30px 0;
    }
    
    .chat-messages {
        height: 300px;
    }
    
    .quick-actions {
        flex-wrap: wrap;
    }
    
    .quick-action {
        flex: 0 0 calc(50% - 5px);
        margin-bottom: 10px;
        font-size: 12px;
    }
}
`;

// Add the additional CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

