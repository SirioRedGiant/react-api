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

  // useEffect(() => {
  //   const allStars = [...actresses, ...actors]
  //     .map((value) => ({ value, sort: Math.random() })) // crea un nuovo oggetto con array originale e sort con numero random
  //     .sort((a, b) => a.sort - b.sort) // sorteggia gli oggetti in base a sort che e' random
  //     .map(({ value }) => value); // restituisce un array come quello di prima
  //   setAllStars(allStars);
  // }, [actresses, actors]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Attrici famose: dati e riconoscimenti
      </h1>
      {/* Attrici */}
      <div className="row g-4">
        {actresses.map((actress) => (
          <div key={actress.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img
                src={actress.image}
                className="card-img-top"
                alt={actress.name}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="card-title fw-bold">
                  {actress.name}
                  <span className="badge text-bg-secondary">
                    {actress.nationality}
                  </span>
                </h3>
                <h6 className="card-subtitle mb-2 text-muted">
                  Nata nell'anno: {actress.birth_year}
                </h6>
                <p className="card-text">{actress.biography}</p>
                <div className="mt-auto">
                  <span className="badge bg-warning text-dark">
                    {/* CONTROLLO SE LA VARIABILE è UN ARRAY --> Se awards è un array, uniscili con una virgola e uno spazio altrimenti restituisci la stringa di actress.awards*/}
                    {Array.isArray(actress.awards)
                      ? actress.awards.join(", ")
                      : actress.awards}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Attori */}
      <div className="row g-4">
        {actors.map((actor) => (
          <div key={actor.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img
                src={actor.image}
                className="card-img-top"
                alt={actor.name}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="card-title fw-bold">
                  {actor.name}
                  <span className="badge text-bg-secondary">
                    {actor.nationality}
                  </span>
                </h3>
                <h6 className="card-subtitle mb-2 text-muted">
                  Nata nell'anno: {actor.birth_year}
                </h6>
                <p className="card-text">{actor.biography}</p>
                <div className="mt-auto">
                  <span className="badge bg-warning text-dark">
                    {/* CONTROLLO SE LA VARIABILE è UN ARRAY --> Se awards è un array, uniscili con una virgola e uno spazio altrimenti restituisci la stringa di actress.awards*/}{" "}
                    {Array.isArray(actor.awards)
                      ? actor.awards.join(", ")
                      : actor.awards}
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
