import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React from "react";

function Onboarding() {
  const [{ userInfo }] = useStateProvider();
  // console.log("userInfo:", userInfo);
  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-6xl">WhatsApp</span>
      </div>
      <div className="text-2xl">Create your profile</div>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          {userInfo ? userInfo.name : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
