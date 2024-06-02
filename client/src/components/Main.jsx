import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants"; // Ensure you import reducerCases

function Main() {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  // Redirect to login if needed
  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin, router]);

  // Function to check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) {
        setRedirectLogin(true); // Set redirect flag if no current user
        return;
      }

      // Check user info if currentUser exists
      if (!userInfo && currentUser.email) {
        try {
          const { data } = await axios.post(CHECK_USER_ROUTE, {
            email: currentUser.email, // Use currentUser.email
          });

          if (!data.status) {
            router.push("/login");
            return;
          }

          const { id, name, email, profilePicture, status } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profilePicture,
              status,
            },
          });
        } catch (error) {
          console.error("Error checking user:", error);
          setRedirectLogin(true); // Set redirect flag on error
        }
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [userInfo, dispatch, router]);

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />
      <Empty />
    </div>
  );
}

export default Main;
