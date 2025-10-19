window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    // Tempo que o loader fica na tela (2500ms = 2.5 segundos)
    setTimeout(() => {
        if (loader) {
            loader.classList.add('fade-out');
            
            // Remove o loader do HTML após a animação de fade-out
            setTimeout(() => {
                if (loader) loader.remove();
            }, 400); // 400ms = tempo da transição de opacidade no CSS
        }
    }, 2500); 
});