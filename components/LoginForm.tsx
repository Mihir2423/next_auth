"use client";

import Link from "next/link";
import React from "react";
import { FormData } from "./RegisterForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormData = Omit<FormData, "name">;

type Props = {};

const LoginForm = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`grid place-items-center h-screen`}>
      <div className={`shadow-lg p-5 border-t-4 border-green-400 rounded-lg`}>
        <h1 className={`font-bold text-xl my-4`}>Login</h1>
        <form onSubmit={handleSubmit} className={`flex flex-col gap-3`}>
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
            Login
          </button>
          {error && (
            <div
              className={`bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2`}
            >
              {error}
            </div>
          )}
          <Link className={`text-sm mt-3 text-right`} href={"/register"}>
            {"Don't have an account?"}{" "}
            <span className={`underline`}>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
