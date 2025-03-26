const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb+srv://NuovoUtenteProva:passwordProva@cluster0.ah74a.mongodb.net/esempio?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connesso a MongoDB"))
    .catch((err) => console.log("Errore nella connessione a MongoDB", err));


const schema = new mongoose.Schema({
    name: String,
    age: Number
});
const User = mongoose.model('User', schema);

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="it">
            <head>
                <title>Inserisci testo</title>
                <style>
                    body { font-family: Arial; text-align: center; margin-top: 30px; }
                    input, button { padding: 10px; margin: 5px; border-radius: 8px; border: none}
                    #output { margin-top: 15px; }
                </style>
            </head>
            <body>
                <h1>Inserisci Dati</h1>
                <form action="/submit" method="POST">
                    <input type="text" name="name" placeholder="Inserisci il nome" required />
                    <input type="number" name="age" placeholder="Inserisci l'età" required />
                    <button type="submit">Salva</button>
                </form>
            </body>
        </html>
    `);
});

app.post('/submit', async (req, res) => {
    const { name, age } = req.body;
    try {
        const newUser = new User({ name, age });
        await newUser.save();
        res.send(`<h1>Utente ${name} inserito correttamente</h1>`);
    } catch (err) {
        console.error(err);
        res.send('<h1>Errore durante il salvataggio dei dati.</h1>');
    }
});

const port = 5001;
app.listen(port, () => {
    console.log(`Server attivo sulla porta ${port}...`);
});

process.on('SIGINT', async () => {
    console.log("Server in arresto...");
    await mongoose.disconnect();
    console.log("Connessione a MongoDB chiusa.");
    process.exit(0);  
});
