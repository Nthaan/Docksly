"use client";
import React, { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("Jane Doe");
  const [username, setUsername] = useState("Jane123");
  const [email, setEmail] = useState("testing@mail.com");
  const [department, setDepartment] = useState("XX");

  const handleSubmit = () => {
    console.log({ name, username, email, department });
    alert("Profile updated!");
  };

  return (
    <div className="bg-[#95ABA0] p-8 rounded-2xl max-w-6xl mx-auto mt-10">
      <div className="mb-6 pb-2 border-b border-gray-500 w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold text-[#FAF7E6]">Profile</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT: Form */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-[#FAF7E6] font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#FAF7E6] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#FAF7E6] font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#FAF7E6] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#FAF7E6] font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#FAF7E6] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#FAF7E6] font-semibold">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#FAF7E6] focus:outline-none"
            />
          </div>

          <div className="flex justify-center gap gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#3E5A67] text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
            <button className="bg-[#3E5A67] text-white px-4 py-2 rounded-md">
              Change Password
            </button>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/3">
          <div className="w-60 h-60 bg-[#FAF7E6] rounded-full" />
          <button className="mt-6 bg-[#3E5A67] text-white px-12 py-2 rounded-md">
            Change Photo
          </button>
        </div>
      </div>
    </div>
  );
}
