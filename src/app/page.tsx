// app/page.js
"use client"; // This line is important for client components

import { useState } from "react";
import styles from "./page.module.css";
import Login from "./components/Login";


export default function Home() {

  return (
    <main className={styles.main}>
            <Login />

    </main>
  );
}
