// Comprehensive meta tag injection for missing properties
(function() {
    'use strict';
    
    // Configuration
    const config = {
        defaultImage: '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png',
        siteName: 'Lumo - Digital Agency',
        themeColor: '#000000'
    };
    
    // Function to add meta tag if it doesn't exist
    function addMetaTag(type, property, content) {
        const selector = type === 'property' ? `meta[property="${property}"]` : `meta[name="${property}"]`;
        
        if (!document.querySelector(selector)) {
            const meta = document.createElement('meta');
            meta.setAttribute(type, property);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
            return true;
        }
        return false;
    }
    
    // Add all missing meta properties
    function injectAllMetaProperties() {
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        const currentUrl = window.location.href;
        const imageUrl = `${baseUrl}${config.defaultImage}`;
        
        let addedCount = 0;
        
        // Open Graph properties
        if (addMetaTag('property', 'og:image', imageUrl)) addedCount++;
        if (addMetaTag('property', 'og:url', currentUrl)) addedCount++;
        if (addMetaTag('property', 'og:site_name', config.siteName)) addedCount++;
        
        // Twitter Card properties
        if (addMetaTag('name', 'twitter:image', imageUrl)) addedCount++;
        if (addMetaTag('name', 'twitter:site', '@lumo')) addedCount++;
        
        // Mobile/PWA properties
        if (addMetaTag('name', 'theme-color', config.themeColor)) addedCount++;
        if (addMetaTag('name', 'msapplication-TileColor', config.themeColor)) addedCount++;
        
        // Additional SEO properties
        if (addMetaTag('name', 'robots', 'index,follow')) addedCount++;
        if (addMetaTag('name', 'googlebot', 'index,follow')) addedCount++;
        
        console.log(`Meta injection: Added ${addedCount} missing properties`);
        return addedCount;
    }
    
    // Fix form validation issues
    function fixFormValidation() {
        let fixedCount = 0;
        
        // Fix forms missing action
        document.querySelectorAll('form').forEach(form => {
            if (!form.hasAttribute('action')) {
                form.setAttribute('action', '#');
                fixedCount++;
            }
            if (form.getAttribute('method') === 'get') {
                form.setAttribute('method', 'post');
                fixedCount++;
            }
        });
        
        // Fix required fields
        document.querySelectorAll('.form-text.star').forEach(star => {
            const input = star.closest('.input')?.querySelector('input');
            if (input && !input.hasAttribute('required')) {
                input.setAttribute('required', 'required');
                if (input.name && input.name.toLowerCase().includes('mail')) {
                    input.setAttribute('type', 'email');
                }
                fixedCount++;
            }
        });
        
        console.log(`Form validation: Fixed ${fixedCount} issues`);
        return fixedCount;
    }
    
    // Fix missing alt attributes
    function fixAltAttributes() {
        let fixedCount = 0;
        
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
                if (img.src.includes('logo')) {
                    img.setAttribute('alt', 'Lumo Logo');
                } else if (img.src.includes('icon')) {
                    img.setAttribute('alt', 'Icon');
                } else {
                    img.setAttribute('alt', 'Image');
                }
                fixedCount++;
            }
        });
        
        console.log(`Alt attributes: Fixed ${fixedCount} images`);
        return fixedCount;
    }
    
    // Main execution function
    function executeAllFixes() {
        try {
            const metaCount = injectAllMetaProperties();
            const formCount = fixFormValidation();
            const altCount = fixAltAttributes();
            
            console.log(`✅ Missing Properties Fix Complete: ${metaCount + formCount + altCount} total fixes applied`);
        } catch (error) {
            console.error('❌ Error in missing properties fix:', error);
        }
    }
    
    // Execute when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', executeAllFixes);
    } else {
        executeAllFixes();
    }
    
})();
