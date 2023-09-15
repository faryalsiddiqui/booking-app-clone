import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  let numberOfDays = 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  return (
    <div className="mt-5">
      <div className="bg-white shadow p-4 rounded-2xl">
        <h2 className="text-2xl text-center mb-3">
          Price:{" "}
          {numberOfDays > 0 ? (
            <b>
              <span>${numberOfDays * place.price} </span>
            </b>
          ) : (
            <span>
              <b>${place.price}</b> per night
            </span>
          )}
          {numberOfDays > 0 && (
            <>
              {" "}
              for {numberOfDays} {numberOfDays === 1 ? "night" : "nights"}
            </>
          )}
        </h2>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check in: </label>
              <input
                className="rounded-2xl "
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4  border-l ">
              <label>Check out: </label>
              <input
                className="rounded-2xl "
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className=" py-3 px-3 border-t">
            <label>Number of guests: </label>
            <input
              className="rounded-2xl p-1 "
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfDays > 0 && (
            <div className=" py-3 px-3 border-t">
              <label>Your full name: </label>
              <input
                className="rounded-2xl p-1 "
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Phone Number: </label>
              <input
                className="rounded-2xl p-1 "
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place
        </button>
      </div>
    </div>
  );
}
