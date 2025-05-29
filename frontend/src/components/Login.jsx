import React from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
function Login() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailId: "Virat@gmail.com",
      password: "Kholi@123",
    },
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

    const response = await axios.post(`${BACKEND_BASE_URL}/login`, data, {
      withCredentials: true,
    });
    console.log(response);
    dispatch(addUser(response.data.user));
    reset();
    navigate("/feed")
  };
  return (
    <div className="flex item-center justify-center">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
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
                <p className="label">{errors.emailId.message}</p>
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
