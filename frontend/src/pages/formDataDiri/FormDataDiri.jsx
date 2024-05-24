import React, { useState } from "react";
import AlertVerify from "../../components/AlertVerify";
import { postForm } from "../../service/userService";
import { useNavigate } from "react-router-dom";

function FormDataDiri() {
  const [inputForm, setInputForm] = useState({
    photo: "",
    tglLahir: "",
    noTelp: "",
    address: "",
    job: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("photo", inputForm.photo);
    formData.append("tglLahir", inputForm.tglLahir);
    formData.append("noTelp", inputForm.noTelp);
    formData.append("alamat", inputForm.address);
    formData.append("job", inputForm.job);

    try {
      const res = await postForm(formData);

      if (res) {
        alert("CREATE DATA SUCCESS!");
        navigate("/login")
      }
    } catch (error) {
      alert(error.message);
      console.log("ERR:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center flex-col ">
      <AlertVerify />
      <h1 className="text-2xl font-bold mt-10 mb-5">Silahkan Isi Data Diri</h1>

      <form onSubmit={handleSubmit} autoComplete="off" className="w-[500px]">
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
            onChange={(e) => {
              setInputForm({ ...inputForm, photo: e.target.files[0] });
            }}
          />
        </div>

        <div className="mb-3 ">
          <label
            htmlFor="email"
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
            placeholder="email"
            //   value={inputVal.email}
            //   onChange={(e) => setInputVal({ ...inputVal, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3 ">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            No Telp
          </label>
          <input
            type="number"
            id="name"
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
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="number"
            id="address"
            value={inputForm.address}
            onChange={(e) =>
              setInputForm({ ...inputForm, address: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="address"
            // value={inputVal.name}
            // onChange={(e) => setInputVal({ ...inputVal, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an Job
          </label>
          <select
            id="countries"
            value={inputForm.job}
            onChange={(e) =>
              setInputForm({ ...inputForm, job: e.target.value })
            }
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose Your Job</option>
            <option value="Programmer">Programmer</option>
            <option value="Admin">Admin</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Designer">Designer</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormDataDiri;
