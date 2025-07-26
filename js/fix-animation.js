// Fix para elementos con animaciones problemáticas de Webflow
(function() {
    'use strict';
    
    // Función para limpiar estilos problemáticos
    function cleanupAnimationStyles() {
        const problematicElements = document.querySelectorAll('.sc-heading[style*="will-change: transform"]');
        
        problematicElements.forEach(element => {
            const style = element.getAttribute('style') || '';
            
            // Verificar si el elemento está en su estado final/neutro
            const isInNeutralState = style.includes('translate3d(0px, 0%, 0px)') &&
                                   style.includes('scale3d(1, 1, 1)') &&
                                   style.includes('rotateZ(0deg)');
            
            if (isInNeutralState) {
                // Crear un nuevo estilo sin will-change
                const newStyle = style.replace(/will-change:\s*transform;?\s*/gi, '');
                
                // Solo aplicar si realmente hay un cambio
                if (newStyle !== style) {
                    element.setAttribute('style', newStyle);
                    console.log('Limpieza de will-change aplicada a:', element);
                }
            }
        });
    }
    
    // Función para observar cambios en los elementos
    function setupObserver() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    // Pequeño delay para permitir que Webflow termine su animación
                    setTimeout(cleanupAnimationStyles, 100);
                }
            });
        });
        
        // Observar cambios en todo el documento
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style'],
            subtree: true
        });
    }
    
    // Función para limpiar al hacer scroll (respaldo)
    function setupScrollCleanup() {
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(cleanupAnimationStyles, 300);
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setupObserver();
            setupScrollCleanup();
            // Limpieza inicial
            setTimeout(cleanupAnimationStyles, 1000);
        });
    } else {
        setupObserver();
        setupScrollCleanup();
        // Limpieza inicial
        setTimeout(cleanupAnimationStyles, 1000);
    }
    
})();
