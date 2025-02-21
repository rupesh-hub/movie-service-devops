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
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/movies");
        // console.log(response.data.data);
        setMovies(response.data.data);
      } catch (error) {
        onsole.error("Error fetching movies:", error);
      }
    })()

  }, []);

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
        <section className="movie-section mb-4">
          <div>
            <h4 className="font-serif font-semibold">Trending in Animation</h4>
            <div className="flex justify-between items-center pt-2">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-serif font-semibold">Trending in Horror</h4>
            <div className="flex justify-between items-center pt-2">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-serif font-semibold">Trending in Comedy</h4>
            <div className="flex justify-between items-center pt-2">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
