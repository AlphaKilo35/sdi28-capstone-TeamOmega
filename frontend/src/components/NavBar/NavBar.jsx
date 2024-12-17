import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import "./nav-bar.css";

function NavBarComponent() {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownSelect, setDropdownSelect] = useState(false);
  let navigate = useNavigate();

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
              setUser(data[0]?.name);
              setIsLoading(false);
            })
            .catch((err) => {
              console.error("Error getting current user", err);
            });
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("error verifying user", err);
      });
  });

  function handleNavigate(link) {
    console.log(link);
    navigate(`/${link}`);
  }

  const handleLogout = () => {
    fetch("http://localhost:3000/local/logout", {
      method: "POST",
      "Content-Type": "application/json",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        data ? navigate("/login") : console.error("Server Error")
      );
  };

  const handleProfileNavigate = () => {
    setDropdownSelect(!dropdownSelect)
    navigate('/profile')
  }

  return (
    !isLoading && (
      <>
        <nav className="h-20 z-1000 flex items-end bg-slate-900 text-white">
          <img
            src="/ARMOR.PNG"
            className="h-20 w-20 rounded-sm absolute top-0"
          ></img>

          <div className="absolute ml-20 flex justify-between w-full">
            <ul className="space-x-4 flex mb-2">
              <li className="ml-4 cursor-pointer">
                <h3 onClick={() => handleNavigate("home")}>Home</h3>
              </li>
              <li className="ml-4 cursor-pointer">
                <h3 onClick={() => handleNavigate("flights")}>Flights</h3>
              </li>
              <li className="ml-4 cursor-pointer">
                <h3
                  onClick={() =>
                    handleNavigate(`Individual-Training-Record/${user.id}`)
                  }
                >
                  Training Record
                </h3>
              </li>
            </ul>
            <div className=" absolute right-28 flex ">
              <CircleUserRound />
              <div className="relative">
                <button
                  className="ml-2 z-10 cursor-pointer"
                  onClick={() => setDropdownSelect(!dropdownSelect)}
                >
                  {user}
                </button>
                <div
                  className={`z-20 left-3 top-8 transform transition-all duration-300 ease-out absolute rounded-md p-2 text-sm border border-gold-400 bg-black ${
                    dropdownSelect
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 invisable translate-y-[-20px] pointer-events-none"
                  }`}
                >
                  <div
                    className="p-1 h-full cursor-pointer"
                    onClick={handleProfileNavigate}
                  >
                    Profile
                  </div>
                  <div
                    className="p-1 h-full text-nowrap cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  );
}

export default NavBarComponent;
