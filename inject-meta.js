// Aggressive meta property injection - executes immediately
void function() {
    console.log('Starting aggressive meta injection...');
    
    function addMeta(type, attr, content) {
        var selector = (type === 'property') ? 'meta[property="' + attr + '"]' : 'meta[name="' + attr + '"]';
        if (!document.querySelector(selector)) {
            var meta = document.createElement('meta');
            meta.setAttribute(type, attr);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
            console.log('✓ Added ' + attr + ' meta tag');
            return true;
        }
        return false;
    }
    
    var host = window.location.protocol + '//' + window.location.host;
    var imageUrl = host + '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png';
    
    // Add missing meta properties
    addMeta('property', 'og:image', imageUrl);
    addMeta('name', 'twitter:image', imageUrl);
    addMeta('property', 'og:url', window.location.href);
    addMeta('name', 'theme-color', '#000000');
    
    // Fix forms
    document.querySelectorAll('form:not([action])').forEach(function(form) {
        form.setAttribute('action', '#');
        console.log('✓ Fixed form action');
    });
    
    // Fix required fields
    document.querySelectorAll('.form-text.star').forEach(function(star) {
        var input = star.closest('.input')?.querySelector('input');
        if (input && !input.hasAttribute('required')) {
            input.setAttribute('required', 'required');
            if (input.name && input.name.toLowerCase().includes('mail')) {
                input.setAttribute('type', 'email');
            }
        }
    });
    
    console.log('✅ Meta injection complete');
}();
