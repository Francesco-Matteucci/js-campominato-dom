/* DESCRIZIONE DEL GIOCO
Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. La cella si colora di rosso e la partita termina. Altrimenti, la cella cliccata si colora di azzurro e l'utente può continuare  a cliccare sulle altre celle.
LA partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita, il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba
# MILESTONE 1
Prepariamo "Qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo, perchè in quel caso la partita termina. Raccogliamo quindi il punteggio e scriviamo un messaggio appropriato.
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o seperchè l'utente ha raggiunto il punteggio massimo(ossia ha vinto). Dobbiamo poi in ogni caso stampare lin pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
# BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà (come le istruzioni di ieri se non già fatto)
# SUPERBONUS
Colorare tutte le celle bomba quando la partita finisce
Consigli del giorno
approcciate l'esercizio con serenità, e cercate di divertirvi!
Cercate di commentare e usare i console.log il più possibile
Fatevi sempre delle domande: sto ripetendo del codice? Questa funzione fa troppe cose? Il nome ha senso rispetto a quello che fa?
Buon divertimento e a domani! */






// Recupero gli elementi dal DOM
const gridContainer = document.querySelector('.grid-container');
const playButton = document.querySelector('button');
const stageSelect = document.getElementById('stage');
//Recupero il nuovo elemento dal DOM, score
const scoreDisplay = document.getElementById('score');


// Creo una variabile per inizializzare lo score
let score = 0;

//Creo un array per memorizzare le bombe
let bombs = [];

//Creo una variabile per il punteggio massimo
let maxScore = 0;

// Creo una funzione per aggiornare lo score dell'utente
const updateScore = () => {
    score++;
    scoreDisplay.textContent = `Punteggio: ${score}`;

    // Controllo se l'utente ha raggiunto il punteggio massimo
    if (score === maxScore) {
        alert('Hai vinto! Punteggio massimo raggiunto: ' + score);
        gridContainer.querySelectorAll('.cell').forEach(cell => cell.classList.add('clicked'));
    }
};

// Creo una funzione per generare un numero casuale di bombe, da 1 a 16
const generateBombs = (max, count) => {
    const bombs = [];
    while (bombs.length < count) {
        const bomb = Math.floor(Math.random() * max) + 1;
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
};
// Funzione per creare la griglia
const createGrid = () => {

    // Faccio un reset del punteggio a ogni nuova partita
    score = 0;
    scoreDisplay.textContent = `Punteggio: ${score}`;


    // Rimuovo eventuali classi di griglia precedenti
    gridContainer.classList.remove('cell-10', 'cell-9', 'cell-7');

    // Rimuovo tutto le celle esistenti, prima della creazione di una nuova griglia
    gridContainer.innerHTML = '';

    // Creo la variabile per recuperare il livello di stage selezionato dall'utente
    const stage = stageSelect.value;

    let cellCount;
    let cellClass;

    // Determino il numero di celle e righe in base allo stage
    switch (stage) {
        case 'easy':
            cellCount = 100;
            cellClass = 'cell-10';
            break;
        case 'medium':
            cellCount = 81;
            cellClass = 'cell-9';
            break;
        case 'hard':
            cellCount = 49;
            cellClass = 'cell-7';
            break;
        default:
            cellCount = 100;
            cellClass = 'cell-10';
            alert('Stage non valido, non barare (!!) ed utilizza lo stage Facile, Medio o Difficile.');
            return;
    }

    // Calcolo il punteggio massimo possibile
    maxScore = cellCount - 16;

    // Creo una costante per le 16 bombe
    const bombs = generateBombs(cellCount, 16);

    // Stampo le bombe generate in console per un controllo
    console.log('Bombe generate:', bombs);

    // Aggiungo la classe dello stage appropriato
    gridContainer.classList.add(cellClass);

    // Creo le celle
    for (let i = 1; i <= cellCount; i++) {
        // Creo un elemento per la cella
        const cell = document.createElement('div');
        cell.classList.add('cell');
        // Aggiungo il numero alle celle
        cell.textContent = i;

        // Aggiungo l'event listener alla cella
        cell.addEventListener('click', function () {
            // Controllo se la cella è già stata cliccata
            if (!cell.classList.contains('clicked')) {
                // se la cella contiene una bomba..
                if (bombs.includes(i)) {

                    //coloro la cella di rosso
                    cell.classList.add('bomb');

                    //eseguo un console log e mostro un alert di fine partita
                    console.log(`Hai calpestato una bomba! Partita terminata.`);
                    alert('Hai calpestato una bomba! Punteggio finale: ' + score);

                    // Blocco la possibilità all'utente di cliccare su altre celle
                    gridContainer.querySelectorAll('.cell').forEach(cell => cell.classList.add('clicked'));
                } else {
                    // Se invece non è cliccata, la coloro di azzurro e aggiorno il punteggio
                    cell.classList.add('clicked');
                    updateScore();
                    console.log(`Cella cliccata: ${i}`);
                }
            }
        });
        // Aggiungo la cella alla griglia
        gridContainer.appendChild(cell);
    }
};

// Aggiungo l'event listener al bottone
playButton.addEventListener('click', createGrid);
