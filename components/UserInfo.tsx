"use client";

import { useSession, signOut } from "next-auth/react";
import React from "react";

type Props = {};

type Session = {
  expires: string;
  user: {
    name: string;
    email: string;
  };
};

const UserInfo = (props: Props) => {
  const { data: res } = useSession();
  const session = res as Session;

  return (
    <div className={`grid place-items-center h-screen`}>
      <div
        className={`shadow-lg flex flex-col gap-2 my-6 p-8 bg-zinc-600/10 rounded-sm`}
      >
        <div>
          Name: <span className={`font-bold`}>{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className={`font-bold`}>{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className={`bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md`}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
