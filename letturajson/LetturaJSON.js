function caricaDati() {
    var file = new XMLHttpRequest();
    file.open("GET", "https://raw.githubusercontent.com/alelallox/JavaScript-Works/main/letturajson/Anagrafica.json", true);
    file.send();
    file.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonDoc = JSON.parse(file.responseText);
            mostraInfo(jsonDoc);
        }
    };
    document.getElementById("formIngr").style.width = "0px";
    document.getElementById("formIngr").style.visibility = "hidden";
    document.getElementById("risForm").style.visibility = "visible";
}

function mostraInfo(ogg) {
    var tabella = document.createElement("table");
    var colonnaIndici = ["Immagine", "Nome", "Cognome", "Età", "Indirizzo", "Città", "Telefono 1", "Telefono 2", "Sport 1", "Sport 2"];
    var colonnaTit = document.createElement("tr");

    // Aggiunta dell'intestazione della tabella
    for (let i = 0; i < colonnaIndici.length; i++) {
        var righe = document.createElement("th");
        righe.appendChild(document.createTextNode(colonnaIndici[i]));
        colonnaTit.appendChild(righe);
    }
    tabella.appendChild(colonnaTit);

    // Ciclo per aggiungere i dati
    ogg.Anagrafica.forEach(persona => {
        var colonna = document.createElement("tr");

        // Crea l'immagine come bottone
        let imgCell = document.createElement("td");
        let img = document.createElement("img");
        img.src = persona.Immagine ? `https://raw.githubusercontent.com/alelallox/JavaScript-Works/main/letturajson/${persona.Immagine}` : "";
        img.classList.add("immagineProfilo");
        img.addEventListener("click", function () {
            localStorage.setItem("id", persona.id);
            window.location.href = "Cv.html";
        });
        imgCell.appendChild(img);
        colonna.appendChild(imgCell);

        // Aggiunge i dati delle altre colonne
        ["Nome", "Cognome", "Eta", "Indirizzo", "Citta"].forEach(campo => {
            let cell = document.createElement("td");
            cell.appendChild(document.createTextNode(persona[campo]));
            colonna.appendChild(cell);
        });

        // Telefoni
        colonna.appendChild(createCell(persona.Telefoni[0]?.Telefono1));
        colonna.appendChild(createCell(persona.Telefoni[1]?.Telefono2));

        // Sport
        colonna.appendChild(createCell(persona.Sport[0]?.Sport1));
        colonna.appendChild(createCell(persona.Sport[1]?.Sport2));

        tabella.appendChild(colonna);
    });

    document.getElementById("stringaJSON").appendChild(tabella);
}

// Funzione di utilità per creare celle con testo
function createCell(content) {
    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(content || ""));
    return cell;
}
