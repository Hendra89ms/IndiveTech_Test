import React, { useState } from "react";
import { login } from "../../service/authService";

function LoginPage() {
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: inputVal.email,
      password: inputVal.password,
    };

    try {
      const res = await login(data);

      if (res) {
        alert("Login Success!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      alert(error.response.data.msg);
      console.log("ERR: ", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-14">
      <h1 className="text-center font-bold text-2xl">Login Page</h1>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col "
      >
        <div className="w-[400px] shadow-sm">
          <div className="mb-5 ">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email"
              value={inputVal.email}
              onChange={(e) =>
                setInputVal({ ...inputVal, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={inputVal.password}
              onChange={(e) =>
                setInputVal({ ...inputVal, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
