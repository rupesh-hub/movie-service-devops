import { Film, Search, Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full p-4 mb-6">
      <div className="flex justify-between max-w-7xl mx-auto">
        <Link to={"/"}>
          <div className="flex justify-center items-center gap-1 font-serif">
            {/* <Film size={30} /> */}
            <span className="font-serif font-semibold text-orange-600">Watch.en</span>
          </div>
        </Link>

        <div className="bg-black text-white rounded-full px-6 py-2">
          <ul className="flex gap-6 justify-center items-center font-serif">
            <Link to="/" className="font-serif">Movie</Link>
            <li className="font-serif">Series</li>
            <li className="font-serif">TV Shows</li>
            <Search
              size={24}
              color="black"
              className="bg-orange-100 p-1 rounded-full"
            />
          </ul>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Link to="/notifications">
            <div className="relative w-10 h-10 flex items-center justify-center bg-orange-50 rounded-full">
              <Bell size={22} color="black" />
              <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                4
              </div>
            </div>
          </Link>

          <div className="flex justify-center items-center gap-2 bg-gray-100 pr-2 rounded-full">
            <Link to="/profile" className="flex gap-2">
              <img
                src="https://viver-myexlusive-server.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2024/08/08091555/CompressJPEG.Online_1_100kb_2144.jpg"
                alt=""
                className="h-10 w-10 rounded-full border border-gray-500"
              />

              <div className="name flex flex-col">
                <p className="text-sm font-semibold font-serif">Rupesh</p>
                <small className="text-orange-600 font-semibold text-xs">
                  Premium
                </small>
              </div>
            </Link>

            <ChevronDown
              size={24}
              color="black"
              className="bg-white rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
