import ImageLink from "./ImageLink";

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }
  return (
    place.photos.length && (
      <ImageLink
        className={className}
        src={place.photos[index]}
        alt={`Image for ${place.title}`}
      />
    )
  );
}
