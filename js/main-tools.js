document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // Tool tabs functionality
    const toolTabs = document.querySelectorAll('.tool-tab');
    const toolPanels = document.querySelectorAll('.tool-panel');
    
    toolTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const toolName = this.getAttribute('data-tool');
            
            // Remove active class from all tabs and panels
            toolTabs.forEach(t => t.classList.remove('active'));
            toolPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(`${toolName}-panel`).classList.add('active');
        });
    });
    
    // Modal functionality
    const helpLink = document.getElementById('help-link');
    const faqLink = document.getElementById('faq-link');
    const privacyLink = document.getElementById('privacy-link');
    
    const helpModal = document.getElementById('help-modal');
    const faqModal = document.getElementById('faq-modal');
    const privacyModal = document.getElementById('privacy-modal');
    
    // Function to open modal
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Function to close modal
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Event listeners for opening modals
    if (helpLink) {
        helpLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(helpModal);
        });
    }
    
    if (faqLink) {
        faqLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(faqModal);
        });
    }
    
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(privacyModal);
        });
    }
    
    // Event listeners for closing modals
    const closeButtons = document.querySelectorAll('.info-modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.info-modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('info-modal')) {
            closeModal(e.target);
        }
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                answer.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
    
    // AI Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const quickActions = document.querySelectorAll('.quick-action');
    
    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('message-avatar');
        avatarDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to simulate AI response
    function simulateAIResponse(userMessage) {
        // Simulate typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('ai-message', 'typing-indicator');
        
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('message-avatar');
        avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate response delay
        setTimeout(() => {
            chatMessages.removeChild(typingDiv);
            
            // Generate a response based on the user's message
            let response = '';
            
            if (userMessage.toLowerCase().includes('qr code')) {
                response = 'To use the QR Code Generator, simply enter the URL or text you want to encode, customize the appearance if desired, and click "Generate QR Code". You can then download the QR code as an image.';
            } else if (userMessage.toLowerCase().includes('creative') || userMessage.toLowerCase().includes('idea')) {
                response = 'For creative inspiration, try using our Prompt Generator for writing ideas, Color Palette Generator for design inspiration, or Emoji Art Generator for fun visual creations. Each tool is designed to spark creativity in different ways!';
            } else if (userMessage.toLowerCase().includes('design') || userMessage.toLowerCase().includes('beginner')) {
                response = 'For beginners, I recommend starting with the Color Palette Generator to understand color theory, the Quote Generator for inspiration, and the ASCII Art Generator for simple text-based creations. These tools are intuitive and great for learning creative basics.';
            } else {
                response = 'Thank you for your question! Our Creative Tools Hub offers 10+ different tools to help with various creative tasks. Is there a specific tool you\'d like to know more about? I\'m here to help with any questions you might have.';
            }
            
            addMessage(response);
        }, 1500);
    }
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            simulateAIResponse(message);
        }
    }
    
    // Event listeners for chat
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Quick action buttons
    quickActions.forEach(button => {
        button.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            chatInput.value = query;
            sendMessage();
        });
    });
});
