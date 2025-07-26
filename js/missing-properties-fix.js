// Fix missing meta properties that couldn't be added to minified HTML
(function() {
    try {
        // Add missing Open Graph image only if not already present
        if (!document.querySelector('meta[property="og:image"]')) {
            var ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            ogImage.setAttribute('content', '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png');
            document.head.appendChild(ogImage);
        }

        // Add missing Twitter image only if not already present
        if (!document.querySelector('meta[name="twitter:image"]')) {
            var twitterImage = document.createElement('meta');
            twitterImage.setAttribute('name', 'twitter:image');
            twitterImage.setAttribute('content', '/images/6605598db05fae46b2baa3f2_The%20simple%20spiral%403-1728x958%20(1)%202.png');
            document.head.appendChild(twitterImage);
        }

        // Add missing og:url only if not already present
        if (!document.querySelector('meta[property="og:url"]')) {
            var ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            ogUrl.setAttribute('content', window.location.href);
            document.head.appendChild(ogUrl);
        }

        // Fix forms missing action attribute
        var forms = document.querySelectorAll('form[method="get"]');
        forms.forEach(function(form) {
            if (!form.hasAttribute('action')) {
                form.setAttribute('action', '#');
            }
            form.setAttribute('method', 'post');
        });

        // Add required attributes to form fields marked with asterisk
        var requiredFields = document.querySelectorAll('.form-text.star');
        requiredFields.forEach(function(star) {
            var inputContainer = star.closest('.input');
            if (inputContainer) {
                var input = inputContainer.querySelector('input');
                if (input && !input.hasAttribute('required')) {
                    input.setAttribute('required', 'required');
                    // Fix email field type
                    if (input.name && input.name.toLowerCase().includes('mail')) {
                        input.setAttribute('type', 'email');
                    }
                }
            }
        });

        console.log('Missing properties fixed via JavaScript - all validations applied');
    } catch (error) {
        console.error('Error fixing missing properties:', error);
    }
})();
