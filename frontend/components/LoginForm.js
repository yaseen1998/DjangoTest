import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import cookie from "react-cookies";
import {useRouter} from "next/router";
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    let router = useRouter();
    const handleSubmit = (e) => {
      message.loading({ content: "Loading...", key: "loading" });
        e.preventDefault();
        const user = {
          username: e.target.username.value,
          password: e.target.password.value,
        };
    
        axios
          .post("http://localhost:8000/contract/login/", user)
          .then((res) => {
            cookie.save("token", res.data.access, { path: "/" });
            message.success({ content: "Success!", key: "loading" });
            router.push("/contract");
          })
          .catch((err) => {
            message.error({ content: "Invalid username or password", key: "loading" });
          });
      };
  return (
    <form onSubmit={handleSubmit} className="w-[50%] m-auto">
    <p className="mb-4 capitalize">
      Please login to your account
    </p>
    <div className="mb-4">
      <input
        type="text"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="username"
        name="username"
        placeholder="Username"
        required
      />
    </div>
    <div className="mb-4">
      <div className="grid m-auto grid-cols-[1fr_30px] gap-1 items-center">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control block  w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <label htmlFor="password" className=" opacity-70">
          {showPassword ? (
            <EyeInvisibleOutlined
              // fontSize="small"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOutlined
              // fontSize="small"
              onClick={() => setShowPassword(true)}
            />
          )}
        </label>
      </div>
    </div>
    <div className="text-center pt-1 mb-12 pb-1">
      <button
        className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
        type="submit"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        style={{
          background:
            "linear-gradient(to right,#f17a3f,#d8363a,#dd3675,#f17a3f)",
        }}
      >
        Log in
      </button>
    </div>
  </form>
  )
}
