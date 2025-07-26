// Auto-inject missing properties fix for main page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on main page (index.html)
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        
        // Check if properties are already fixed
        if (document.querySelector('meta[property="og:image"]') && 
            document.querySelector('meta[name="twitter:image"]')) {
            console.log('Properties already fixed');
            return;
        }
        
        // Load the missing properties fix script
        const script = document.createElement('script');
        script.src = '/js/missing-properties-fix.js';
        script.onload = function() {
            console.log('Missing properties fix script loaded and executed');
        };
        script.onerror = function() {
            console.error('Failed to load missing properties fix script');
        };
        document.head.appendChild(script);
    }
});
