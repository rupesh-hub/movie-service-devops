"use client";

import { useState } from "react";
import { Star, MessageCircle, ThumbsUp } from "lucide-react";

export default function MovieDetails() {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted comment:", userComment);
    setUserComment("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Inside Out</h1>
        <div className="flex items-center mb-4">
          <Star className="text-orange-400 w-6 h-6" />
          <span className="ml-2 text-xl">4.8/5</span>
          <span className="ml-4 text-gray-600">(2,345 reviews)</span>
        </div>
        <img
          src="https://deadline.com/wp-content/uploads/2024/06/The-Highest-Grossing-Animated-Films-at-The-Box-Office-Photo-Gallery.jpg"
          alt="Inside Out movie poster"
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4">
          Growing up can be a bumpy road, and it's no exception for Riley, who
          is uprooted from her Midwest life when her father starts a new job in
          San Francisco. Like all of us, Riley is guided by her emotions - Joy,
          Fear, Anger, Disgust and Sadness. The emotions live in Headquarters,
          the control center inside Riley's mind, where they help advise her
          through everyday life.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Animation
          </span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Family
          </span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Comedy
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((review) => (
            <div key={review} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <img
                  src={`https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=`}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold font-serif">Rupesh Sharma</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? "text-orange-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-serif">
                This movie is a masterpiece! The animation is stunning and the
                story is deeply moving. It's a must-watch for both kids and
                adults.
              </p>
              <div className="flex items-center mt-2 text-gray-500">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span className="mr-4">24</span>
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>3</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer ${
                star <= userRating ? "text-orange-400" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full p-2 border rounded-lg mb-4"
            rows="4"
            placeholder="Write your review here..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-orange-50 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors duration-300 border border-orange-300 font-serif cursor-pointer"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
