import axios from "axios";
import { act, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import StarList from "./assets/components/StarList";

export default function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [allStars, setAllStars] = useState([]);

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

  //fixed ARTHUR STYLE
  {
    /* Per fare in modo di avere un unica card shuffleata*/
  }
  useEffect(() => {
    const allStars = [...actresses, ...actors]
      .map((value) => ({ value, sort: Math.random() })) // crea un nuovo oggetto con array originale e sort con numero random
      .sort((a, b) => a.sort - b.sort) // sorteggia gli oggetti in base a sort che e' random
      .map(({ value }) => value); // restituisce un array come quello di prima
    setAllStars(allStars);
  }, [actresses, actors]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Attrici famose: dati e riconoscimenti
      </h1>

      {/* passare allStars alla prop movieStars richiesta da StarList */}
      {allStars.length > 0 ? (
        <StarList movieStars={allStars} />
      ) : (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      )}
    </div>
  );
}
