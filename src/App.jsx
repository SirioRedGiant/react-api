import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//note --- import componenti rifattorizzati
import StarList from "./assets/components/StarList";

export default function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [allStars, setAllStars] = useState([]);

  //todo STATI GESTIONE CHIAMATE
  const [isLoading, setIsLoading] = useState(true); // Parte true perché carichiamo all'avvio
  const [errorMessage, setErrorMessage] = useState(null); // Parte null perché non ci sono errori all'inizio

  useEffect(() => {
    const urlActresses = "https://lanciweb.github.io/demo/api/actresses/";
    const urlActors = "https://lanciweb.github.io/demo/api/actors/";

    //note --> Promise.all per gestire entrambe le chiamate contemporaneamente
    Promise.all([axios.get(urlActresses), axios.get(urlActors)])
      .then((responses) => {
        //* responses[0] è il risultato delle attrici, responses[1] degli attori
        setActresses(responses[0].data);
        setActors(responses[1].data);
      })
      .catch((error) => {
        // CATCH: Gestisce eventuali errori (es. server offline o url sbagliato)
        console.error("Errore nel recupero dati:", error);
        setErrorMessage(
          "Spiacente! Non è stato possibile caricare i dati delle star.",
        );
      })
      .finally(() => {
        // FINALLY: Viene eseguito SEMPRE, sia in caso di successo che di errore
        // Serve per fermare lo spinner di caricamento
        setIsLoading(false);
      });
  }, []);

  //! ARTHUR'S MAGIC --> Schwartzian Transform
  /*//^ La Schwartzian Transform (Trasformata di Schwartz) è un idioma di programmazione utilizzato per ottimizzare le operazioni di ordinamento (sort) di elenchi (array o liste) quando la chiave di ordinamento è costosa da calcolare. 
Prende il nome da Randal L. Schwartz....  applied solely to Perl programming for a number of years, but it has later been adopted by some users of other languages, such as Python */

  useEffect(() => {
    // Esegue la logica solo se si è ricevuto dei dati evitando di "shufflare" due array vuoti all'avvio
    if (actresses.length > 0 || actors.length > 0) {
      const shuffledStars = [...actresses, ...actors]
        .map((value) => ({ value, sort: Math.random() })) // crea un nuovo oggetto con array originale e sort con numero random
        .sort((a, b) => a.sort - b.sort) // sorteggia gli oggetti in base a sort che e' random
        .map(({ value }) => value); // restituisce un array come quello di prima

      setAllStars(shuffledStars);
    }
  }, [actresses, actors]); // Si attiva appena una delle due liste viene popolata

  /* //note ---> Usare sort(() => Math.random() - 0.5) (il metodo veloce) non è sempre affidabile su tutti i browser. Questa versione con l'oggetto temporaneo e il valore sort è molto più precisa. Referenza su StackOverflow sullo Shuffle.
Immutabilità: Creando un nuovo array con lo Spread Operator [...], non si modificano gli stati originali actresses e actors, rispettando perfettamente le regole di React. */

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">
        Attrici famose: dati e riconoscimenti
      </h1>

      {/* GESTIONE ERRORE: Mostra un alert se errorMessage non è null */}
      {errorMessage && (
        <div
          className="alert alert-danger text-center shadow-sm mb-4"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* GESTIONE CARICAMENTO / LISTA */}
      {isLoading ? (
        <div className="text-center p-5">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <p className="mt-3 text-muted">Recupero star in corso...</p>
        </div>
      ) : (
        // Se non c'è errore e ha finito di caricare, mostriamo la lista
        !errorMessage && <StarList movieStars={allStars} />
      )}
    </div>
  );
}

/*
// Attrici
useEffect(() => {
  axios.get("https://lanciweb.github.io/demo/api/actresses/").then((res) => {
    const attrici = res.data;
    console.log(attrici);
    setActresses(attrici);
    attrici.forEach((attrice) => {
      console.log(attrice.name);
    });
  });
}, []);
*/
/*
// Attori
useEffect(() => {
  axios.get("https://lanciweb.github.io/demo/api/actors/").then((res) => {
    const actors = res.data;
    console.log(actors);
    setActors(actors);
    actors.forEach((attrice) => {
      console.log(attrice.name);
    });
  });
}, []);
*/
/*
//fixed ARTHUR STYLE
useEffect(() => {
  const allStars = [...actresses, ...actors]
    .map((value) => ({ value, sort: Math.random() })) // crea un nuovo oggetto con array originale e sort con numero random
    .sort((a, b) => a.sort - b.sort) // sorteggia gli oggetti in base a sort che e' random
    .map(({ value }) => value); // restituisce un array come quello di prima
  setAllStars(allStars);
}, [actresses, actors]);
*/
