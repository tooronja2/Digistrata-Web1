/*
 * Webflow Properties Extension
 * Auto-loads missing properties fix on all pages
 */

// Immediately execute when script loads
(function() {
    'use strict';
    
    // Function to inject missing properties
    function injectMissingProperties() {
        console.log('Webflow Properties Extension: Starting...');
        
        try {
            // 1. Add missing Open Graph image
            if (!document.querySelector('meta[property="og:image"]')) {
                var ogImage = document.createElement('meta');
                ogImage.setAttribute('property', 'og:image');
                ogImage.setAttribute('content', 'https://' + window.location.host + '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png');
                document.head.appendChild(ogImage);
                console.log('✓ Added og:image');
            }
            
            // 2. Add missing Twitter image
            if (!document.querySelector('meta[name="twitter:image"]')) {
                var twitterImage = document.createElement('meta');
                twitterImage.setAttribute('name', 'twitter:image');
                twitterImage.setAttribute('content', 'https://' + window.location.host + '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png');
                document.head.appendChild(twitterImage);
                console.log('✓ Added twitter:image');
            }
            
            // 3. Add missing og:url
            if (!document.querySelector('meta[property="og:url"]')) {
                var ogUrl = document.createElement('meta');
                ogUrl.setAttribute('property', 'og:url');
                ogUrl.setAttribute('content', window.location.href);
                document.head.appendChild(ogUrl);
                console.log('✓ Added og:url');
            }
            
            // 4. Add theme color for mobile
            if (!document.querySelector('meta[name="theme-color"]')) {
                var themeColor = document.createElement('meta');
                themeColor.setAttribute('name', 'theme-color');
                themeColor.setAttribute('content', '#000000');
                document.head.appendChild(themeColor);
                console.log('✓ Added theme-color');
            }
            
        } catch (error) {
            console.error('Error injecting meta properties:', error);
        }
    }
    
    // Function to fix form validation
    function fixFormValidation() {
        try {
            // Fix forms missing action attribute
            var forms = document.querySelectorAll('form[method="get"], form:not([action])');
            forms.forEach(function(form) {
                if (!form.hasAttribute('action')) {
                    form.setAttribute('action', '#');
                }
                if (form.getAttribute('method') === 'get') {
                    form.setAttribute('method', 'post');
                }
                console.log('✓ Fixed form validation');
            });
            
            // Add required attributes to form fields with asterisk
            var starFields = document.querySelectorAll('.form-text.star');
            starFields.forEach(function(star) {
                var input = star.closest('.input')?.querySelector('input');
                if (input && !input.hasAttribute('required')) {
                    input.setAttribute('required', 'required');
                    // Fix email field type
                    if (input.name && input.name.toLowerCase().includes('mail')) {
                        input.setAttribute('type', 'email');
                    }
                    console.log('✓ Added required attribute to:', input.name || input.id);
                }
            });
            
        } catch (error) {
            console.error('Error fixing form validation:', error);
        }
    }
    
    // Function to fix missing alt attributes
    function fixAltAttributes() {
        try {
            var images = document.querySelectorAll('img[alt=""], img:not([alt])');
            images.forEach(function(img) {
                if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
                    if (img.src.includes('logo')) {
                        img.setAttribute('alt', 'Lumo Logo');
                    } else if (img.src.includes('icon')) {
                        img.setAttribute('alt', 'Icon');
                    } else {
                        img.setAttribute('alt', 'Image');
                    }
                    console.log('✓ Fixed alt attribute');
                }
            });
        } catch (error) {
            console.error('Error fixing alt attributes:', error);
        }
    }
    
    // Main execution function
    function executeAllFixes() {
        injectMissingProperties();
        fixFormValidation();
        fixAltAttributes();
        console.log('Webflow Properties Extension: All fixes applied');
    }
    
    // Execute immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', executeAllFixes);
    } else {
        executeAllFixes();
    }
    
    // Also execute after Webflow is fully loaded
    if (window.Webflow) {
        window.Webflow.push(executeAllFixes);
    } else {
        // Fallback: execute after a delay
        setTimeout(executeAllFixes, 500);
    }
    
})();
