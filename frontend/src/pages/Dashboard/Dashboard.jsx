import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../service/userService";

function Dashboard() {
  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    photo: "",
    tglLahir: "",
    noTelp: "",
    alamat: "",
    job: "",
  });

  const [data, setData] = useState([]);

  const getAllUser = async () => {
    try {
      const res = await getUser();

      console.log("RESPONSE : ", res.data);
      setData(res.data);

      const newDate = new Date(res.data[0].userInformation.tglLahir)
        .toISOString()
        .split("T")[0];

      setInputForm({
        name: res.data[0].name,
        email: res.data[0].email,
        photo: res.data[0].userInformation.photo,
        tglLahir: newDate,
        noTelp: res.data[0].userInformation.noTelp,
        alamat: res.data[0].userInformation.alamat,
        job: res.data[0].userInformation.job,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("photo", inputForm.photo);
    formData.append("tglLahir", inputForm.tglLahir);
    formData.append("noTelp", inputForm.noTelp);
    formData.append("alamat", inputForm.address);
    formData.append("job", inputForm.job);

    try {
      //   const res = await postForm(formData);
      //   if (res) {
      //     alert("CREATE DATA SUCCESS!");
      //     navigate("/login");
      //   }
    } catch (error) {
      alert(error.message);
      console.log("ERR:", error);
    }
  };

  if (data.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full h-screen flex items-center flex-col ">
      <h1 className="text-2xl font-bold mt-10 mb-5">
        Welcome... {data[0].name}
      </h1>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-[500px] my-5"
      >
        <div className="mb-3 ">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            value={inputForm.name}
            onChange={(e) =>
              setInputForm({ ...inputForm, name: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            value={inputForm.email}
            onChange={(e) =>
              setInputForm({ ...inputForm, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="default_size"
          >
            Choice Your Photo
          </label>
          <input
            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-2 pl-2"
            id="default_size"
            type="file"
            required
            onChange={(e) =>
              setInputForm({ ...inputForm, photo: e.target.files[0] })
            }
          />
        </div>

        <div className="mb-3 ">
          <label
            htmlFor="tglLahir"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date Of Birth
          </label>
          <input
            type="date"
            id="tglLahir"
            value={inputForm.tglLahir}
            onChange={(e) =>
              setInputForm({ ...inputForm, tglLahir: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tglLahir"
            required
          />
        </div>

        <div className="mb-3 ">
          <label
            htmlFor="noTelp"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            No Telp
          </label>
          <input
            type="number"
            id="noTelp"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="No Telp"
            value={inputForm.noTelp}
            onChange={(e) =>
              setInputForm({ ...inputForm, noTelp: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3 ">
          <label
            htmlFor="alamat"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="alamat"
            value={inputForm.alamat}
            onChange={(e) =>
              setInputForm({ ...inputForm, alamat: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="job"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Job
          </label>
          <select
            id="job"
            value={inputForm.job}
            onChange={(e) =>
              setInputForm({ ...inputForm, job: e.target.value })
            }
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled selected>
              Choose Your Job
            </option>
            <option value="Programmer">Programmer</option>
            <option value="Admin">Admin</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Designer">Designer</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
