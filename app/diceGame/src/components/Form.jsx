import React from "react";
import { Link } from "react-router-dom";

const Form = (props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className="border border-red-50 rounded-md w-1/2 flex flex-col items-center gap-4 h-fit"
    >
      <h2 className="text-center pt-12 text-3xl">{props.label}</h2>
      <div>
        <label htmlFor="username">Username: </label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          className="p-2 mt-2 w-[300px] input-form text-white rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          className="p-2 mt-2 w-[300px] input-form bg-transparent text-white rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-white text-blue-600 font-semibold rounded-md mt-3 mb-3"
      >
        {props.label}
      </button>
      {props.label === "Login" ? (
        <p className="mb-10">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-fuchsia-300 text-decoration: underline"
          >
            Sign Up
          </Link>
        </p>
      ) : (
        <p className="mb-10">
          Already a user?{" "}
          <Link
            to="/login"
            className="text-fuchsia-300 text-decoration: underline"
          >
            Login
          </Link>
        </p>
      )}
    </form>
  );
};

export default Form;
