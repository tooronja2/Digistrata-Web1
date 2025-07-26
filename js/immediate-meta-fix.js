// Immediate execution meta property fix - runs as soon as script loads
console.log('🚀 Immediate meta fix starting...');

// Execute immediately without waiting for DOM
(function immediateMetaFix() {
    try {
        var host = (typeof window !== 'undefined' ? window.location.protocol + '//' + window.location.host : '');
        var href = (typeof window !== 'undefined' ? window.location.href : '');
        var imageUrl = host + '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png';
        
        function addMetaImmediate(type, attr, content) {
            if (typeof document === 'undefined') return false;
            
            var selector = (type === 'property') ? 'meta[property="' + attr + '"]' : 'meta[name="' + attr + '"]';
            var existing = document.querySelector(selector);
            
            if (!existing) {
                var meta = document.createElement('meta');
                meta.setAttribute(type, attr);
                meta.setAttribute('content', content);
                
                // Try to add to head, fallback to body if head not ready
                var target = document.head || document.getElementsByTagName('head')[0] || document.body;
                if (target) {
                    target.appendChild(meta);
                    console.log('✅ Added ' + attr + ': ' + content);
                    return true;
                }
            }
            return false;
        }
        
        // Add meta properties immediately
        addMetaImmediate('property', 'og:image', imageUrl);
        addMetaImmediate('name', 'twitter:image', imageUrl);
        addMetaImmediate('property', 'og:url', href);
        
        console.log('✅ Immediate meta fix completed');
        
    } catch (error) {
        console.error('❌ Immediate meta fix error:', error);
    }
})();

// Also schedule for DOM ready as backup
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🔄 Backup meta fix on DOM ready');
            // Re-run the same fix
            immediateMetaFix();
        });
    }
}

console.log('📝 Immediate meta fix script loaded');
