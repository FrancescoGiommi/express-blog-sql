//! Giorno 1

/* Esercizio

Creiamo il nostro blog personale e giorno dopo giorno lo potremo arricchire 
con nuove funzionalità sulla base di quello che impareremo.

Creiamo il progetto base con una rotta / che ritorna un testo semplice con scritto ”Server del mio blog”

Creiamo un array dove inserire una lista di almeno 5 post, 
per ognuno indicare titolo, contenuto, immagine e tags (tags è un array di stringhe)

Creiamo poi una rotta /bacheca che restituisca un oggetto json con la lista dei post e il conteggio, 
partendo da un array.

Configuriamo gli asset statici sull’applicazione in modo che si possano 
visualizzare le immagini associate ad ogni post.

Testare le chiamate su Postman! */

//! Giorno 2

/* Esercizio

Usando l'array dei post fornito con le relative immagini, creare un file di routing (routers/posts.js) 
che conterrà le rotte necessario per l'entità post.

All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)

Tutte le risposte saranno dei testi che confermeranno l’operazione che il server deve eseguire, 
secondo le convenzioni REST.Ad esempio:

Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;

Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”
e via dicendo…

Registrare il router dentro app.js con il prefisso posts/.

Bonus

Provare a restituire la lista dei post dalla rotta index, in formato json

Provare a restituire un singolo post dalla rotta show, sempre in formato json */

//! Giorno 3

/* Milestone 1
Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.

All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica 
delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).

Poi torniamo sul file delle rotte. 
Qui importiamo le funzioni dichiarate nel controller e 
le associamo alle varie rotte, come visto in classe.

Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.
Se tutto funziona, passiamo alla prossima milestone

Milestone 2

Per iniziare, creiamo una cartella data in cui creare un file che contenga ed esporti l’array
 di posts che trovate in allegato. 
 
 Importiamo questo file in cima al controller.

Ora passiamo ad implementare le logiche delle nostre CRUD:

    Index dovrà restituire la lista dei post in formato JSON
    Show dovrà restituire un singolo post in formato JSON
    Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.

Bonus

    Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
    In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON. */

//! Giorno 4

/* Milestone 1

Per iniziare, andiamo su Postman e prepariamo una nuova chiamata verso la nostra rotta store.

    Impostiamo il verbo e l’endpoint corretti
    Selezioniamo il tab body e scegliamo il formato raw e JSON
    Inseriamo come corpo della nostra request un oggetto che rappresenti un nuovo post

Nota: se vogliamo avere delle immagini, inventiamole pure.

Nota: ricordiamo che non bisogna passare l’id quando si crea una nuova risorsa: 
sarà il server (con l’aiuto del database) a fornirlo.

Milestone 2

Impostiamo il body-parser per far sì che la nostra app riesca a decifrare il request body.

Poi, all’interno della rotta Store, stampiamo nel terminale i dati in arrivo, grazie a un console.log

Milestone 3

Implementiamo quindi la logica per aggiungere un nuovo post al nostro blog, e prepariamo la risposta adeguata.

Testiamolo con postman.

Milestone 4
Ripetiamo il procedimento per la rotta di Update, in modo da avere la possibilità 
di modificare le nostre risorse.

Bonus

    Quelli del giorno prima, se non già fatti
    Aggiungere un controllo dell'errore nelle rotte che utilizzano un parametro 
    obbligatorio :id quando la risorsa corrispondente non viene trovata, 
    rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
    
    Aggiungere un controllo dell'errore per i parametri in ingresso nel body nelle rotte store e update , 
    rispondere con uno stato 400 e un messaggio d’errore, sempre in formato JSON. */

//! Middlewares

/* Dopo aver completato tutte le operazioni CRUD, completiamo le nostre API 
    inserendo un middleware per la gestione delle rotte non registrate e uno per la gestione degli errori.

    Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio
     e uno status appropriato.
    
     Se viene generato un errore, un middleware si occuperà di rispondere con un messaggio
      e uno status appropriato. */

//! Esercizio

/*Prendiamo le API precedentemente create per il vostro blog ed aggiungiamo la persistenza tramite la connessione a un DB

Milestone 1

    Importiamo il db in allegato su MySQL Workbench
    Installiamo il client mysql2 con npm i mysql2 nell’app Express
    Creiamo un file di configurazione per connettere il database
    Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.

Milestone 2

    Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON
    Verifichiamo su Postman che la risposta sia corretta

Milestone 3

    Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database
    Verifichiamo su Postman che la chiamata non dia errore e risponda 204
    Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso

Milestone 4

    Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON
    Verifichiamo su Postman che la risposta sia corretta

Bonus:

    Far sì che la SHOW restituisca il post comprensivo di tag, recuperandoli grazie alla relazione tra post e tags, esistente sul database */

/* Importo express */
const express = require("express");
const app = express();

/* Importo i Middleware */
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

/* Porta in utilizzo */
const port = 3000;

/* Importo le operazioni CRUD */
const postsRouter = require("./routers/posts");

/* Prima route */
app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

/* Body parser per decifrare il request body */
app.use(express.json());

/* Asset statici per le immagini */
app.use(express.static("images"));

/* Collegamento a tutte le rotte  */
app.use("/posts", postsRouter);

/* notFound Middleware */
app.use(notFound);

/* errorsHandler Middleware */
app.use(errorsHandler);

/* Server Online */
app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
