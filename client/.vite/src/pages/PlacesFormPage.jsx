import { useEffect, useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function PlacesFormPage() {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setmaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setmaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  //   if (redirectToPlacesList && action != "new") {
  //     return <Navigate to={"/account/places"} />;
  //   }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post("/places", {
        placeData,
      });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />

      <Link
        to={"/account/places"}
        className="flex bg-gray-300 gap-4 w-max p-4 rounded-2xl cursor-pointer "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      <form className="mt-10" onSubmit={savePlace}>
        {preInput(
          "Title",
          "title for your place. should be short and catchy as in advertisement"
        )}

        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        ></input>

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        ></input>

        {preInput("Photos", "The more the better")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Describe the place")}

        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra Info", "House rules, etc...")}

        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check in & out times",
          "add check in and check out times, remember to have some time window for cleaning the room between guests."
        )}

        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div className="mt-2  -mb-1">
            <h3>Check in time</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="text"
              placeholder="14:00"
            />
          </div>
          <div className="mt-2  -mb-1">
            <h3>Check out time</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="text"
              placeholder="12:00"
            />
          </div>
          <div className="mt-2  -mb-1">
            <h3>Max number of guests</h3>
            <input
              value={maxGuests}
              onChange={(ev) => setmaxGuests(ev.target.value)}
              type="number"
              placeholder="4 guests"
            />
          </div>
          <div className="mt-2  -mb-1">
            <h3>Price per night</h3>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type="number"
            />
          </div>
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
