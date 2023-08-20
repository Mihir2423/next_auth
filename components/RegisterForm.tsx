"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post("/api/register", formData);
      if (res.status === 200) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      } else {
        setError("User registration failed.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={`grid place-items-center h-screen`}>
      <div className={`shadow-lg p-5 border-t-4 border-green-400 rounded-lg`}>
        <h1 className={`font-bold text-xl my-4`}>Register</h1>
        <form onSubmit={handleSubmit} className={`flex flex-col gap-3`}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className={`bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md `}
          >
            Register
          </button>
          {error && (
            <div
              className={`bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2`}
            >
              {error}
            </div>
          )}
          <Link className={`text-sm mt-3 text-right`} href={"/"}>
            {"Already have an account?"}{" "}
            <span className={`underline`}>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
