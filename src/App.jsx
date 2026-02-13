import axios from "axios";
import { act, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [actresses, setActresses] = useState([]);

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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Attrici famose: dati e riconoscimenti
      </h1>
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
                    {actress.awards}
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
