import axios from "axios";
import { act, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [allStars, setAllStars] = useState([]);

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
      {/* Unica card shuffleata*/}
      <div className="row g-4">
        {/*//note La key combina nome e id per essere sicuri al 100% dell'unicità */}
        {allStars.map((star) => (
          <div
            key={`${star.name}-${star.id}`}
            className="col-12 col-md-6 col-lg-4"
          >
            <div className="card h-100 shadow-sm">
              <img
                src={star.image}
                className="card-img-top"
                alt={star.name}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="card-title fw-bold">
                  {star.name}
                  <span className="badge text-bg-secondary ms-2">
                    {star.nationality}
                  </span>
                </h3>
                <h4 className="card-subtitle mb-2 text-muted">
                  Nata nell'anno: {star.birth_year}
                </h4>
                {/* SEZIONE FILM FAMOSI */}
                <div className="mb-3">
                  <h5 className="fw-bold bg-info">BEST FILMS:</h5>
                  <p className="card-text small italic">
                    {(star.most_famous_movies || star.known_for)?.join(", ")}
                  </p>
                </div>
                <p className="card-text">{star.biography}</p>
                <div className="mt-auto">
                  <span className="badge bg-warning text-dark">
                    {/* CONTROLLO SE LA VARIABILE è UN ARRAY --> Se awards è un array, uniscili con una virgola e uno spazio altrimenti restituisci la stringa di star.awards */}
                    {Array.isArray(star.awards)
                      ? star.awards.join(", ")
                      : star.awards}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
