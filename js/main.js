// Complete main.js with fixed tool switching
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
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
    initToolTabs(); // This is the key function for tool switching
    initThemeToggle();
    initSearch();
    initTooltips();
    initProgressIndicators();
    initKeyboardShortcuts();
    initLazyLoading();
    initOfflineSupport();
    initPerformanceMonitoring();
});

// Tool Tabs Functionality - COMPLETELY REWRITTEN
function initToolTabs() {
    // Only run this on tools.html page
    if (!document.querySelector('.tools-container')) return;
    
    const toolTabs = document.querySelectorAll('.tool-tab');
    const toolPanels = document.querySelectorAll('.tool-panel');
    
    if (toolTabs.length === 0 || toolPanels.length === 0) return;
    
    console.log(`Found ${toolTabs.length} tabs and ${toolPanels.length} panels`);
    
    // Function to switch to a specific tool
    function switchToTool(toolName) {
        console.log(`Switching to tool: ${toolName}`);
        
        // Find the tab and panel for this tool
        const targetTab = document.querySelector(`[data-tool="${toolName}"]`);
        const targetPanel = document.getElementById(`${toolName}-panel`);
        
        if (!targetTab || !targetPanel) {
            console.error(`Tab or panel not found for tool: ${toolName}`);
            return;
        }
        
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
        
        // Track tool usage
        if (typeof trackToolUsage === 'function') {
            trackToolUsage(toolName, 'tab_switch');
        }
        
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
    
    // Add keyboard navigation
    toolTabs.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        tab.setAttribute('aria-controls', `${tab.getAttribute('data-tool')}-panel`);
        
        tab.addEventListener('keydown', (e) => {
            let newIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    newIndex = (index + 1) % toolTabs.length;
                    break;
                case 'ArrowLeft':
                    newIndex = (index - 1 + toolTabs.length) % toolTabs.length;
                    break;
                case 'Home':
                    newIndex = 0;
                    break;
                case 'End':
                    newIndex = toolTabs.length - 1;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            toolTabs[newIndex].focus();
            const toolName = toolTabs[newIndex].getAttribute('data-tool');
            switchToTool(toolName);
        });
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
    const modalTriggers = document.querySelectorAll('[id$="-link"]');
    const modals = document.querySelectorAll('.info-modal');
    const modalCloses = document.querySelectorAll('.info-modal-close');
    
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
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
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
    const header = document.querySelector('.header');
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

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    // Add theme toggle to header
    const headerContainer = document.querySelector('.header .container');
    if (headerContainer) {
        headerContainer.appendChild(themeToggle);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Track theme change
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('theme', 'toggle');
        }
    });
    
    function updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle i');
        if (themeToggle) {
            themeToggle.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Search Functionality
function initSearch() {
    const searchToggle = document.createElement('button');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
    searchToggle.className = 'search-toggle';
    searchToggle.setAttribute('aria-label', 'Toggle search');
    
    // Add search toggle to header
    const headerContainer = document.querySelector('.header .container');
    if (headerContainer) {
        headerContainer.appendChild(searchToggle);
    }
    
    // Create search modal
    const searchModal = createSearchModal();
    document.body.appendChild(searchModal);
    
    searchToggle.addEventListener('click', () => {
        searchModal.classList.add('active');
        document.getElementById('search-input').focus();
    });
    
    // Close search on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });
    
    function createSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-content">
                <div class="search-header">
                    <input type="text" id="search-input" placeholder="Search tools, features, or help..." autocomplete="off">
                    <button class="search-close">&times;</button>
                </div>
                <div class="search-results" id="search-results"></div>
            </div>
        `;
        
        // Add event listeners
        const searchInput = modal.querySelector('#search-input');
        const searchClose = modal.querySelector('.search-close');
        const searchResults = modal.querySelector('#search-results');
        
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchClose.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
        
        return modal;
    }
    
    function performSearch() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const results = document.getElementById('search-results');
        
        if (!query) {
            results.innerHTML = '';
            return;
        }
        
        // Search data
        const searchData = [
            { title: 'QR Code Generator', category: 'Tools', url: '#qr-code', description: 'Create custom QR codes' },
            { title: 'Color Palette Generator', category: 'Tools', url: '#color-palette', description: 'Generate beautiful color palettes' },
            { title: 'Password Generator', category: 'Tools', url: '#password', description: 'Create secure passwords' },
            { title: 'Quote Generator', category: 'Tools', url: '#quote', description: 'Get inspirational quotes' },
            { title: 'Getting Started', category: 'Help', url: '#help', description: 'Learn how to use our tools' },
            { title: 'Pricing Plans', category: 'Info', url: '#pricing', description: 'Compare our pricing plans' }
        ];
        
        const filtered = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        if (filtered.length === 0) {
            results.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }
        
        results.innerHTML = filtered.map(item => `
            <div class="search-result-item" onclick="window.location.hash='${item.url.substring(1)}'; document.querySelector('.search-modal').classList.remove('active');">
                <div class="search-result-title">${highlightMatch(item.title, query)}</div>
                <div class="search-result-category">${item.category}</div>
                <div class="search-result-description">${highlightMatch(item.description, query)}</div>
            </div>
        `).join('');
    }
    
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        
        element.appendChild(tooltip);
        
        element.addEventListener('mouseenter', () => {
            tooltip.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

// Progress Indicators
function initProgressIndicators() {
    // Add progress bar to tool results
    const toolResults = document.querySelectorAll('.tool-result');
    
    toolResults.forEach(result => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        result.appendChild(progressBar);
    });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchModal = document.querySelector('.search-modal');
            if (searchModal) {
                searchModal.classList.add('active');
                document.getElementById('search-input').focus();
            }
        }
        
        // Ctrl/Cmd + / for help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            const helpModal = document.getElementById('help-modal');
            if (helpModal) {
                helpModal.classList.add('active');
            }
        }
        
        // Alt + T for theme toggle
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) themeToggle.click();
        }
    });
}

// Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Offline Support
function initOfflineSupport() {
    // Show offline status
    const offlineIndicator = document.createElement('div');
    offlineIndicator.className = 'offline-indicator';
    offlineIndicator.innerHTML = '<i class="fas fa-wifi"></i> You are offline';
    document.body.appendChild(offlineIndicator);
    
    window.addEventListener('online', () => {
        offlineIndicator.classList.remove('active');
        showNotification('You are back online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        offlineIndicator.classList.add('active');
        showNotification('You are offline. Some features may not work.', 'warning');
    });
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track slow loads
        if (loadTime > 3000) {
            showNotification('Page load is slower than expected', 'warning');
        }
    });
    
    // Track tool usage performance
    window.trackToolPerformance = function(toolName, duration) {
        if (duration > 2000) {
            console.warn(`${toolName} took ${duration}ms to execute`);
        }
    };
}

// Add CSS for animations and mobile improvements
const additionalCSS = `
/* Tool Panel Transitions */
.tool-panel {
    display: none;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.tool-panel.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

/* Tool Tab Active State */
.tool-tab.active {
    background: var(--gradient-primary);
    color: white;
    border-color: var(--primary-color);
    transform: scale(1.05);
    box-shadow: var(--shadow-md);
}

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
