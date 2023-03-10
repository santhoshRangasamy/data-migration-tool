import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Signin.module.scss";
import { GoogleButton } from "react-google-button";
import { auth, provider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
 

  const [user, setUser] = useState(null);
  const handleSignIn = async () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data.user.email.slice(-22) === "@trikatechnologies.com");
      setUser(data.user);
      dispatch({ type: "user", payload: data.user });
      router.push("/RenderMain");
      console.log(userData);
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Image src="/signin.jpg" alt="My Image" width={300} height={250} />
        <div className={styles.title}>
          Welcome!
          <GoogleButton onClick={handleSignIn} />
        </div>
      </div>
    </div>
  );
}

export default Signin;
