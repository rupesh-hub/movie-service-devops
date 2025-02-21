import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {

  console.log(movie?.thumbnail?.path)

  return (
    <Link to="/details">
      <div className="movie-card w-40 relative group cursor-pointer">
        <img
          src={movie?.thumbnail?.path}
          alt={movie.title}
          className="h-60 w-40 rounded-lg object-cover"
        />
        {/* Text overlay positioned above the image */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
          <h5 className="text-lg font-semibold text-white truncate">
            {movie.title}
          </h5>
          <p className="text-sm text-gray-200">{movie.release_date}</p>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      </div>
    </Link>
  );
}
