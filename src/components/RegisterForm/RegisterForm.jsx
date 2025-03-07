import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import LoginSidebar from "../Login/LoginSidebar";
import Btn from "../Btn/Btn";
import { EmailAtom, PasswordAtom, UsernameAtom } from "../Atoms";
import { GDPRConsent } from "../GDPRConsent";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [message, setMessage] = useState(""); // Använd en separat state för meddelanden

  const handleConsentChange = (e) => {
    setConsentGiven(e.target.checked);

    if (e.target.checked) {
      setMessage("Du har godkänt lagringen av dina data!");
    } else {
      setMessage("Du måste godkänna att vi lagrar dina uppgifter!");
    }
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    // Manuell validering av email och samtycke
    if (!email) {
      setMessage("Email-fältet får inte vara tomt!");
      return;
    }
    if (!username) {
      setMessage("Username-fältet får inte vara tomt!");
      return;
    }

    if (!password) {
      setMessage("Password-fältet får inte vara tomt!");
      return;
    }

    if (!consentGiven) {
      setMessage("Du måste godkänna att vi lagrar dina uppgifter!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (response.ok) {
        setMessage("Registrering lyckades!");
      } else {
        setMessage("Registreringen misslyckades. Försök igen.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Registreringen misslyckades. Försök igen.");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerWrapper}>
        <form className={styles.form} onSubmit={handleRegisterClick}>
          <h2 className={styles.title}>Register</h2>
          <EmailAtom email={email} onEmailChange={setEmail} />
          <UsernameAtom username={username} onUsernameChange={setUsername} />
          <PasswordAtom password={password} onPasswordChange={setPassword} />
          <GDPRConsent
            isChecked={consentGiven}
            onConsentChange={handleConsentChange}
          />
          <Btn
            type="submit"
            text="Register"
            icon={<MdOutlineAccountCircle />}
          />
          {message && (
            <p
              className={`${styles.message} ${
                message.includes("lyckades") ? styles.success : styles.error
              }`}
            >
              {message} {/* Använd message istället för message */}
            </p>
          )}
        </form>
        <a className={styles.link} href="login">
          Already have an account? Go to login
        </a>
      </div>
      <LoginSidebar />
    </div>
  );
};

export default RegisterForm;
