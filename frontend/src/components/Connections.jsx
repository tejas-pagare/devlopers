import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BACKEND_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/slices/connection";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const getConnections = async () => {
    try {
      const response = await axios.get(BACKEND_BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(response?.data?.data?.connections));
    } catch (error) {
      toast.error("BACKEND ERROR");
    }
  };
  useEffect(() => {
    getConnections();
    console.log(connections)
  },[]);
  return (
    <>
      {connections.length===0 ? (
        <div className="text-center pt-6 text-2xl font-bold text-purple-600">
          No Connections found
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl pt-6 font-bold text-purple-600">
            My Connections
          </h1>
          <ul className="list bg-base-100 rounded-box shadow-md">
            {connections.map((connection) => {
            return  <li
                key={connection?._id}
                className="list-row bg-base-300 mx-16 my-8"
              >
                <div>
                  <img
                    className="size-16 my-auto rounded-full"
                    src={connection.photourl}
                  />
                </div>
                <div>
                  <div className="text-lg  text-purple-600">
                    <span>{connection.firstname}</span>{" "}
                    {connection.lastname && (
                      <span>{connection.lastname}</span>
                    )}
                  </div>
                  {connection.age && connection.gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {connection.age},{connection.gender}
                    </div>
                  )}
                  {connection.bio && (
                    <p className="list-col-wrap text-md mt-4">
                      {connection.bio}
                    </p>
                  )}
                </div>
              </li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Connections;
