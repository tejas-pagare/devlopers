import React from "react";

function UserCard({ user }) {
  
  const { firstname, lastname, age, gender, bio, photourl } = user;
  return (
    <div className="flex justify-center item-center mt-2">
      <div className="card bg-base-300  w-96 shadow-sm">
        <figure>
          <img src={photourl} alt={firstname} />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">{firstname +" "+ lastname}</h2>
          {age && gender && <h4>{age + "," + gender}</h4>}
          <p>{bio}</p>
          <div className="card-actions justify-evenly mt-4">
            <button className="btn btn-primary ">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
