"use client";
import { useState } from "react";
import SignIn from "@/app/_components/Auth/SignIn";
import SignUp from "@/app/_components/Auth/SignUp";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
      {isSignIn ? <SignIn /> : <SignUp />}
      <button onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
      </button>
    </div>
  );
}
