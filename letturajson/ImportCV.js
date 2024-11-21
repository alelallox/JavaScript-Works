let indiceCV = localStorage.getItem("id"); caricaDatiCV(indiceCV);

function caricaDatiCV(indice) {
    var file = new XMLHttpRequest();
    let nameFile = "https://github.com/alelallox/JavaScript-Works/blob/main/letturajson/" + indice + ".json";
    file.open("GET", nameFile, true);
    file.send();
    file.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonDoc = JSON.parse(file.responseText);
            mostraInfoCV(jsonDoc, indice);
        }
    };
}

function mostraInfoCV(ogg, indice) {
    console.log(indice);
    let nominativoTit = document.createElement("h2"), posizioniTit = document.createElement("h2"), esperienzaTit = document.createElement("h2"), descrizioneTit = document.createElement("h2"), nominativo = document.createElement("h1"), posizioni = document.createElement("p"), esperienza = document.createElement("p"), descrizione = document.createElement("p"), immagine = document.createElement("img");

    immagine.src = ogg.Immagine === undefined ? "" : ogg.Immagine;

    nominativoTit.appendChild(document.createTextNode("Nominativo"));
    nominativo.appendChild(document.createTextNode(ogg.Nominativo));
    posizioniTit.appendChild(document.createTextNode("Posizioni"));
    posizioni.appendChild(document.createTextNode(ogg.Posizione));
    esperienzaTit.appendChild(document.createTextNode("Esperienza"));
    esperienza.appendChild(document.createTextNode(ogg.Esperienza));
    descrizioneTit.appendChild(document.createTextNode("Descrizione"));
    descrizione.appendChild(document.createTextNode(ogg.Descrizione));

    document.getElementById("intestazione").appendChild(immagine);
    document.getElementById("intestazione").appendChild(nominativo);
    document.getElementById("contenutoCV").appendChild(posizioniTit);
    document.getElementById("contenutoCV").appendChild(posizioni);
    document.getElementById("contenutoCV").appendChild(esperienzaTit);
    document.getElementById("contenutoCV").appendChild(esperienza);
    document.getElementById("contenutoCV").appendChild(descrizioneTit);
    document.getElementById("contenutoCV").appendChild(descrizione);
}
