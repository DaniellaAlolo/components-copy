import styles from "./Header.module.css";
import ProfileAtom from "./ProfileAtom";
import TitleAtom from "./TitleAtom";
import SubtitleAtom from "./SubtitleAtom";
import React, { useState } from "react";
import AvatarAtom from "./AvatarAtom";
import { FaBell, FaCog } from "react-icons/fa";
import AvatarDisplayAtom from "./AvatarDisplayAtom";
import Btn from "../Btn/Btn.jsx";
import LoginForm from "../Login/LoginForm.jsx";

const Header = ({
  token,
  title = "AI Assistant",
  subtitle = "Smart Solutions for an Easier Everyday",
  className,
}) => {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setIsLoggedIn(false);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return isLoggedIn ? (
    <>
      <div className={`${styles.headerContainer} ${className}`}>
        <div className={styles.headerLeft}>
          <TitleAtom title={title} />
          <SubtitleAtom subtitle={subtitle} />
        </div>

        <div className={styles.headerRight}>
          <FaBell className={styles.icon} title="Notifications" />
          <FaCog className={styles.icon} title="Settings" />
          <AvatarAtom avatar={avatar} onChangeAvatar={setAvatar} />
          <ProfileAtom userName={userName} />
          <AvatarDisplayAtom avatar={avatar} />
          <Btn text="Logga ut" onLogout={handleLogout} backgroundColor="red" />
        </div>
      </div>
    </>
  ) : (
    <LoginForm />
  );
};

export default Header;
