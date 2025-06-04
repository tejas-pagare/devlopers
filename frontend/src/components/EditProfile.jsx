import React from "react";
import { useForm } from "react-hook-form";
import UserCard from "./UserCard";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/user";
import validator from "validator"
function EditProfile({ user }) {
  const dispatch = useDispatch();
  if (!user) {
    return <div>Loading...</div>;
  }

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname || "",
      age: user.age || "",
      gender: user.gender || "",
      photourl: user.photourl,
      bio: user.bio || "",
    },
  });
  const watched = watch();
  const onSubmit = async (data) => {
    let isError = false;
    console.log(data)
    if (data.firstname.length < 5 || data.firstname.length > 50) {
      isError=true;
      setError("firstname", { message: "Firtname should btw 5 to 100" });
    }

    if (data.bio && data.bio.length < 100) {
      isError=true;
      setError("bio", {
        message: "firstname must have length between less than 100",
      });
    }

    if (data.age && data.age < 18) {
      isError=true;
      setError("age", { message: "Age must be 18+" });
    }

    if (
      data.gender &&
      !(
        data.gender === "male" ||
        data.gender === "female" ||
        data.gender === "other"
      )
    ) {
      isError=true;
      setError("gender", { message: "Enter a valid gender" });
    }

    if (!validator.isURL(data.photourl)) {
      isError=true;
      setError("photourl", { message: "Enter a valid image url" });
    }
    if(isError)return;
    try {
      const response = await axios.patch(
        BACKEND_BASE_URL + "/profile/edit",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(addUser(response?.data?.data));
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };
  return (
    <div className="flex gap-6 justify-center m-6">
      <div className="flex item-center justify-center">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter Firstname</legend>
                <input
                  autoComplete="true"
                  {...register("firstname")}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
                {errors.firstname && (
                  <p className="label text-red-500 tracking-tighter">
                    {errors.firstname.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter Lastname</legend>
                <input
                  autoComplete="true"
                  {...register("lastname")}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
                {errors.lastname && (
                  <p className="label text-red-500 tracking-tighter">
                    {errors.lastname.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter PhotoUrl</legend>
                <input
                  autoComplete="true"
                  {...register("photourl")}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
                {errors.photourl && (
                  <p className="label text-red-500 tracking-tighter">
                    {errors.photourl.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter Age</legend>
                <input
                  autoComplete="true"
                  {...register("age")}
                  type="number"
                  className="input"
                  placeholder="Type here"
                />
                {errors.age && (
                  <p className="label text-red-500 tracking-tighter">
                    {errors.age.message}
                  </p>
                )}
              </fieldset>
              <fieldset>
                <legend className="fieldset-legend">Select age</legend>
                <select
                  {...register("gender")}
                  defaultValue={"Select an age"}
                  className="select "
                >
                  <option disabled={true}>Select age</option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"others"}>Others</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter Bio</legend>
                <input
                  autoComplete="true"
                  {...register("bio")}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
                {errors.bio && (
                  <p className="label text-red-500 tracking-tighter">
                    {errors.bio.message}
                  </p>
                )}
              </fieldset>
              <div className="flex item-center justify-center mt-2">
                <button type="submit" className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <UserCard user={watched} />
    </div>
  );
}

export default EditProfile;
