import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import "./nav-bar.css";

function NavBarComponent() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/local/verify", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) {
          fetch(`http://localhost:3000/users/${data.id}`)
            .then((res) => res.json())
            .then((data) => {
              setUser(data[0].name);
            })
            .catch((err) => {
              console.error("Error getting current user", err);
            });
        }
      })
      .catch((err) => {
        console.error("error verifying user", err);
      });
  });

  return (
    <>
      <nav className="h-20 flex items-end bg-slate-900 text-white">
        <img
          src="/ARMOR.PNG"
          className="h-20 w-20 rounded-sm absolute top-0"
        ></img>

        <div className="absolute ml-20 flex justify-between w-full">
          <ul className="space-x-4 flex mb-2">
            <li className="ml-4">
              <Link to="/home">Home</Link>
            </li>
            <li className="">
              <Link to="/flights">Flights</Link>
            </li>
          </ul>

          <div className=" absolute right-28 flex ">
            <CircleUserRound />
            <p className="ml-2">{user}</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarComponent;
