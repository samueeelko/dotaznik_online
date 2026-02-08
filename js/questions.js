
const QUESTIONS = [
    { cat: "A", text: "Najviac ma povzbudí, keď niekto jasne pomenuje, čo som urobil dobre." },
    { cat: "A", text: "Potrebujem počuť uznanie nahlas, nie iba „cítiť rešpekt“." },
    { cat: "A", text: "Motivačne na mňa pôsobí, keď mi vedúci vyjadrí dôveru slovami." },
    { cat: "A", text: "Aj krátke „dobrá práca“ mi dokáže zlepšiť deň." },
    { cat: "A", text: "Ak po náročnej úlohe nedostanem spätnú väzbu, moja motivácia klesá." },

    { cat: "B", text: "Veľmi si cením, keď si na mňa kolega alebo vedúci nájde čas na rozhovor." },
    { cat: "B", text: "Cítim sa motivovaný, keď sa ma niekto úprimne pýta na môj názor." },
    { cat: "B", text: "Spoločné plánovanie alebo brainstorming mi dodáva energiu." },
    { cat: "B", text: "Osobné stretnutie má pre mňa väčší význam než krátka správa či email." },
    { cat: "B", text: "Keď mám priestor byť vypočutý, pracujem s väčším nasadením." },

    { cat: "C", text: "Najviac si vážim, keď mi niekto pomôže v období veľkého pracovného náporu." },
    { cat: "C", text: "Praktická pomoc je pre mňa silnejším prejavom uznania než pochvala." },
    { cat: "C", text: "Keď kolega preberie časť zodpovednosti, cítim sa ocenený." },
    { cat: "C", text: "Pomoc pri riešení problému vnímam ako prejav rešpektu." },
    { cat: "C", text: "Najväčšou formou uznania je pre mňa konkrétny čin." },

    { cat: "D", text: "Symbolické drobnosti (káva, maličký darček, poukaz) si veľmi cením." },
    { cat: "D", text: "Keď mi niekto prinesie maličkosť ako poďakovanie, cítim uznanie." },
    { cat: "D", text: "Prekvapenie alebo malá odmena ma motivuje pokračovať vo výkone." },
    { cat: "D", text: "Praktické benefity alebo vecné odmeny majú u mňa veľký význam." },
    { cat: "D", text: "Radšej dostanem maličkú pozornosť než dlhé slovné uznanie." },

    { cat: "E", text: "Podanie ruky, potľapkanie po pleci či priateľské gesto vo mne vyvoláva pocit podpory." },
    { cat: "E", text: "Keď niekto prejaví uznanie aj prostredníctvom fyzického kontaktu, pôsobí to na mňa povzbudivo." },
    { cat: "E", text: "Objatie (vo vhodnej situácii a so súhlasom) vnímam ako silný prejav blízkosti a rešpektu." },
    { cat: "E", text: "Fyzické gesto spolupatričnosti mi dodáva energiu viac než formálne slová." },
    { cat: "E", text: "Ľudský dotyk pre mňa predstavuje autentické a úprimné ocenenie." }
];




//shuflle na otazky
function shuffle(array){
    let currentIndex = array.length;

    while (currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex],array[randomIndex]] = [array[randomIndex],array[currentIndex]];
    }
}


function showQuestionnaire() {
    document.getElementById("questionnaireSection").style.display = "block";
    document.getElementById("questionsSection").style.display = "none";
    generateQuestions()
}

function generateQuestions(){

    const questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = ""; // cleanup starych otazok

    const template = document.getElementById("questionTemplate");
    shuffle(QUESTIONS);

    QUESTIONS.forEach((question, index) => {
        const clone = template.content.cloneNode(true);

        const label = clone.querySelector("label");
        const select = clone.querySelector("select");

        const questionIndex = `q${index + 1}`;
        label.innerText = question.text;
        label.htmlFor = questionIndex;
        select.id = questionIndex;
        select.name = questionIndex;
        select.dataset.cat = question.cat;

        questionsDiv.appendChild(clone);
    })
}

let unanswered = 0;

function evaluateAnswers(){
    const scores = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0
    }


    QUESTIONS.forEach((question, index) => {
        const select = document.getElementById(`q${index + 1}`);
        const value = parseInt(select.value)

        //console.log(`Otazka na indexe ${index} ma value: ${value} a kategoriu ${select.dataset.cat}`);
        if (!isNaN(value) && value > 0) {
            scores[select.dataset.cat] += value;
        }else{
            unanswered++;
        }


    })

    if (unanswered > 0){
        alert(`Prosím, vyplňte všetky odpovede, ostávajú: ${unanswered}`);
        unanswered = 0;
        return null;
    }

    return scores;
}


//
// function createResultsHTML(scores) {
//     const sortedScores = Object.entries(scores).sort((a,b) => b[1] - a[1])
//
//
//     //kontrola sorted
//     console.log(sortedScores);
//
//     const categoryNames = {
//         A: "Slová uznania",
//         B: "Kvalitný čas",
//         C: "Činy služby",
//         D: "Dary",
//         E: "Fyzický dotyk"
//     };
//
//     let html = "<h2>Tvoje výsledky:</h2>";
//     sortedScores.forEach(([cat, score]) => {
//         html += `<p><strong>${categoryNames[cat]}:</strong> ${score} bodov</p>`;
//     });
//
//     html += `<p style="margin-top: 20px; font-weight: bold;">
//         Tvoj primárny jazyk uznania je: ${categoryNames[sortedScores[0][0]]}
//     </p>`;
//
//     return html;
// }

function createResultsHTML(scores) {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const categoryNames = {
        A: "Slová uznania",
        B: "Kvalitný čas",
        C: "Činy služby",
        D: "Dary",
        E: "Fyzický dotyk"
    };

    let html = "<h2>Tvoje výsledky:</h2>";

    sortedScores.forEach(([cat, score]) => {
        html += `<p><strong>${categoryNames[cat]}:</strong> ${score} bodov</p>`;
    });

    // 🔥 nájdi max skóre a všetky kategórie, ktoré ho majú
    const maxScore = sortedScores[0][1];
    const topCats = sortedScores
        .filter(([_, score]) => score === maxScore)
        .map(([cat]) => categoryNames[cat]);

    // text pre "primarny"
    const primaryText =
        topCats.length === 1
            ? `Tvoj primárny jazyk uznania je: ${topCats[0]}`
            : `Tvoje primárne jazyky uznania sú: ${topCats.join(", ")}`;

    html += `<p style="margin-top: 20px; font-weight: bold;">${primaryText}</p>`;

    return html;
}

function setupQuestionListener(){
    document.getElementById("resultButton").addEventListener('click', evaluateQuestions);
}



