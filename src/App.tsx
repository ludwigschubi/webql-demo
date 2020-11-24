import React from "react";
import { BaseStyles } from "@primer/components";
import styles from "./App.module.css";
import Profile from "./components/Profile";

function App() {
  return (
    <div className={styles.main}>
      <BaseStyles>
        <Profile />
      </BaseStyles>
    </div>
  );
}

export default App;
