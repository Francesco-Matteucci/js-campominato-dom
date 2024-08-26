// Recupero gli elementi dal DOM
const gridContainer = document.querySelector('.grid-container');
const playButton = document.querySelector('button');
const stageSelect = document.getElementById('stage');

// Funzione per creare la griglia
const createGrid = () => {
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

    // Aggiungo la classe dello stage appropriato
    gridContainer.classList.add(cellClass);

    // Creo le celle
    for (let i = 1; i <= cellCount; i++) {
        // Creo un elemento per la cella
        const cell = document.createElement('div');
        cell.classList.add('cell');
        // Aggiungo il numero alle celle
        cell.textContent = i;
        // Stampo tutti i numeri della cella per un controllo
        console.log('Cella numero: ', i);

        // Aggiungo l'event listener alla cella
        cell.addEventListener('click', function () {
            // Gestisco la classe per colorare la cella al click, aggiungo o rimuovo
            cell.classList.add('clicked');
            // Stampo il numero della cella come risultato in console
            console.log(`Cella cliccata: ${i}`);
        });

        // Aggiungo la cella alla griglia
        gridContainer.appendChild(cell);
    }
};

// Aggiungo l'event listener al bottone
playButton.addEventListener('click', createGrid);
