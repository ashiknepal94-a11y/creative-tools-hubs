// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const toolTabs = document.querySelectorAll('.tool-tab');
const toolPanels = document.querySelectorAll('.tool-panel');
const modalTriggers = document.querySelectorAll('[id$="-link"]');
const modals = document.querySelectorAll('.info-modal');
const modalCloses = document.querySelectorAll('.info-modal-close');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    
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

// Tool Tabs - COMPLETELY FIXED VERSION
function switchTool(toolName) {
    console.log('Switching to tool:', toolName);
    
    // Remove active class from all tabs
    toolTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all panels
    toolPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-tool="${toolName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        console.log('Tab activated:', toolName);
    } else {
        console.error('Tab not found:', toolName);
    }
    
    // Add active class to corresponding panel
    const activePanel = document.getElementById(`${toolName}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
        console.log('Panel activated:', `${toolName}-panel`);
    } else {
        console.error('Panel not found:', `${toolName}-panel`);
    }
}

// Add click listeners to all tool tabs
toolTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const toolName = tab.getAttribute('data-tool');
        console.log('Tab clicked:', toolName);
        switchTool(toolName);
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
    
    // DEBUG: Check if all elements exist
    console.log('=== DEBUG INFO ===');
    console.log('Tool tabs found:', toolTabs.length);
    console.log('Tool panels found:', toolPanels.length);
    
    // List all tabs
    toolTabs.forEach((tab, index) => {
        const toolName = tab.getAttribute('data-tool');
        console.log(`Tab ${index}: ${toolName}`, tab);
    });
    
    // List all panels
    toolPanels.forEach((panel, index) => {
        console.log(`Panel ${index}: ${panel.id}`, panel);
    });
    
    // Check for missing panels
    toolTabs.forEach(tab => {
        const toolName = tab.getAttribute('data-tool');
        const panel = document.getElementById(`${toolName}-panel`);
        if (!panel) {
            console.error(`❌ MISSING PANEL for tool: ${toolName}`);
        } else {
            console.log(`✅ Panel exists for tool: ${toolName}`);
        }
    });
    
    // Initialize first tool as active
    if (toolTabs.length > 0) {
        const firstToolName = toolTabs[0].getAttribute('data-tool');
        console.log('Initializing first tool:', firstToolName);
        switchTool(firstToolName);
    }
    
    // Mobile Touch Events
    const touchElements = document.querySelectorAll('.tool-tab, .nav-link, .btn, .faq-question');
    
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
    const animateElements = document.querySelectorAll('.tool-panel');
    
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