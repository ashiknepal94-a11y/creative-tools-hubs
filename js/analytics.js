// Google Analytics for Local Development
(function() {
    const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your ID
    
    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, {
        debug_mode: true,
        page_location: window.location.href
    });
    
    window.gtag = gtag;
    
    // Track events
    window.trackEvent = function(eventName, parameters = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, parameters);
            console.log('Analytics Event:', eventName, parameters);
        }
    };
    
    window.trackToolUsage = function(toolName, action) {
        trackEvent('tool_usage', {
            tool_name: toolName,
            action: action
        });
    };
})();