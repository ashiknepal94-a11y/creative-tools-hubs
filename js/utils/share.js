// Share Utilities

// Share on Social Media
function shareOnSocialMedia(platform, url, title, description) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`;
            break;
        case 'reddit':
            shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`;
            break;
        default:
            console.error('Unsupported social media platform:', platform);
            return;
    }
    
    openInNewTab(shareUrl);
}

// Share using Web Share API
function shareUsingWebShareAPI(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        })
        .then(() => {
            showNotification('Shared successfully!', 'success');
        })
        .catch((error) => {
            console.error('Error sharing:', error);
            showNotification('Error sharing content', 'error');
        });
    } else {
        showNotification('Web Share API not supported in this browser', 'error');
    }
}

// Share QR Code
function shareQRCode(dataUrl, filename = 'qrcode.png') {
    // Convert data URL to blob
    fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
            // Create file
            const file = new File([blob], filename, { type: 'image/png' });
            
            // Check if Web Share API is supported
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: 'QR Code',
                    text: 'Check out this QR code!'
                })
                .then(() => {
                    showNotification('QR code shared successfully!', 'success');
                })
                .catch((error) => {
                    console.error('Error sharing QR code:', error);
                    showNotification('Error sharing QR code', 'error');
                });
            } else {
                // Fallback: download the QR code
                downloadFile(dataUrl, filename, 'image/png');
                showNotification('QR code downloaded. You can share it manually.', 'info');
            }
        })
        .catch(error => {
            console.error('Error converting data URL to blob:', error);
            showNotification('Error sharing QR code', 'error');
        });
}

// Share Text
function shareText(text) {
    if (navigator.share) {
        navigator.share({
            title: 'Shared Text',
            text: text
        })
        .then(() => {
            showNotification('Text shared successfully!', 'success');
        })
        .catch((error) => {
            console.error('Error sharing text:', error);
            showNotification('Error sharing text', 'error');
        });
    } else {
        copyToClipboard(text);
    }
}

// Share Link
function shareLink(url, title = '') {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        })
        .then(() => {
            showNotification('Link shared successfully!', 'success');
        })
        .catch((error) => {
            console.error('Error sharing link:', error);
            showNotification('Error sharing link', 'error');
        });
    } else {
        copyToClipboard(url);
    }
}

// Share Image
function shareImage(dataUrl, filename = 'image.png', title = 'Shared Image') {
    // Convert data URL to blob
    fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
            // Create file
            const file = new File([blob], filename, { type: 'image/png' });
            
            // Check if Web Share API is supported
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: title
                })
                .then(() => {
                    showNotification('Image shared successfully!', 'success');
                })
                .catch((error) => {
                    console.error('Error sharing image:', error);
                    showNotification('Error sharing image', 'error');
                });
            } else {
                // Fallback: download the image
                downloadFile(dataUrl, filename, 'image/png');
                showNotification('Image downloaded. You can share it manually.', 'info');
            }
        })
        .catch(error => {
            console.error('Error converting data URL to blob:', error);
            showNotification('Error sharing image', 'error');
        });
}

// Share File
function shareFile(file, title = 'Shared File') {
    // Check if Web Share API is supported
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
            files: [file],
            title: title
        })
        .then(() => {
            showNotification('File shared successfully!', 'success');
        })
        .catch((error) => {
            console.error('Error sharing file:', error);
            showNotification('Error sharing file', 'error');
        });
    } else {
        showNotification('File sharing not supported in this browser', 'error');
    }
}

// Generate Shareable Link
function generateShareableLink(baseUrl, params = {}) {
    const url = new URL(baseUrl);
    
    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key]);
    });
    
    return url.toString();
}

// Get Shareable Link for Tool
function getShareableLinkForTool(toolName, params = {}) {
    const baseUrl = `${window.location.origin}/tools.html`;
    const shareParams = {
        tool: toolName,
        ...params
    };
    
    return generateShareableLink(baseUrl, shareParams);
}

// Get Shareable Link for Generated Content
function getShareableLinkForGeneratedContent(toolName, contentId) {
    const baseUrl = `${window.location.origin}/share.html`;
    const params = {
        tool: toolName,
        id: contentId
    };
    
    return generateShareableLink(baseUrl, params);
}

// Create Share Dialog
function createShareDialog(title, url, description = '') {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'share-modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    
    // Create modal header
    const header = document.createElement('div');
    header.className = 'share-modal-header';
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = 'Share';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'share-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    header.appendChild(titleElement);
    header.appendChild(closeButton);
    
    // Create modal body
    const body = document.createElement('div');
    body.className = 'share-modal-body';
    
    // Create share options
    const shareOptions = document.createElement('div');
    shareOptions.className = 'share-options';
    
    // Social media options
    const socialMediaOptions = [
        { name: 'Facebook', icon: 'fab fa-facebook', platform: 'facebook' },
        { name: 'Twitter', icon: 'fab fa-twitter', platform: 'twitter' },
        { name: 'LinkedIn', icon: 'fab fa-linkedin', platform: 'linkedin' },
        { name: 'Pinterest', icon: 'fab fa-pinterest', platform: 'pinterest' },
        { name: 'Reddit', icon: 'fab fa-reddit', platform: 'reddit' },
        { name: 'WhatsApp', icon: 'fab fa-whatsapp', platform: 'whatsapp' },
        { name: 'Telegram', icon: 'fab fa-telegram', platform: 'telegram' },
        { name: 'Email', icon: 'fas fa-envelope', platform: 'email' }
    ];
    
    socialMediaOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'share-option';
        button.innerHTML = `<i class="${option.icon}"></i> ${option.name}`;
        button.addEventListener('click', () => {
            shareOnSocialMedia(option.platform, url, title, description);
        });
        
        shareOptions.appendChild(button);
    });
    
    // Copy link option
    const copyLinkButton = document.createElement('button');
    copyLinkButton.className = 'share-option';
    copyLinkButton.innerHTML = '<i class="fas fa-link"></i> Copy Link';
    copyLinkButton.addEventListener('click', () => {
        copyToClipboard(url);
    });
    
    shareOptions.appendChild(copyLinkButton);
    
    // Native share option (if supported)
    if (navigator.share) {
        const nativeShareButton = document.createElement('button');
        nativeShareButton.className = 'share-option';
        nativeShareButton.innerHTML = '<i class="fas fa-share-alt"></i> Share';
        nativeShareButton.addEventListener('click', () => {
            shareUsingWebShareAPI(title, description, url);
            document.body.removeChild(overlay);
        });
        
        shareOptions.appendChild(nativeShareButton);
    }
    
    body.appendChild(shareOptions);
    
    // Create URL input
    const urlContainer = document.createElement('div');
    urlContainer.className = 'share-url-container';
    
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.value = url;
    urlInput.readOnly = true;
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-url-button';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.addEventListener('click', () => {
        copyToClipboard(url);
    });
    
    urlContainer.appendChild(urlInput);
    urlContainer.appendChild(copyButton);
    
    body.appendChild(urlContainer);
    
    // Assemble modal
    modal.appendChild(header);
    modal.appendChild(body);
    overlay.appendChild(modal);
    
    // Add to page
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    // Select URL input text on click
    urlInput.addEventListener('click', () => {
        urlInput.select();
    });
}

// Share Tool Result
function shareToolResult(toolName, result, additionalParams = {}) {
    // Create a unique ID for the result
    const resultId = generateId();
    
    // Save result to local storage
    saveToLocalStorage(`share_${resultId}`, {
        tool: toolName,
        result: result,
        timestamp: new Date().toISOString(),
        ...additionalParams
    });
    
    // Get shareable link
    const shareableLink = getShareableLinkForGeneratedContent(toolName, resultId);
    
    // Create share dialog
    createShareDialog(`Check out this ${toolName} result!`, shareableLink, `I created this using the ${toolName} tool from Creative Tools Hub.`);
}

// Load Shared Content
function loadSharedContent(contentId) {
    const sharedData = getFromLocalStorage(`share_${contentId}`);
    
    if (sharedData) {
        return sharedData;
    }
    
    return null;
}

// Add Share Styles
function addShareStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .share-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        
        .share-modal {
            background-color: white;
            border-radius: 0.75rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .share-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .share-modal-header h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
        }
        
        .share-modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.25rem;
            transition: all 0.2s ease;
        }
        
        .share-modal-close:hover {
            background-color: #f3f4f6;
            color: #374151;
        }
        
        .share-modal-body {
            padding: 1.5rem;
        }
        
        .share-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }
        
        .share-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 0.5rem;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;
        }
        
        .share-option:hover {
            background-color: #f3f4f6;
            border-color: #d1d5db;
            transform: translateY(-2px);
        }
        
        .share-option i {
            font-size: 1.5rem;
        }
        
        .share-url-container {
            display: flex;
            gap: 0.5rem;
        }
        
        .share-url-container input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            font-size: 0.875rem;
        }
        
        .copy-url-button {
            padding: 0.75rem;
            background-color: #6366f1;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .copy-url-button:hover {
            background-color: #4f46e5;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize share functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add share styles
    addShareStyles();
    
    // Check for shared content in URL
    const contentId = getQueryParam('id');
    if (contentId) {
        const sharedContent = loadSharedContent(contentId);
        
        if (sharedContent) {
            // Switch to the appropriate tool
            const toolTab = document.querySelector(`[data-tool="${sharedContent.tool}"]`);
            if (toolTab) {
                toolTab.click();
                
                // Load the shared content into the tool
                // This would need to be implemented for each specific tool
                console.log('Loading shared content:', sharedContent);
            }
        }
    }
});

// Export all functions
window.Share = {
    shareOnSocialMedia,
    shareUsingWebShareAPI,
    shareQRCode,
    shareText,
    shareLink,
    shareImage,
    shareFile,
    generateShareableLink,
    getShareableLinkForTool,
    getShareableLinkForGeneratedContent,
    createShareDialog,
    shareToolResult,
    loadSharedContent
};