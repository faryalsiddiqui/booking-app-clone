import { useState } from "react";
import ImageLink from "./ImageLink";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen bg-black">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl text-white mr-48">
              Photos of {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-11 flex gap-1 py-2 px-4 rounded-2xl bg-gray text-black shadow shadow-black-500 bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <ImageLink src={photo} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid rounded-2xl gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <ImageLink
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover"
                src={place.photos[0]}
              />
            </div>
          )}
        </div>

        <div className="grid">
          {place.photos?.[1] && (
            <ImageLink
              onClick={() => setShowAllPhotos(true)}
              className="cursor-pointer aspect-square object-cover"
              src={place.photos[1]}
            />
          )}
          <div className="border overflow-hidden">
            {place.photos?.[2] && (
              <ImageLink
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer  aspect-square object-cover relative top-2"
                src={place.photos[2]}
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-2 right-2 py-2 px-4 flex gap-2 bg-white rounded-2xl shadow shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
