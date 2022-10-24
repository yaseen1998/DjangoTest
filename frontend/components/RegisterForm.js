import React, { useState } from 'react'
import axios from "axios";
import { message } from "antd";
import cookie from "react-cookies";
import {useRouter} from "next/router";

export default function RegisterForm() {
  let router = useRouter();
    const handleSubmit = (e) => {
      message.loading({ content: "Loading...", key: "loading" });
        e.preventDefault();
        if(e.target.password.value === e.target.confirmpassword.value){
        const user = {
          username: e.target.username.value,
          password: e.target.password.value,
          email: e.target.email.value,
        };
    
        axios
          .post("http://localhost:8000/contract/register/", user)
          .then((res) => {
            cookie.save("token", res.data.access, { path: "/" });
            router.push("/contract");
            message.success({ content: "Success!", key: "loading" });
          })
          .catch((err) => {
            message.error({ content: "Invalid username or password", key: "loading" });
          
          });
        }else{
            message.error("Password does not match");
        }
      };
  return (
    <form onSubmit={handleSubmit} className="w-[50%] m-auto">
    <p className="mb-4 capitalize">
      Please create your account
    </p>
    <div className='grid grid-cols-2 gap-2'>

    
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
      <input
        type="text"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="email"
        name="email"
        placeholder="email"
        required
      />
    </div>
    <div className="mb-4 ">
        <input
          type="text" 
          className="form-control block  w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
    </div>
    <div className="mb-4 ">
        <input
          type="text" 
          className="form-control block  w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="Confirm Password"
          required
        />
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
        Register
      </button>
    </div>
  </form>
  )
}
