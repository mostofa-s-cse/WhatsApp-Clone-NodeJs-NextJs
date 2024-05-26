import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React, { useState } from "react";

function Onboarding() {
  const [{ userInfo }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row xs:mt-4 sm:mt-10 md:mt-6 lg:mt-12">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp"
          height={300}
          width={300}
          className="w-32 h-32 md:w-60 md:h-60"
        />
        <span className="text-3xl md:text-6xl xs:mt-4 sm:mt-5 md:mt-0 lg:mt-0">WhatsApp</span>
      </div>
      <div className="text-xl md:text-2xl mt-4">Create your profile</div>
      <div className="flex flex-col md:flex-row gap-6 mt-6 items-center">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
