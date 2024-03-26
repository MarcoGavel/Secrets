// Importa il modulo express e assegnalo a una variabile chiamata 'express'
import express from "express";

// Importa il modulo bodyParser per analizzare i dati inviati dalle richieste HTTP
import bodyParser from "body-parser";

// Importa la funzione 'dirname' dal modulo 'path' per ottenere il nome della directory del file corrente
import { dirname } from "path";

// Importa la funzione 'fileURLToPath' dal modulo 'url' per convertire un URL in un percorso del file corrispondente
import { fileURLToPath } from "url";

// Ottiene il percorso della directory corrente utilizzando le funzioni 'dirname' e 'fileURLToPath'
const __dirname = dirname(fileURLToPath(import.meta.url));

// Crea un'applicazione Express
const app = express();

// Definisce la porta su cui l'applicazione ascolterà le richieste HTTP
const port = 3000;

// Variabile per memorizzare lo stato di autorizzazione dell'utente
var userIsAuthorised = false;

// Usa il middleware bodyParser per analizzare i dati delle richieste con formato URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware per verificare la password inviata nelle richieste POST
function passwordCheck(req, res, next) {
  // Ottiene la password inviata dalla richiesta
  const password = req.body["password"];

  // Verifica se la password inviata è corretta
  if (password === "ILoveProgramming") {
    // Se la password è corretta, imposta lo stato di autorizzazione a true
    userIsAuthorised = true;
  }

  // Passa al middleware successivo
  next();
}

// Utilizza il middleware 'passwordCheck' per tutte le richieste
app.use(passwordCheck);

// Gestisce le richieste GET all'endpoint principale "/"
app.get("/", (req, res) => {
  // Invia il file HTML dell'indice come risposta
  res.sendFile(__dirname + "/public/index.html");
});

// Gestisce le richieste POST all'endpoint "/check"
app.post("/check", (req, res) => {
  // Verifica lo stato di autorizzazione dell'utente
  if (userIsAuthorised) {
    // Se l'utente è autorizzato, invia il file HTML segreto come risposta
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // Se l'utente non è autorizzato, reindirizza alla homepage
    res.sendFile(__dirname + "/public/index.html");
    // Oppure utilizza il reindirizzamento tramite res.redirect("/");
  }
});

// Avvia il server Express per ascoltare le richieste sulla porta specificata
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
