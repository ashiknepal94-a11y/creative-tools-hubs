// Premium Creative Tools Hub - Enterprise Version
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
    initToolTabs();
    initThemeToggle();
    initSearch();
    initTooltips();
    initProgressIndicators();
    initKeyboardShortcuts();
    initLazyLoading();
    initOfflineSupport();
    initPerformanceMonitoring();
    
    // Premium Features
    initPremiumFeatures();
    initSubscriptionSystem();
    initTeamCollaboration();
    initAPIDocumentation();
    initWhiteLabelOptions();
    initEnterpriseFeatures();
    initAdvancedAnalytics();
    initCloudStorage();
    initBatchProcessing();
    initCustomBranding();
    initAdvancedExport();
    initAITools();
    initTemplateMarketplace();
    initIntegrationHub();
    initWorkflowAutomation();
    initAdvancedSecurity();
    initPerformanceOptimization();
});

// Premium Features System
function initPremiumFeatures() {
    const premiumFeatures = {
        pro: [
            'Unlimited tool usage',
            'Advanced customization',
            'Priority support',
            'Cloud storage (10GB)',
            'API access',
            'Custom branding',
            'Batch processing',
            'Advanced export formats'
        ],
        enterprise: [
            'Everything in Pro',
            'Unlimited cloud storage',
            'Team collaboration',
            'SSO authentication',
            'Dedicated support',
            'Custom integrations',
            'White-label options',
            'Advanced analytics',
            'Workflow automation',
            'API rate limits: 10,000/hr'
        ]
    };
    
    // Create premium feature cards
    const upgradeButtons = document.querySelectorAll('.upgrade-btn');
    upgradeButtons.forEach(btn => {
        btn.addEventListener('click', showPremiumModal);
    });
    
    function showPremiumModal() {
        const modal = createPremiumModal();
        document.body.appendChild(modal);
        modal.classList.add('active');
    }
    
    function createPremiumModal() {
        const modal = document.createElement('div');
        modal.className = 'premium-modal';
        modal.innerHTML = `
            <div class="premium-modal-content">
                <div class="premium-modal-header">
                    <h2>Unlock Premium Features</h2>
                    <button class="premium-modal-close">&times;</button>
                </div>
                <div class="premium-modal-body">
                    <div class="premium-plans">
                        <div class="premium-plan">
                            <h3>Pro Plan</h3>
                            <div class="price">$19<span>/month</span></div>
                            <ul>
                                ${premiumFeatures.pro.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                            </ul>
                            <button class="btn btn-primary premium-select" data-plan="pro">Start Free Trial</button>
                        </div>
                        <div class="premium-plan featured">
                            <div class="plan-badge">MOST POPULAR</div>
                            <h3>Enterprise</h3>
                            <div class="price">$99<span>/month</span></div>
                            <ul>
                                ${premiumFeatures.enterprise.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                            </ul>
                            <button class="btn btn-primary premium-select" data-plan="enterprise">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.premium-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelectorAll('.premium-select').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plan = e.target.getAttribute('data-plan');
                handlePremiumUpgrade(plan);
            });
        });
        
        return modal;
    }
    
    function handlePremiumUpgrade(plan) {
        // Track upgrade attempt
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('premium', `upgrade_attempt_${plan}`);
        }
        
        // Show payment modal
        showPaymentModal(plan);
    }
}

// Subscription System
function initSubscriptionSystem() {
    const subscriptionManager = {
        currentPlan: 'free',
        features: {
            free: { tools: 5, exports: 10, storage: '100MB' },
            pro: { tools: 'unlimited', exports: 'unlimited', storage: '10GB' },
            enterprise: { tools: 'unlimited', exports: 'unlimited', storage: 'unlimited' }
        },
        
        checkFeature(feature) {
            const userPlan = this.getUserPlan();
            return this.features[userPlan][feature] !== undefined;
        },
        
        getUserPlan() {
            return localStorage.getItem('userPlan') || 'free';
        },
        
        setUserPlan(plan) {
            localStorage.setItem('userPlan', plan);
            this.currentPlan = plan;
            this.updateUI();
        },
        
        updateUI() {
            // Update UI based on current plan
            const plan = this.getUserPlan();
            document.body.setAttribute('data-plan', plan);
            
            // Show/hide premium features
            const premiumElements = document.querySelectorAll('[data-premium]');
            premiumElements.forEach(el => {
                el.style.display = plan !== 'free' ? 'block' : 'none';
            });
        }
    };
    
    // Make subscription manager globally available
    window.subscriptionManager = subscriptionManager;
    subscriptionManager.updateUI();
}

// Team Collaboration
function initTeamCollaboration() {
    const teamFeatures = {
        createTeam: function() {
            const modal = createTeamModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        },
        
        inviteMembers: function(teamId) {
            // Invite team members functionality
            showNotification('Team invitation sent!', 'success');
        },
        
        shareProject: function(projectId) {
            // Share project with team
            const shareUrl = `${window.location.origin}/shared/${projectId}`;
            copyToClipboard(shareUrl);
            showNotification('Project link copied!', 'success');
        }
    };
    
    window.teamFeatures = teamFeatures;
    
    function createTeamModal() {
        const modal = document.createElement('div');
        modal.className = 'team-modal';
        modal.innerHTML = `
            <div class="team-modal-content">
                <div class="team-modal-header">
                    <h2>Create Your Team</h2>
                    <button class="team-modal-close">&times;</button>
                </div>
                <div class="team-modal-body">
                    <form id="team-form">
                        <div class="form-group">
                            <label>Team Name</label>
                            <input type="text" id="team-name" required>
                        </div>
                        <div class="form-group">
                            <label>Team Description</label>
                            <textarea id="team-description"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Invite Members (email addresses, comma separated)</label>
                            <input type="text" id="team-members" placeholder="john@example.com, jane@example.com">
                        </div>
                        <button type="submit" class="btn btn-primary">Create Team</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.team-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#team-form').addEventListener('submit', (e) => {
            e.preventDefault();
            handleTeamCreation();
        });
        
        return modal;
    }
    
    function handleTeamCreation() {
        const teamName = document.getElementById('team-name').value;
        const teamDescription = document.getElementById('team-description').value;
        const teamMembers = document.getElementById('team-members').value;
        
        // Create team logic here
        showNotification(`Team "${teamName}" created successfully!`, 'success');
        
        // Close modal
        document.querySelector('.team-modal').remove();
        
        // Track team creation
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('team', 'create');
        }
    }
}

// API Documentation
function initAPIDocumentation() {
    const apiDocs = {
        showDocumentation: function() {
            const modal = createAPIModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        },
        
        generateAPIKey: function() {
            const apiKey = 'ct_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            copyToClipboard(apiKey);
            showNotification('API key generated and copied!', 'success');
            
            // Track API key generation
            if (typeof trackToolUsage === 'function') {
                trackToolUsage('api', 'key_generated');
            }
        }
    };
    
    window.apiDocs = apiDocs;
    
    function createAPIModal() {
        const modal = document.createElement('div');
        modal.className = 'api-modal';
        modal.innerHTML = `
            <div class="api-modal-content">
                <div class="api-modal-header">
                    <h2>API Documentation</h2>
                    <button class="api-modal-close">&times;</button>
                </div>
                <div class="api-modal-body">
                    <div class="api-section">
                        <h3>Getting Started</h3>
                        <p>Access our creative tools programmatically with our REST API.</p>
                        <button class="btn btn-primary" onclick="apiDocs.generateAPIKey()">Generate API Key</button>
                    </div>
                    
                    <div class="api-section">
                        <h3>Endpoints</h3>
                        <div class="api-endpoint">
                            <h4>POST /api/v1/qr-code</h4>
                            <pre><code>{
    "data": "https://example.com",
    "size": 250,
    "color": "#000000"
}</code></pre>
                        </div>
                        <div class="api-endpoint">
                            <h4>POST /api/v1/color-palette</h4>
                            <pre><code>{
    "type": "complementary",
    "base_color": "#3498db"
}</code></pre>
                        </div>
                    </div>
                    
                    <div class="api-section">
                        <h3>Rate Limits</h3>
                        <ul>
                            <li>Free: 100 requests/hour</li>
                            <li>Pro: 1,000 requests/hour</li>
                            <li>Enterprise: 10,000 requests/hour</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.api-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }
}

// White Label Options
function initWhiteLabelOptions() {
    const whiteLabel = {
        showOptions: function() {
            const modal = createWhiteLabelModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        },
        
        generateWhiteLabel: function(config) {
            // Generate white-label version
            showNotification('White-label configuration saved!', 'success');
        }
    };
    
    window.whiteLabel = whiteLabel;
    
    function createWhiteLabelModal() {
        const modal = document.createElement('div');
        modal.className = 'whitelabel-modal';
        modal.innerHTML = `
            <div class="whitelabel-modal-content">
                <div class="whitelabel-modal-header">
                    <h2>White Label Options</h2>
                    <button class="whitelabel-modal-close">&times;</button>
                </div>
                <div class="whitelabel-modal-body">
                    <form id="whitelabel-form">
                        <div class="form-group">
                            <label>Brand Name</label>
                            <input type="text" id="brand-name" placeholder="Your Brand">
                        </div>
                        <div class="form-group">
                            <label>Brand Colors</label>
                            <div class="color-inputs">
                                <input type="color" id="primary-color" value="#6366f1">
                                <input type="color" id="secondary-color" value="#ec4899">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Custom Domain</label>
                            <input type="text" id="custom-domain" placeholder="tools.yourbrand.com">
                        </div>
                        <div class="form-group">
                            <label>Logo URL</label>
                            <input type="url" id="logo-url" placeholder="https://example.com/logo.png">
                        </div>
                        <button type="submit" class="btn btn-primary">Generate White Label</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.whitelabel-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#whitelabel-form').addEventListener('submit', (e) => {
            e.preventDefault();
            handleWhiteLabelGeneration();
        });
        
        return modal;
    }
    
    function handleWhiteLabelGeneration() {
        const config = {
            brandName: document.getElementById('brand-name').value,
            primaryColor: document.getElementById('primary-color').value,
            secondaryColor: document.getElementById('secondary-color').value,
            customDomain: document.getElementById('custom-domain').value,
            logoUrl: document.getElementById('logo-url').value
        };
        
        whiteLabel.generateWhiteLabel(config);
        document.querySelector('.whitelabel-modal').remove();
    }
}

// Enterprise Features
function initEnterpriseFeatures() {
    const enterprise = {
        showDashboard: function() {
            const modal = createEnterpriseModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        },
        
        generateReport: function(type) {
            // Generate enterprise reports
            showNotification(`${type} report generated!`, 'success');
        }
    };
    
    window.enterprise = enterprise;
    
    function createEnterpriseModal() {
        const modal = document.createElement('div');
        modal.className = 'enterprise-modal';
        modal.innerHTML = `
            <div class="enterprise-modal-content">
                <div class="enterprise-modal-header">
                    <h2>Enterprise Dashboard</h2>
                    <button class="enterprise-modal-close">&times;</button>
                </div>
                <div class="enterprise-modal-body">
                    <div class="enterprise-stats">
                        <div class="stat-card">
                            <h3>Active Users</h3>
                            <div class="stat-value">1,234</div>
                        </div>
                        <div class="stat-card">
                            <h3>API Calls</h3>
                            <div class="stat-value">45,678</div>
                        </div>
                        <div class="stat-card">
                            <h3>Storage Used</h3>
                            <div class="stat-value">234 GB</div>
                        </div>
                        <div class="stat-card">
                            <h3>Team Members</h3>
                            <div class="stat-value">56</div>
                        </div>
                    </div>
                    
                    <div class="enterprise-actions">
                        <button class="btn btn-primary" onclick="enterprise.generateReport('usage')">Usage Report</button>
                        <button class="btn btn-primary" onclick="enterprise.generateReport('billing')">Billing Report</button>
                        <button class="btn btn-primary" onclick="enterprise.generateReport('performance')">Performance Report</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.enterprise-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }
}

// Advanced Analytics
function initAdvancedAnalytics() {
    const analytics = {
        trackUserBehavior: function() {
            // Track user interactions
            document.addEventListener('click', (e) => {
                const element = e.target;
                const trackingData = {
                    element: element.tagName,
                    className: element.className,
                    id: element.id,
                    timestamp: Date.now()
                };
                
                // Send to analytics
                this.sendTrackingData(trackingData);
            });
        },
        
        sendTrackingData: function(data) {
            // Send data to analytics server
            console.log('Analytics:', data);
        },
        
        showDashboard: function() {
            const modal = createAnalyticsModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        }
    };
    
    window.analytics = analytics;
    analytics.trackUserBehavior();
    
    function createAnalyticsModal() {
        const modal = document.createElement('div');
        modal.className = 'analytics-modal';
        modal.innerHTML = `
            <div class="analytics-modal-content">
                <div class="analytics-modal-header">
                    <h2>Analytics Dashboard</h2>
                    <button class="analytics-modal-close">&times;</button>
                </div>
                <div class="analytics-modal-body">
                    <div class="analytics-charts">
                        <div class="chart-container">
                            <h3>Tool Usage</h3>
                            <canvas id="tool-usage-chart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>User Activity</h3>
                            <canvas id="user-activity-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.analytics-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Initialize charts
        setTimeout(() => {
            initializeCharts();
        }, 100);
        
        return modal;
    }
    
    function initializeCharts() {
        // Initialize Chart.js or similar library
        console.log('Charts initialized');
    }
}

// Cloud Storage Integration
function initCloudStorage() {
    const cloudStorage = {
        uploadFile: function(file) {
            // Upload file to cloud storage
            showNotification('File uploaded successfully!', 'success');
        },
        
        listFiles: function() {
            // List files in cloud storage
            return [
                { name: 'qr-code-1.png', size: '45KB', date: '2023-07-15' },
                { name: 'color-palette.json', size: '2KB', date: '2023-07-14' },
                { name: 'password-list.txt', size: '1KB', date: '2023-07-13' }
            ];
        },
        
        deleteFile: function(filename) {
            // Delete file from cloud storage
            showNotification(`File ${filename} deleted!`, 'success');
        }
    };
    
    window.cloudStorage = cloudStorage;
}

// Batch Processing
function initBatchProcessing() {
    const batchProcessor = {
        processQR: function(urls) {
            // Process multiple QR codes
            const results = urls.map(url => ({ url, qr: `QR_${url}` }));
            showNotification(`Processed ${urls.length} QR codes!`, 'success');
            return results;
        },
        
        processColors: function(baseColors) {
            // Process multiple color palettes
            const results = baseColors.map(color => ({ base: color, palette: `Palette_${color}` }));
            showNotification(`Generated ${baseColors.length} palettes!`, 'success');
            return results;
        }
    };
    
    window.batchProcessor = batchProcessor;
}

// Custom Branding
function initCustomBranding() {
    const branding = {
        applyCustomTheme: function(theme) {
            // Apply custom branding theme
            document.documentElement.style.setProperty('--primary-color', theme.primary);
            document.documentElement.style.setProperty('--secondary-color', theme.secondary);
            showNotification('Custom theme applied!', 'success');
        },
        
        uploadLogo: function(file) {
            // Upload and apply custom logo
            const reader = new FileReader();
            reader.onload = function(e) {
                const logo = document.querySelector('.logo img');
                if (logo) {
                    logo.src = e.target.result;
                    showNotification('Logo updated!', 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    window.branding = branding;
}

// Advanced Export Options
function initAdvancedExport() {
    const advancedExport = {
        exportToPDF: function(content) {
            // Export content to PDF
            showNotification('PDF exported successfully!', 'success');
        },
        
        exportToSVG: function(content) {
            // Export content to SVG
            showNotification('SVG exported successfully!', 'success');
        },
        
        exportToEPS: function(content) {
            // Export content to EPS
            showNotification('EPS exported successfully!', 'success');
        }
    };
    
    window.advancedExport = advancedExport;
}

// AI-Powered Tools
function initAITools() {
    const aiTools = {
        generateDesign: function(prompt) {
            // Generate design using AI
            showNotification('AI design generated!', 'success');
        },
        
        optimizeColors: function(image) {
            // Optimize colors using AI
            showNotification('Colors optimized!', 'success');
        },
        
        suggestImprovements: function(content) {
            // Suggest improvements using AI
            showNotification('AI suggestions ready!', 'success');
        }
    };
    
    window.aiTools = aiTools;
}

// Template Marketplace
function initTemplateMarketplace() {
    const marketplace = {
        showMarketplace: function() {
            const modal = createMarketplaceModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        },
        
        purchaseTemplate: function(templateId) {
            // Purchase template
            showNotification('Template purchased!', 'success');
        }
    };
    
    window.marketplace = marketplace;
    
    function createMarketplaceModal() {
        const modal = document.createElement('div');
        modal.className = 'marketplace-modal';
        modal.innerHTML = `
            <div class="marketplace-modal-content">
                <div class="marketplace-modal-header">
                    <h2>Template Marketplace</h2>
                    <button class="marketplace-modal-close">&times;</button>
                </div>
                <div class="marketplace-modal-body">
                    <div class="template-grid">
                        <div class="template-card">
                            <img src="https://picsum.photos/seed/template1/300/200.jpg" alt="Template">
                            <h4>Business Card Template</h4>
                            <div class="template-price">$9.99</div>
                            <button class="btn btn-primary" onclick="marketplace.purchaseTemplate('biz-card')">Purchase</button>
                        </div>
                        <div class="template-card">
                            <img src="https://picsum.photos/seed/template2/300/200.jpg" alt="Template">
                            <h4>Social Media Pack</h4>
                            <div class="template-price">$19.99</div>
                            <button class="btn btn-primary" onclick="marketplace.purchaseTemplate('social-pack')">Purchase</button>
                        </div>
                        <div class="template-card">
                            <img src="https://picsum.photos/seed/template3/300/200.jpg" alt="Template">
                            <h4>Brand Identity Kit</h4>
                            <div class="template-price">$49.99</div>
                            <button class="btn btn-primary" onclick="marketplace.purchaseTemplate('brand-kit')">Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.marketplace-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }
}

// Integration Hub
function initIntegrationHub() {
    const integrations = {
        showIntegrations: function() {
            const modal = createIntegrationsModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        },
        
        connectService: function(service) {
            // Connect to third-party service
            showNotification(`${service} connected!`, 'success');
        }
    };
    
    window.integrations = integrations;
    
    function createIntegrationsModal() {
        const modal = document.createElement('div');
        modal.className = 'integrations-modal';
        modal.innerHTML = `
            <div class="integrations-modal-content">
                <div class="integrations-modal-header">
                    <h2>Integration Hub</h2>
                    <button class="integrations-modal-close">&times;</button>
                </div>
                <div class="integrations-modal-body">
                    <div class="integration-grid">
                        <div class="integration-card">
                            <i class="fab fa-slack"></i>
                            <h4>Slack</h4>
                            <p>Share creations directly to Slack</p>
                            <button class="btn btn-outline" onclick="integrations.connectService('Slack')">Connect</button>
                        </div>
                        <div class="integration-card">
                            <i class="fab fa-dropbox"></i>
                            <h4>Dropbox</h4>
                            <p>Sync files to Dropbox</p>
                            <button class="btn btn-outline" onclick="integrations.connectService('Dropbox')">Connect</button>
                        </div>
                        <div class="integration-card">
                            <i class="fab fa-google-drive"></i>
                            <h4>Google Drive</h4>
                            <p>Save to Google Drive</p>
                            <button class="btn btn-outline" onclick="integrations.connectService('Google Drive')">Connect</button>
                        </div>
                        <div class="integration-card">
                            <i class="fab fa-figma"></i>
                            <h4>Figma</h4>
                            <p>Export to Figma</p>
                            <button class="btn btn-outline" onclick="integrations.connectService('Figma')">Connect</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.integrations-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }
}

// Workflow Automation
function initWorkflowAutomation() {
    const automation = {
        createWorkflow: function() {
            const modal = createWorkflowModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
        },
        
        saveWorkflow: function(workflow) {
            // Save workflow
            showNotification('Workflow saved!', 'success');
        }
    };
    
    window.automation = automation;
    
    function createWorkflowModal() {
        const modal = document.createElement('div');
        modal.className = 'workflow-modal';
        modal.innerHTML = `
            <div class="workflow-modal-content">
                <div class="workflow-modal-header">
                    <h2>Workflow Automation</h2>
                    <button class="workflow-modal-close">&times;</button>
                </div>
                <div class="workflow-modal-body">
                    <div class="workflow-builder">
                        <div class="workflow-trigger">
                            <h3>Trigger</h3>
                            <select id="workflow-trigger">
                                <option value="new-file">New File Created</option>
                                <option value="schedule">Scheduled</option>
                                <option value="webhook">Webhook</option>
                            </select>
                        </div>
                        <div class="workflow-actions">
                            <h3>Actions</h3>
                            <div class="action-list">
                                <div class="action-item">
                                    <select>
                                        <option>Generate QR Code</option>
                                        <option>Create Color Palette</option>
                                        <option>Send Email</option>
                                        <option>Save to Cloud</option>
                                    </select>
                                    <button class="btn btn-sm btn-outline">Remove</button>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline">Add Action</button>
                        </div>
                        <button class="btn btn-primary" onclick="automation.saveWorkflow(workflow)">Save Workflow</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.workflow-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }
}

// Advanced Security
function initAdvancedSecurity() {
    const security = {
        enable2FA: function() {
            // Enable two-factor authentication
            showNotification('2FA enabled!', 'success');
        },
        
        auditLogs: function() {
            // Show security audit logs
            showNotification('Audit logs ready!', 'success');
        },
        
        encryptionSettings: function() {
            // Configure encryption settings
            showNotification('Encryption updated!', 'success');
        }
    };
    
    window.security = security;
}

// Performance Optimization
function initPerformanceOptimization() {
    // Lazy load images
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
    
    // Preload critical resources
    const criticalResources = [
        '/css/styles.css',
        '/js/main.js',
        '/fonts/poppins.woff2'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 
                     resource.endsWith('.js') ? 'script' : 'font';
        document.head.appendChild(link);
    });
}

// Payment System
function showPaymentModal(plan) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <div class="payment-modal-header">
                <h2>Complete Your Subscription</h2>
                <button class="payment-modal-close">&times;</button>
            </div>
            <div class="payment-modal-body">
                <div class="payment-plan-info">
                    <h3>${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</h3>
                    <div class="price">$${plan === 'pro' ? '19' : '99'}/month</div>
                </div>
                
                <form id="payment-form">
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" id="card-number" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Expiry Date</label>
                            <input type="text" id="card-expiry" required>
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" id="card-cvv" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Billing Address</label>
                        <input type="text" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Complete Payment</button>
                </form>
                
                <div class="payment-security">
                    <i class="fas fa-lock"></i>
                    <span>Secured by 256-bit SSL encryption</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
    
    // Add event listeners
    modal.querySelector('.payment-modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        processPayment(plan);
    });
    
    // Initialize payment form
    initializePaymentForm();
}

function initializePaymentForm() {
    // Format card number
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date
    const cardExpiry = document.getElementById('card-expiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
}

function processPayment(plan) {
    // Show loading state
    const submitBtn = document.querySelector('#payment-form button');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Update subscription
        subscriptionManager.setUserPlan(plan);
        
        // Close modal
        document.querySelector('.payment-modal').remove();
        
        // Show success message
        showNotification(`Welcome to ${plan.charAt(0).toUpperCase() + plan.slice(1)}!`, 'success');
        
        // Track successful payment
        if (typeof trackToolUsage === 'function') {
            trackToolUsage('payment', `success_${plan}`);
        }
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = '#dashboard';
        }, 2000);
    }, 2000);
}

// Add premium CSS styles
const premiumCSS = `
/* Premium Modal Styles */
.premium-modal, .team-modal, .api-modal, .whitelabel-modal, .enterprise-modal, .analytics-modal, .marketplace-modal, .integrations-modal, .workflow-modal, .payment-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.premium-modal.active, .team-modal.active, .api-modal.active, .whitelabel-modal.active, .enterprise-modal.active, .analytics-modal.active, .marketplace-modal.active, .integrations-modal.active, .workflow-modal.active, .payment-modal.active {
    opacity: 1;
    visibility: visible;
}

.premium-modal-content, .team-modal-content, .api-modal-content, .whitelabel-modal-content, .enterprise-modal-content, .analytics-modal-content, .marketplace-modal-content, .integrations-modal-content, .workflow-modal-content, .payment-modal-content {
    background: white;
    border-radius: 20px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.premium-modal.active .premium-modal-content, .team-modal.active .team-modal-content, .api-modal.active .api-modal-content, .whitelabel-modal.active .whitelabel-modal-content, .enterprise-modal.active .enterprise-modal-content, .analytics-modal.active .analytics-modal-content, .marketplace-modal.active .marketplace-modal-content, .integrations-modal.active .integrations-modal-content, .workflow-modal.active .workflow-modal-content, .payment-modal.active .payment-modal-content {
    transform: scale(1);
}

.premium-modal-header, .team-modal-header, .api-modal-header, .whitelabel-modal-header, .enterprise-modal-header, .analytics-modal-header, .marketplace-modal-header, .integrations-modal-header, .workflow-modal-header, .payment-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid var(--border-color);
}

.premium-modal-header h2, .team-modal-header h2, .api-modal-header h2, .whitelabel-modal-header h2, .enterprise-modal-header h2, .analytics-modal-header h2, .marketplace-modal-header h2, .integrations-modal-header h2, .workflow-modal-header h2, .payment-modal-header h2 {
    margin: 0;
    font-size: 1.8rem;
    color: var(--dark-color);
}

.premium-modal-close, .team-modal-close, .api-modal-close, .whitelabel-modal-close, .enterprise-modal-close, .analytics-modal-close, .marketplace-modal-close, .integrations-modal-close, .workflow-modal-close, .payment-modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-light);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.premium-modal-close:hover, .team-modal-close:hover, .api-modal-close:hover, .whitelabel-modal-close:hover, .enterprise-modal-close:hover, .analytics-modal-close:hover, .marketplace-modal-close:hover, .integrations-modal-close:hover, .workflow-modal-close:hover, .payment-modal-close:hover {
    background: var(--light-color);
    color: var(--text-color);
}

.premium-modal-body, .team-modal-body, .api-modal-body, .whitelabel-modal-body, .enterprise-modal-body, .analytics-modal-body, .marketplace-modal-body, .integrations-modal-body, .workflow-modal-body, .payment-modal-body {
    padding: 2rem;
}

/* Premium Plans */
.premium-plans {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.premium-plan {
    background: var(--light-color);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    position: relative;
    transition: var(--transition);
}

.premium-plan:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
}

.premium-plan.featured {
    background: var(--gradient-primary);
    color: white;
    transform: scale(1.05);
}

.premium-plan h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.premium-plan .price {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.premium-plan .price span {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.8;
}

.premium-plan ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
}

.premium-plan li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.premium-plan li i {
    color: var(--accent-color);
}

.plan-badge {
    position: absolute;
    top: -10px;
    right: 20px;
    background: var(--secondary-color);
    color: white;
    padding: 0.25rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

/* Enterprise Stats */
.enterprise-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: var(--light-color);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
}

.stat-card h3 {
    font-size: 0.9rem;
    color: var(--text-light);
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
}

/* Template Grid */
.template-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.template-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
}

.template-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
}

.template-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.template-card h4 {
    padding: 1rem 1rem 0.5rem;
    margin: 0;
}

.template-price {
    padding: 0 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
}

.template-card button {
    margin: 1rem;
}

/* Integration Grid */
.integration-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}

.integration-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
}

.integration-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
}

.integration-card i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.integration-card h4 {
    margin-bottom: 0.5rem;
}

.integration-card p {
    color: var(--text-light);
    margin-bottom: 1.5rem;
}

/* Payment Form */
.payment-plan-info {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--light-color);
    border-radius: 10px;
}

.payment-plan-info h3 {
    margin-bottom: 0.5rem;
}

.payment-plan-info .price {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.payment-security {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(76, 175, 80, 0.1);
    border-radius: 10px;
    color: var(--accent-color);
}

/* Workflow Builder */
.workflow-builder {
    max-width: 600px;
    margin: 0 auto;
}

.workflow-trigger, .workflow-actions {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--light-color);
    border-radius: 10px;
}

.workflow-trigger h3, .workflow-actions h3 {
    margin-bottom: 1rem;
}

.action-list {
    margin-bottom: 1rem;
}

.action-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.action-item select {
    flex: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
    .premium-plans {
        grid-template-columns: 1fr;
    }
    
    .premium-plan.featured {
        transform: scale(1);
    }
    
    .enterprise-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .template-grid, .integration-grid {
        grid-template-columns: 1fr;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .premium-modal-content, .team-modal-content, .api-modal-content, .whitelabel-modal-content, .enterprise-modal-content, .analytics-modal-content, .marketplace-modal-content, .integrations-modal-content, .workflow-modal-content, .payment-modal-content {
        width: 95%;
        margin: 1rem;
    }
}
`;

// Add premium CSS to the page
const premiumStyle = document.createElement('style');
premiumStyle.textContent = premiumCSS;
document.head.appendChild(premiumStyle);
