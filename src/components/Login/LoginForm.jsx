import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { MdLogin } from "react-icons/md";
import Btn from "../Btn/Btn.jsx";
import LoginSidebar from "./LoginSidebar.jsx";
import { EmailAtom, PasswordAtom } from "../Atoms";
import { Header } from "../Header";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        credentials: "include", // for sending cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        setMessage("Login successful");
        setToken(accessToken);
        setIsLoggedIn(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
      setMessage("Login failed. Try again");
    }
  };

  if (isLoggedIn) {
    return <Header token={token} />;
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <form className={styles.form} onSubmit={handleLoginClick}>
          <h2 className={styles.title}>Login</h2>
          <EmailAtom email={email} onEmailChange={setEmail} />
          <PasswordAtom password={password} onPasswordChange={setPassword} />
          <Btn text="Login" type="submit" icon={<MdLogin />} />
          {message && (
            <p
              className={`${styles.message} ${
                message.includes("successful") ? styles.success : styles.error
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
      <LoginSidebar />
    </div>
  );
};

export default LoginForm;
