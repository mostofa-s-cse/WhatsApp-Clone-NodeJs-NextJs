import { useStateProvider } from "@/context/StateContext"; // Import useStateProvider hook from StateContext
import { reducerCases } from "@/context/constants"; // Import reducerCases from constants
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes"; // Import CHECK_USER_ROUTE from ApiRoutes
import { firebaseAuth } from "@/utils/FirebaseConfig"; // Import firebaseAuth from FirebaseConfig
import axios from "axios"; // Import axios for making HTTP requests
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import GoogleAuthProvider and signInWithPopup from firebase/auth
import Image from "next/image"; // Import Image component from next/image
import { useRouter } from "next/router"; // Import useRouter hook from next/router
import React, { useEffect } from "react"; // Import React
import { FcGoogle } from "react-icons/fc"; // Import FcGoogle icon from react-icons

function Login() {
  const router = useRouter(); // Initialize useRouter hook
  const [{userInfo,newUser}, dispatch] = useStateProvider(); // Use useStateProvider hook to access state and dispatch

  useEffect(() => {
    // console.log({userInfo,newUser});
    if(userInfo?.id && !newUser) router.push("/")
  }, [userInfo,newUser])
  

  const handleLogin = async () => {
    // Define handleLogin function for handling login
    const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider
    try {
      const { user } = await signInWithPopup(firebaseAuth, provider); // Sign in with Google popup and get user info
      const { displayName: name, email, photoURL: profilePicture } = user; // Extract user info
      // console.log("User", { user });
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email }); // Check if user exists in the database

        if (!data.status) {
          // If user does not exist
          dispatch({
            // Dispatch action to set new user flag
            type: reducerCases.SET_NEW_USER,
            newUser: true,
          });

          dispatch({
            // Dispatch action to set user info
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profilePicture,
              status: "",
            },
          });

          router.push("/onboarding"); // Redirect to onboarding page
        } else {
          const { id, name, email, profilePicture, status } = data.data;
          dispatch({
            // Dispatch action to set user info
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profilePicture,
              status,
            },
          });
          router.push("/");
        }
      }
    } catch (err) {
      // Handle errors
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="WhatsApp" height={300} width={300} />{" "}
        {/* Display WhatsApp logo */}
        <span className="text-6xl">WhatsApp</span>{" "}
        {/* Display WhatsApp title */}
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded"
        onClick={handleLogin} // Call handleLogin function on button click
      >
        <FcGoogle className="text-4xl" /> {/* Display Google icon */}
        <span className="text-white text-2xl">Login with Google</span>{" "}
        {/* Display login text */}
      </button>
    </div>
  );
}

export default Login; // Export Login component
