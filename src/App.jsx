import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      <ul>
        {actresses.map((actress) => (
          <li key={actress.id}> {actress.name}</li>
        ))}
      </ul>
    </div>
  );
}
