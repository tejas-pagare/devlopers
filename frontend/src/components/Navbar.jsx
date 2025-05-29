import React from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((store)=>store.user);
  return (
    <>
      <div className="navbar bg-base-200 shadow-lg px-6">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">🧑‍🤝‍🧑DevMatch</a>
        </div>
        {
          user && <div className="flex gap-2 ">
          <h1 className="flex item-center text-purple-600 font-bold">Welcome,{user.firstname}</h1>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User image"
                  src={user.photourl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        }
       
      </div>
    </>
  );
}

export default Navbar;
