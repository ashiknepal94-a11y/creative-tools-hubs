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
    initNotificationSystem();
    initUtilityFunctions();
    initAnalytics();
    initToolTabs();
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
    
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
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
            if (overlay.parentNode) {
                document.body.removeChild(overlay);
            }
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
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
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
            "To use the QR Code Generator: 1) Select the QR Code tab, 2) Enter your URL or text, 3) Customize colors and size, 4) Click 'Generate QR Code', 5) Download your QR code!",
            "QR Code Generator is simple! Just enter any URL or text, adjust the appearance if you want, and click generate.",
            "For QR codes: Choose your content type (URL, text, WiFi), enter the information, select size and colors, then generate."
        ],
        creative_ideas: [
            "Here are some creative ideas: 1) Create a QR code for your portfolio, 2) Generate a color palette for your brand, 3) Make an ASCII art signature.",
            "Creative inspiration: Design a personal logo, create custom QR codes for social media, generate unique color schemes.",
            "Try these creative projects: Make QR codes for your business cards, generate color palettes for your website."
        ],
        default: [
            "That's interesting! Can you tell me more about what you're trying to accomplish?",
            "I'd be happy to help! Could you provide more details about your creative project?",
            "Great question! Let me help you with that. Can you give me more context about what you need?"
        ]
    };
    
    // Function to get AI response
    function getAIResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.includes('qr code') || lowerQuery.includes('qr')) {
            return getRandomResponse(aiResponses.qr_help);
        } else if (lowerQuery.includes('creative') || lowerQuery.includes('idea')) {
            return getRandomResponse(aiResponses.creative_ideas);
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
        });
    });
    
    // Initialize chat with greeting after a short delay
    setTimeout(() => {
        const greeting = getRandomResponse(aiResponses.greeting);
        addMessage(greeting);
    }, 1000);
}

// Tool Tabs Functionality
function initToolTabs() {
    if (!document.querySelector('.tools-container')) return;
    
    const toolTabs = document.querySelectorAll('.tool-tab');
    const toolPanels = document.querySelectorAll('.tool-panel');
    
    if (toolTabs.length === 0 || toolPanels.length === 0) return;
    
    // Function to switch to a specific tool
    function switchToTool(toolName) {
        // Find the tab and panel for this tool
        const targetTab = document.querySelector(`[data-tool="${toolName}"]`);
        const targetPanel = document.getElementById(`${toolName}-panel`);
        
        if (!targetTab || !targetPanel) return;
        
        // Remove active class from all tabs and panels
        toolTabs.forEach(tab => tab.classList.remove('active'));
        toolPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to the target tab and panel
        targetTab.classList.add('active');
        targetPanel.classList.add('active');
        
        // Add animation
        targetPanel.style.opacity = '0';
        targetPanel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetPanel.style.opacity = '1';
            targetPanel.style.transform = 'translateY(0)';
        }, 10);
        
        // Update URL hash
        history.pushState(null, null, `#${toolName}`);
    }
    
    // Add click event to each tool tab
    toolTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const toolName = this.getAttribute('data-tool');
            switchToTool(toolName);
        });
    });
    
    // Handle hash changes
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const tab = document.querySelector(`[data-tool="${hash}"]`);
            if (tab) {
                switchToTool(hash);
                return;
            }
        }
        
        // Default to first tool if no valid hash
        if (toolTabs.length > 0) {
            const firstToolName = toolTabs[0].getAttribute('data-tool');
            switchToTool(firstToolName);
        }
    }
    
    // Initialize based on current hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
}

// Notification System
function initNotificationSystem() {
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

// Analytics
function initAnalytics() {
    // Track tool usage
    window.trackToolUsage = function(toolName, action) {
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
}

// AI Assistant
document.addEventListener('DOMContentLoaded', function() {
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
    }
    
    // Event listener for AI assistant
    aiAssistant.addEventListener('click', scrollToAIChat);
});
