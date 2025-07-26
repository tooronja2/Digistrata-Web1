// Fix para el elemento sc-heading que aparece antes de tiempo
(function() {
    'use strict';
    
    function fixScHeading() {
        const scHeading = document.querySelector('.sc-heading');
        
        if (!scHeading) return;
        
        // Función para verificar si el elemento debe estar visible
        function shouldBeVisible() {
            const rect = scHeading.getBoundingClientRect();
            const parentSection = scHeading.closest('.sticky-discover, .sc-content');
            
            if (!parentSection) return false;
            
            const parentRect = parentSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // El elemento debe estar visible cuando su sección padre esté en cierta posición
            return parentRect.top <= viewportHeight * 0.7;
        }
        
        // Función para manejar la visibilidad
        function handleVisibility() {
            const element = document.querySelector('.sc-heading');
            if (!element) return;
            
            const style = element.getAttribute('style') || '';
            
            // Si tiene estilos problemáticos de transform inline
            if (style.includes('will-change: transform') && style.includes('translate3d(0px, 0%, 0px)')) {
                if (shouldBeVisible()) {
                    // Permitir que se vea y limpiar will-change
                    element.style.willChange = 'auto';
                } else {
                    // Ocultarlo hasta que sea su momento
                    element.style.opacity = '0';
                    element.style.visibility = 'hidden';
                }
            } else if (shouldBeVisible()) {
                // Restaurar visibilidad cuando sea su momento
                element.style.opacity = '';
                element.style.visibility = '';
            }
        }
        
        // Observar cambios en los estilos
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList.contains('sc-heading') && 
                    mutation.attributeName === 'style') {
                    setTimeout(handleVisibility, 50);
                }
            });
        });
        
        // Observar el elemento sc-heading
        observer.observe(scHeading, {
            attributes: true,
            attributeFilter: ['style']
        });
        
        // También observar en scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleVisibility, 16);
        });
        
        // Verificación inicial
        handleVisibility();
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixScHeading);
    } else {
        fixScHeading();
    }
    
    // También ejecutar después de que Webflow se haya inicializado
    setTimeout(fixScHeading, 1000);
    
})();
