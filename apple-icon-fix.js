// Immediate apple-touch-icon type attribute fix
(function() {
    'use strict';
    
    function fixAppleTouchIcon() {
        var appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (appleIcon && !appleIcon.hasAttribute('type')) {
            appleIcon.setAttribute('type', 'image/png');
            console.log('✅ Fixed: Added type="image/png" to apple-touch-icon');
            return true;
        }
        return false;
    }
    
    // Execute immediately
    fixAppleTouchIcon();
    
    // Execute on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixAppleTouchIcon);
    }
    
    // Execute with delay for any dynamic content
    setTimeout(fixAppleTouchIcon, 100);
    setTimeout(fixAppleTouchIcon, 500);
    setTimeout(fixAppleTouchIcon, 1000);
    
})();
