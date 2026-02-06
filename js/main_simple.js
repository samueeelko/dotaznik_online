// ========================================
// SIMPLE.JS - Logika pre jednoduchú verziu
// ========================================

console.log("🚀 Jednoduchá verzia dotazníka");

// ----------------------------------------
// INICIALIZÁCIA
// ----------------------------------------

// Vygeneruj otázky hneď po načítaní
generateQuestions();

// ----------------------------------------
// POPUP MODAL
// ----------------------------------------

const modal = document.getElementById("resultsModal");
const closeBtn = document.querySelector(".close");

// Zatvor modal na kliknutie na X
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Zatvor modal na kliknutie mimo obsahu
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Zatvor modal na ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modal.style.display = "none";
    }
});

// ----------------------------------------
// VYHODNOTENIE A ZOBRAZENIE VÝSLEDKOV
// ----------------------------------------

document.getElementById('evaluateBtn').addEventListener('click', function() {
    console.log("🎯 Zobrazujem výsledky...");

    // Vyhodnoť odpovede (funkcia z questions.js)
    const scores = evaluateAnswers();

    // Ak sú nevyplnené otázky, skonči
    if (!scores) {
        return;
    }

    // Vytvor HTML s výsledkami (funkcia z questions.js)
    const resultsHTML = createResultsHTML(scores);

    // Vlož výsledky do modalu
    document.getElementById('resultsContainer').innerHTML = resultsHTML;

    // Zobraz modal
    modal.style.display = "block";

    // Animácia progress barov
    setTimeout(() => {
        document.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.transition = 'width 1s ease-out';
        });
    }, 100);
});

console.log("✅ Jednoduchá verzia inicializovaná");