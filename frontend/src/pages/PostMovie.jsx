"use client";

import { useState, useRef } from "react";

export default function PostMovie() {
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const thumbnailRef = useRef(null);
  const imagesRef = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mx-auto max-w-3xl border border-gray-200 rounded-md">
        <div className="overflow-hidden rounded-md bg-gray-50">
          <div className="border-b bg-gray-50 px-8 py-6">
            <h2 className="text-center text-2xl font-bold text-gray-900 font-serif">
              Post New Movie
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            <div className="flex justify-between items-center gap-2">
              {/* Title Input */}
              <div className="w-full">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Movie Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-white w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Enter the movie title"
                />
              </div>

              {/* Release Date Input */}
              <div className="w-full">
                <label
                  htmlFor="releaseDate"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Release Date
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  className="bg-white w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="bg-white w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                placeholder="Write a brief description of the movie..."
              />
            </div>

            {/* Thumbnail Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Thumbnail
              </label>
              <input
                type="file"
                ref={thumbnailRef}
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              <div className="flex items-start gap-4">
                {!thumbnail ? (
                  <button
                    type="button"
                    onClick={() => thumbnailRef.current?.click()}
                    className="bg-white flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 transition-colors hover:border-orange-500/50 hover:bg-orange-50"
                  >
                    <svg
                      className="mb-2 h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">
                      Upload Thumbnail
                    </span>
                  </button>
                ) : (
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={thumbnail || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => thumbnailRef.current?.click()}
                        className="rounded-full bg-white/90 p-2 text-gray-900 hover:bg-white"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setThumbnail("")}
                        className="rounded-full bg-white/90 p-2 text-gray-900 hover:bg-white"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Multiple Images Input */}
            <div>
              <input
                type="file"
                ref={imagesRef}
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
              />
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-6">
                  <button
                    type="button"
                    onClick={() => imagesRef.current?.click()}
                    className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white transition-colors hover:border-orange-500/50 hover:bg-orange-50"
                  >
                    <svg
                      className="mb-2 h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-center text-sm text-gray-500">
                      Add Images
                    </span>
                  </button>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Movie image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="rounded-full bg-white/90 p-2 text-gray-900 hover:bg-white"
                        >
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full rounded-lg bg-orange-50 px-8 py-3 text-orange-600 cursor-pointer transition-all hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300/20 disabled:cursor-not-allowed disabled:opacity-70 border border-orange-300"
            >
              <span className={`${isSubmitting ? "invisible" : ""}`}>
                Post Movie
              </span>
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
