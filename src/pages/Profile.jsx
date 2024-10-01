import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/";
      } else {
        const uid = user.uid;
        try {
          const querySnapshot = await getDoc(doc(db, "users", uid));
          if (querySnapshot.exists()) {
            setUserDetails(querySnapshot.data());
          }
        } catch (error) {
          console.error(error.message);
          toast.error("Failed to fetch user data.", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "light",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have successfully logged out.", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f5f5dc]">
      <div className="profile-wrapper w-[90%] md:w-[50vw] h-[90%] md:h-[65vh] bg-[#ffff] border-[#EFEFBA] drop-shadow-xl flex flex-col items-center justify-center space-y-6 p-6">
        {userDetails ? (
          <div className="text-center">
            <img src="/assets/images/logo.png" className="w-16 mx-auto mb-4" alt="User Logo" />
            <h1 className="font-bold text-[#CECE48] text-2xl">{userDetails.name}</h1>
            <h2 className="text-gray-700">{userDetails.email}</h2>
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="rounded-lg bg-[#dfdf69] hover:scale-110 w-fit px-10 py-2 transition-transform text-black font-bold"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-gray-500 text-xl">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
