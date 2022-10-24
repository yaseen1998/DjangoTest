/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Image from "next/image";
import RegisterForm from "../../components/RegisterForm";

export default function Register() {
  return (
    <>
      <section className=" m-auto h-[100vh] bg-gradient-to-r from-violet-600 ">
        <div className="py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="w-full">
              <div className="block bg-white shadow-lg rounded-lg w-[50%] m-auto">
                <div className="relative">
                  <div className="m-auto ">
                    <div className="md:p-12 md:mx-6 m-auto">
                      <div className="text-center">
                        <Image
                          className="mx-auto bg-[#14426a] p-2 rounded  w-48"
                          src="/login.jpg"
                          height={200}
                          width={200}
                          alt="logo"
                          objectFit="contain"
                        />
                        <h4 className="text-xl text-[#f17a3f] font-semibold mt-1 mb-12 pb-1">
                          {" "}
                          Register Page
                        </h4>
                      </div>
                        <RegisterForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
