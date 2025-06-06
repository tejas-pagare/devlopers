import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator"
import { BACKEND_BASE_URL } from "../utils/constant";
function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (!validator.isEmail(data.emailId)) {
      setError("emailId", { type: "custom", message: "Enter a valid email" });
      return;
    }
    if (!validator.isStrongPassword(data.password)) {
      setError("password", {
        type: "custom",
        message: "Enter a valid password",
      });
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/signup`, data);
      console.log(response);
        reset();
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex item-center justify-center">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Signup</h2>
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
              <legend className="fieldset-legend">Enter Email</legend>
              <input
                autoComplete="true"
                {...register("emailId")}
                type="text"
                className="input"
                placeholder="Type here"
              />
              {errors.emailId && (
                <p className="label text-red-500 tracking-tighter">
                  {errors.emailId.message}
                </p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter a password</legend>
              <input
                autoComplete="true"
                {...register("password")}
                type="password"
                className="input"
                placeholder="Type here"
              />
              {errors.password && (
                <p className="label text-red-500 tracking-tighter">
                  {errors.password.message}
                </p>
              )}
            </fieldset>
            <div className="flex item-center justify-center mt-2">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </form>
          <p>Already have an account? <span className="text-blue-600"><Link to={'/login'}>Login</Link></span></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
