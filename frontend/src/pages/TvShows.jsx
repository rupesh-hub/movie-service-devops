import { Play, } from "lucide-react";

export default function TvShows() {
    return <>
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <div className="relative">
                        <img
                            src="https://www.vice.com/wp-content/uploads/sites/2/2019/11/1573610428860-Avatar-2.jpeg?w=1024"
                            alt=""
                            className="rounded-lg h-60"
                        />

                        <div
                            className="absolute bottom-2 left-10 flex justify-center items-center gap-1 bg-gray-600 pl-1 pr-4 py-1 rounded-full">
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

                        <div
                            className="absolute bottom-2 left-10 flex justify-center items-center gap-1 bg-gray-600 pl-1 pr-4 py-1 rounded-full">
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

                        <div
                            className="absolute bottom-2 left-10 flex justify-center items-center gap-1 bg-gray-600 pl-1 pr-4 py-1 rounded-full">
                            <Play
                                size={28}
                                color="white"
                                className="bg-black p-1 rounded-full"
                            />
                            <p className="text-sm font-serif text-gray-50">Watch</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    </>
}