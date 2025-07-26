// Fix para el elemento sc-heading - Coordinar fade-in con animación de Webflow
(function() {
    'use strict';
    
    function setupScHeadingAnimation() {
        const scHeading = document.querySelector('.sc-heading');
        if (!scHeading) return;
        
        // Agregar clase para control de CSS
        scHeading.classList.add('sc-heading-controlled');
        
        let animationStarted = false;
        let animationCompleted = false;
        
        // Función para analizar el progreso de la animación
        function analyzeAnimationProgress() {
            const style = scHeading.getAttribute('style') || '';
            
            // Detectar si la animación ha comenzado
            const hasTransform = style.includes('will-change: transform');
            const yPosition = style.match(/translate3d\(0px,\s*([^,]+)%/);
            const rotation = style.match(/rotateZ\(([^)]+)deg\)/);
            
            if (hasTransform && yPosition && rotation) {
                const yValue = parseFloat(yPosition[1]);
                const rotValue = parseFloat(rotation[1]);
                
                // Calcular progreso basado en los valores de la animación
                // yValue va de 140% a 0%, rotValue va de 10deg a 0deg
                const yProgress = Math.max(0, Math.min(1, (140 - yValue) / 140));
                const rotProgress = Math.max(0, Math.min(1, (10 - rotValue) / 10));
                const overallProgress = (yProgress + rotProgress) / 2;
                
                // Aplicar opacidad basada en el progreso
                if (overallProgress > 0) {
                    animationStarted = true;
                    // Fade in progresivo: de 0 a 1 según el progreso
                    const opacity = Math.min(1, overallProgress * 1.5); // Un poco más rápido el fade
                    scHeading.style.setProperty('opacity', opacity.toString(), 'important');
                }
                
                // Marcar como completado cuando llegue al final
                if (yValue <= 5 && rotValue <= 1) { // Prácticamente en posición final
                    animationCompleted = true;
                    scHeading.style.setProperty('opacity', '1', 'important');
                }
            } else if (animationStarted && !style.includes('will-change: transform')) {
                // La animación terminó, asegurar que esté visible
                animationCompleted = true;
                scHeading.style.setProperty('opacity', '1', 'important');
            }
        }
        
        // Observer para cambios en el estilo
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target === scHeading && mutation.attributeName === 'style') {
                    analyzeAnimationProgress();
                }
            });
        });
        
        observer.observe(scHeading, {
            attributes: true,
            attributeFilter: ['style']
        });
        
        // También verificar en scroll para estar seguro
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(analyzeAnimationProgress, 16);
        });
        
        // Verificación inicial
        analyzeAnimationProgress();
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupScHeadingAnimation);
    } else {
        setupScHeadingAnimation();
    }
    
    // También ejecutar después de Webflow
    setTimeout(setupScHeadingAnimation, 500);
    
})();
