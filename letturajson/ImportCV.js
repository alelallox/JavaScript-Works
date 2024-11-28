document.addEventListener("DOMContentLoaded", function () {
    const id = localStorage.getItem("id");

    if (!id) {
        alert("Errore: Nessun CV selezionato.");
        return;
    }

    const file = `https://raw.githubusercontent.com/alelallox/JavaScript-Works/main/letturajson/${id}.json`;

    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nel caricamento del file ${file}`);
            }
            return response.json();
        })
        .then(data => mostraCV(data))
        .catch(error => console.error("Errore:", error));
});

function mostraCV(data) {
    document.getElementById("intestazione").innerHTML = `
        <h1>${data.Nominativo}</h1>
        <h2>${data.Posizione}</h2>
    `;
    document.getElementById("contenutoCV").innerHTML = `
        <img src="https://raw.githubusercontent.com/alelallox/JavaScript-Works/main/letturajson/${data.Immagine}" alt="${data.Nominativo}" style="width:150px;">
        <p><strong>Esperienza:</strong> ${data.Esperienza}</p>
        <p><strong>Descrizione:</strong> ${data.Descrizione}</p>
    `;
}