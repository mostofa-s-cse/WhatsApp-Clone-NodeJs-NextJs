import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Onboarding() {
  const router = useRouter(); // Initialize useRouter hook
  const [{ userInfo, newUser }, dispatch] = useStateProvider(); // Get userInfo and newUser from state context

  // Initialize state variables for name, about, and image
  const [name, setName] = useState(userInfo?.name || ""); 
  const [about, setAbout] = useState(""); 
  const [image, setImage] = useState(userInfo?.profilePicture || "/default_avatar.png"); 

  // Redirect logic based on newUser and userInfo
  useEffect(() => {
    if (!newUser &&  !userInfo?.email) router.push("/login");
     else if (!newUser && userInfo?.email) router.push("/");
  },[newUser, userInfo, router]);

  // Handler to onboard the user
  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image
        });
        if (data.status) {
          // Dispatch action to update newUser state
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });

          // Dispatch action to update userInfo state
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id:data.user.id,
              name,
              email,
              profilePicture: image,
              status: about,
            },
          });

          // Redirect to the main page
          router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Validate user details
  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };


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
        <span className="text-3xl md:text-6xl xs:mt-4 sm:mt-5 md:mt-0 lg:mt-0">
          WhatsApp
        </span>
      </div>
      <div className="text-xl md:text-2xl mt-4">Create your profile</div>
      <div className="flex flex-col md:flex-row gap-6 mt-6 items-center">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label /> {/* Input component for name */}
          <Input name="About" state={about} setState={setAbout} label /> {/* Input component for about */}
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} /> {/* Avatar component with image and setImage props */}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded"
          onClick={onboardUserHandler}
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
