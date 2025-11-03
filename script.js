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


// --- [INÍCIO] SCRIPT NOVO ADICIONADO (CONTADOR) ---

// Função para formatar o número (adiciona um zero à esquerda se for menor que 10)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Função principal do contador
function startCountdown(deadline) {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return; // Não executa se o elemento não existir

    const targetDate = new Date(deadline).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return; // Para se os spans não existirem

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Se o tempo acabou
        if (distance < 0) {
            clearInterval(interval);
            // Atualiza a UI para mostrar que a oferta encerrou
            const timerContainer = document.querySelector('.countdown-timer');
            if (timerContainer) {
                timerContainer.innerHTML = "<p style='font-size: 1.2rem; color: var(--gold);'>OFERTA ENCERRADA</p>";
            }
            // Esconde o parágrafo "O Lote 2 termina em:"
            const countdownText = countdownElement.querySelector('p');
            if (countdownText) {
                countdownText.style.display = 'none';
            }
            return;
        }

        // Cálculos de tempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Atualiza o HTML
        daysEl.innerHTML = formatTime(days);
        hoursEl.innerHTML = formatTime(hours);
        minutesEl.innerHTML = formatTime(minutes);
        secondsEl.innerHTML = formatTime(seconds);

    }, 1000);
}

// Inicia o contador e o FAQ quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    
    // Bloco do contador (existente)
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        const deadline = countdownElement.getAttribute('data-deadline');
        if (deadline) {
            startCountdown(deadline);
        }
    }

    // --- [INÍCIO] SCRIPT NOVO FAQ ACCORDION (SUTIL) ---
    const allFaqQuestions = document.querySelectorAll('.faq-question');
    
    allFaqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement; // O .faq-item
            const answer = question.nextElementSibling; // O .faq-answer
            
            // Verifica se o item clicado já está ativo
            const isAlreadyActive = item.classList.contains('active');

            // 1. Fecha todos os itens abertos
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
                activeItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // 2. Se o item clicado não era o que estava ativo, abra-o
            if (!isAlreadyActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
            // Se ele *era* o ativo, ele já foi fechado pelo loop acima e permanecerá fechado.
        });
    });
    // --- [FIM] SCRIPT NOVO FAQ ACCORDION ---
});
// --- [FIM] SCRIPT NOVO ADICIONADO ---