import React from "react";
import {
  Play,
  Heart,
  Film,
  Smile,
  Theater,
  BookOpen,
  Ghost,
  Flame,
} from "lucide-react";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const animationMovies = [
    {
      title: "Spirited Away",
      release_date: "2001-07-20",
      image: "https://deadline.com/wp-content/uploads/2024/06/The-Highest-Grossing-Animated-Films-at-The-Box-Office-Photo-Gallery.jpg",
    },
    {
      title: "Inside Out",
      release_date: "2015-06-19",
      image: "https://hips.hearstapps.com/hmg-prod/images/best-animated-movies-13-zootopia-1669750685.jpeg?crop=0.5625xw:1xh;center,top&resize=980:*",
    },
    {
      title: "Soul",
      release_date: "2020-12-25",
      image: "https://kidsinfinitelearning.com/wp-content/uploads/2022/07/Up.jpg",
    },
    {
      title: "Zootopia",
      release_date: "2016-03-17",
      image: "https://hips.hearstapps.com/hmg-prod/images/best-animated-movies-inside-out-2-66c8d40b576a9.jpeg?crop=0.926xw:0.822xh;0,0.120xh&resize=640:*",
    },
    {
      title: "WALL·E",
      release_date: "2008-06-27",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3gOypFcUhlZs9ewK2BprfKAl-hkJWnuDDbw&s",
    },
    {
      title: "The Wild Robot",
      release_date: "2024-12-20",
      image: "https://www.rollingstone.com/wp-content/uploads/2023/11/Walt-Disney-movies-ranked-illo.jpg?w=1581&h=1054&crop=1",
    },
    {
      title: "Piece by Piece",
      release_date: "2024-11-15",
      image: "https://imgmediagumlet.lbb.in/media/2023/12/658574651519821d48d11132_1703244901555.jpg",
    },
  ];

  const horrorMovies = [
    {
      title: "Coraline",
      release_date: "2009-02-06",
      image: "https://i.ytimg.com/vi/obtDvLh6TFc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBhlXD64Aeibj0_s1DCEwsDK1VR9Q",
    },
    {
      title: "ParaNorman",
      release_date: "2012-08-17",
      image: "https://resizing.flixster.com/HyMxXH1CROI3IIZY7TE8923PZ8E=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzM5MzQ0N2VhLTE3MGMtNDE0MS04MmQ3LTFjYjUzYTE4NzliMS5qcGc=",
    },
    {
      title: "The Nightmare Before Christmas",
      release_date: "1993-10-29",
      image: "https://wwwimage-us.pplusstatic.com/thumbnails/photos/w370-q80/movie_asset/59/74/33/sml_salone_poster_1400x2100.jpg",
    },
    {
      title: "Monster Family",
      release_date: "2017-03-09",
      image: "https://media.gqindia.com/wp-content/uploads/2023/05/Daily-BW-for-May-11-Best-horror-movies-of-2023-1920x1080.jpg",
    },
    {
      title: "Frankenweenie",
      release_date: "2012-10-05",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnXpt3DfN0fW6EkUqit0ImCJo79j9G_Z_YQ&s",
    },
    {
      title: "Hotel Transylvania",
      release_date: "2012-09-28",
      image: "https://res.cloudinary.com/jerrick/image/upload/v1681698107/643cad3b900d4a001df4a835.jpg",
    },
    {
      title: "The Addams Family",
      release_date: "2019-10-11",
      image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i03wSoqSckJQ/v0/-1x-1.webp",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="relative">
            <img
              src="https://www.vice.com/wp-content/uploads/sites/2/2019/11/1573610428860-Avatar-2.jpeg?w=1024"
              alt=""
              className="rounded-lg h-60"
            />

            <div className="absolute bottom-2 left-10 flex justify-center items-center gap-1 bg-gray-600 pl-1 pr-4 py-1 rounded-full">
              <Play
                size={28}
                color="white"
                className="bg-black p-1 rounded-full"
              />
              <p className="text-sm font-serif text-gray-50">Watch</p>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://imageio.forbes.com/specials-images/imageserve/6761147587d60cfb84d67f9a/0x0.jpg?format=jpg&crop=1067,600,x428,y32,safe&height=900&width=1600&fit=bounds"
              alt=""
              className="rounded-lg h-60"
            />

            <div className="absolute bottom-2 left-10 flex justify-center items-center gap-1 bg-gray-600 pl-1 pr-4 py-1 rounded-full">
              <Play
                size={28}
                color="white"
                className="bg-black p-1 rounded-full"
              />
              <p className="text-sm font-serif text-gray-50">Watch</p>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FF5F510A6024134CBBD18FD975C3AC4861E58DC26B93B2EAF42C418ADD9ED650/scale?width=506&aspectRatio=2.00&format=webp"
              alt=""
              className="rounded-lg h-60"
            />

            <div className="absolute bottom-2 left-10 flex justify-center items-center gap-1 bg-gray-600 pl-1 pr-4 py-1 rounded-full">
              <Play
                size={28}
                color="white"
                className="bg-black p-1 rounded-full"
              />
              <p className="text-sm font-serif text-gray-50">Watch</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 mb-6">
          <ul className="flex justify-between items-center">
            <li className="bg-red-50 p-4 rounded-md flex items-center gap-2 cursor-pointer">
              <Flame size={25} color="red" />
              <span className="font-serif text-red-700">Trending</span>
            </li>
            <li className="bg-blue-50 p-4 rounded-md flex items-center gap-2 cursor-pointer">
              <Play size={25} color="blue" />
              <span className="font-serif text-blue-700">Action</span>
            </li>
            <li className="bg-red-50 p-4 rounded-md font-serif flex items-center gap-2 cursor-pointer">
              <Heart size={25} color="red" />
              <span className="font-serif text-red-700">Romance</span>
            </li>
            <li className="bg-green-50 p-4 rounded-md font-serif flex items-center gap-2 cursor-pointer">
              <Film size={25} color="green" />
              <span className="font-serif text-green-700">Animation</span>
            </li>
            <li className="bg-blue-50 p-4 rounded-md font-serif flex items-center gap-2 cursor-pointer">
              <Smile size={25} color="blue" />
              <span className="font-serif text-blue-700">Comedy</span>
            </li>
            <li className="bg-orange-50 p-4 rounded-md font-serif flex items-center gap-2 cursor-pointer">
              <Theater size={25} color="orange" />
              <span className="font-serif text-orange-500">Drama</span>
            </li>
            <li className="bg-green-50 p-4 rounded-md font-serif flex items-center gap-2 cursor-pointer">
              <BookOpen size={25} color="green" />
              <span className="font-serif text-green-700">Documentary</span>
            </li>
            <li className="bg-red-50 p-4 rounded-md font-serif flex items-center gap-2 cursor-pointer">
              <Ghost size={25} color="red" />
              <span className="font-serif text-red-700">Horror</span>
            </li>
          </ul>
        </nav>

        {/* MOVIE SECTION */}
        <section className="movie-section">
          <div>
            <h4 className="font-serif font-semibold">Trending in Animation</h4>
            <div className="flex justify-between items-center pt-2">
              {animationMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.title} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-serif font-semibold">Trending in Horror</h4>
            <div className="flex justify-between items-center pt-2">
              {horrorMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.title} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-serif font-semibold">Trending in Comedy</h4>
            <div className="flex justify-between items-center pt-2">
              {horrorMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.title} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
