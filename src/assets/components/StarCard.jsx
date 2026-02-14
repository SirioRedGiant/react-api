export default function StarCard({ star }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
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
  );
}
