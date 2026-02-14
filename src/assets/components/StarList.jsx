import StarCard from "./StarCard";

export default function StarList({ movieStars }) {
  return (
    <div className="row g-4">
      {/*//note --- Cicla l'array che riceve dalle props: movieStars */}
      {movieStars.map((movieStar) => (
        /*//note --- Restituisce il componente StarCard e gli passa la key */
        <StarCard key={`${movieStar.name}-${movieStar.id}`} star={movieStar} />
      ))}
    </div>
  );
}
