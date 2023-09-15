import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: <b>{place.checkIn}:00</b>
          <br />
          Check-out: <b>{place.checkOut}:00</b>
          <br />
          Max number of guests: <b>{place.maxGuests} people</b>
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 border-t pb-8 mt-4 place-items-center">
        <h2 className="font-semibold text-2xl mt-8">Extra info</h2>
        <div className="text-sm text-gray-700 leading-4 mb-4 mt-3">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
