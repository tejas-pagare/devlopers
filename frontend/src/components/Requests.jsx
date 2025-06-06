import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_BASE_URL } from "../utils/constant";
import { addRequests, removeRequest } from "../store/slices/request";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const getRequests = async () => {
    try {
      const response = await axios.get(
        BACKEND_BASE_URL + "/user/request/recieved",
        { withCredentials: true }
      );
      dispatch(addRequests(response?.data?.data?.requests));
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("BACKEND ERROR");
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  const onClickHandler = async (status,requestId) => {
    try {
      const response = await axios.post(BACKEND_BASE_URL+"/request/review/"+status+"/"+requestId,{},{withCredentials:true});
      dispatch(removeRequest(requestId));
      console.log(response)
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error)
    }
  };
  return (
    <>
      {requests.length===0 ? (
        <div className="text-center pt-6 text-2xl font-bold text-purple-600">
          No Request found
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl pt-6 font-bold text-purple-600">
            My Connections
          </h1>
          <ul className="list bg-base-100 rounded-box shadow-md">
            {requests.map((request) => {
              return (
                <li
                  key={request?.fromUserId?._id}
                  className="list-row bg-base-300  mx-auto m-16"
                >
                  <div>
                    <img
                      className="size-16 my-auto rounded-full"
                      src={request?.fromUserId?.photourl}
                    />
                  </div>
                  <div>
                    <div className="text-lg  text-purple-600">
                      <span>{request?.fromUserId?.firstname}</span>{" "}
                      {request?.fromUserId?.lastname && (
                        <span>{request?.fromUserId?.lastname}</span>
                      )}
                    </div>
                    {request?.fromUserId?.age && request?.fromUserId?.gender && (
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {request?.fromUserId?.age},{request?.fromUserId?.gender}
                      </div>
                    )}
                    {request?.fromUserId?.bio && (
                      <p className="list-col-wrap text-md mt-4">
                        {request?.fromUserId?.bio}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 items-center">
                    <button onClick={()=>onClickHandler("accepted",request?._id)} className="btn btn-primary">Accept</button>
                    <button onClick={()=>onClickHandler("rejected",request?._id)} className="btn btn-secondary">reject</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Requests;
