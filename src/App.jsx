import axios from "axios";
import { useEffect, useState } from "react";
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
            <div className="card h-100 shadow-sm" style={{ width: "18rem" }}>
              <img
                src={actress.image}
                className="card-img-top"
                alt={actress.name}
              />
              <div className="card-body">
                <p className="card-text">{actress.biography}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
