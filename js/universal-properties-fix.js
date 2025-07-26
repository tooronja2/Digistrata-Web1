// Universal missing properties fix for all pages
(function() {
    'use strict';
    
    function fixMissingProperties() {
        try {
            console.log('Applying universal missing properties fix...');
            
            // 1. Add missing Open Graph image only if not already present
            if (!document.querySelector('meta[property="og:image"]')) {
                var ogImage = document.createElement('meta');
                ogImage.setAttribute('property', 'og:image');
                ogImage.setAttribute('content', '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png');
                document.head.appendChild(ogImage);
                console.log('Added og:image meta property');
            }
            
            // 2. Add missing Twitter image only if not already present
            if (!document.querySelector('meta[name="twitter:image"]')) {
                var twitterImage = document.createElement('meta');
                twitterImage.setAttribute('name', 'twitter:image');
                twitterImage.setAttribute('content', '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png');
                document.head.appendChild(twitterImage);
                console.log('Added twitter:image meta property');
            }
            
            // 3. Add missing og:url only if not already present
            if (!document.querySelector('meta[property="og:url"]')) {
                var ogUrl = document.createElement('meta');
                ogUrl.setAttribute('property', 'og:url');
                ogUrl.setAttribute('content', window.location.href);
                document.head.appendChild(ogUrl);
                console.log('Added og:url meta property');
            }
            
            // 4. Fix forms missing action attribute
            var forms = document.querySelectorAll('form[method="get"]');
            forms.forEach(function(form) {
                if (!form.hasAttribute('action')) {
                    form.setAttribute('action', '#');
                    console.log('Added action attribute to form');
                }
                form.setAttribute('method', 'post');
            });
            
            // 5. Add required attributes to form fields marked with asterisk
            var requiredFields = document.querySelectorAll('.form-text.star');
            requiredFields.forEach(function(star) {
                var inputContainer = star.closest('.input');
                if (inputContainer) {
                    var input = inputContainer.querySelector('input');
                    if (input && !input.hasAttribute('required')) {
                        input.setAttribute('required', 'required');
                        console.log('Added required attribute to input:', input.name || input.id);
                        
                        // Fix email field type
                        if (input.name && input.name.toLowerCase().includes('mail')) {
                            input.setAttribute('type', 'email');
                            console.log('Fixed email input type');
                        }
                    }
                }
            });
            
            // 6. Fix any missing alt attributes
            var images = document.querySelectorAll('img[alt=""]');
            images.forEach(function(img) {
                if (img.src.includes('logo')) {
                    img.setAttribute('alt', 'Lumo Logo');
                } else if (img.src.includes('icon')) {
                    img.setAttribute('alt', 'Icon');
                } else {
                    img.setAttribute('alt', 'Image');
                }
            });
            
            console.log('Universal missing properties fix completed successfully');
            
        } catch (error) {
            console.error('Error in universal properties fix:', error);
        }
    }
    
    // Run immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixMissingProperties);
    } else {
        fixMissingProperties();
    }
    
    // Also run after a short delay to catch any dynamically loaded content
    setTimeout(fixMissingProperties, 1000);
    
})();
