// src/app/Profile/page.tsx
"use client"; // Mark the component as a client component

import UserInfo from "./Dashpord";
import InfoModal from "./InfoModal"; // Import the new InfoModal component
import Tops from "./Tops";
import Image from 'next/image';
import Man from "../../../public/Screenshot.png";
import Style from "./page.module.css";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

function Profile() {
    const router = useRouter(); // Initialize the router

    const handleLogout = async () => {
        try {
            await logout();

            router.push('/'); 

            localStorage.clear();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <main>
            <Tops />
            <InfoModal /> {/* Use the InfoModal component */}
            <UserInfo />

            <button className={Style.button1} onClick={handleLogout}>
                Logout
            </button>
        <svg className={Style.logo} height="250" viewBox="20.8 4.2 358.4 391.6" width="2179" xmlns="http://www.w3.org/2000/svg"><g fill="#e535ab"><path d="m57.468 302.66-14.376-8.3 160.15-277.38 14.376 8.3z"/><path d="m39.8 272.2h320.3v16.6h-320.3z"/><path d="m206.348 374.026-160.21-92.5 8.3-14.376 160.21 92.5zm139.174-241.079-160.21-92.5 8.3-14.376 160.21 92.5z"/><path d="m54.482 132.883-8.3-14.375 160.21-92.5 8.3 14.375z"/><path d="m342.568 302.663-160.15-277.38 14.376-8.3 160.15 277.38zm-290.068-195.163h16.6v185h-16.6z"/><path d="m330.9 107.5h16.6v185h-16.6z"/><path d="m203.522 367-7.25-12.558 139.34-80.45 7.25 12.557z"/><path d="m369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8s-22.4-31-12.8-47.7 31-22.4 47.7-12.8c16.8 9.7 22.5 31 12.8 47.7m-278.6-160.9c-9.6 16.7-31 22.4-47.7 12.8s-22.4-31-12.8-47.7 31-22.4 47.7-12.8c16.7 9.7 22.4 31 12.8 47.7m-60.4 160.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.8 9.6-38.1 3.9-47.7-12.8m278.6-160.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.7 9.6-38.1 3.9-47.7-12.8m-109.1 258.8c-19.3 0-34.9-15.6-34.9-34.9s15.6-34.9 34.9-34.9 34.9 15.6 34.9 34.9c0 19.2-15.6 34.9-34.9 34.9m0-321.8c-19.3 0-34.9-15.6-34.9-34.9s15.6-34.9 34.9-34.9 34.9 15.6 34.9 34.9-15.6 34.9-34.9 34.9"/></g></svg>

        </main>
    );
}


async function logout() {
    const token = localStorage.getItem("jwt");

    if (token) {
        try {
            const signoutResponse = await fetch("https://learn.reboot01.com/api/auth/signout", {
                method: "POST",
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            if (signoutResponse.ok) {
                console.log("Successfully signed out!");
            } else {
                const signoutData = await signoutResponse.json();
                console.error("Error signing out:", signoutData);
            }

            const expireResponse = await fetch("https://learn.reboot01.com/api/auth/expire", {
                method: "GET",
                headers: {
                    "x-jwt-token": token,
                },
            });

            if (!expireResponse.ok) {
                const expireData = await expireResponse.json();
                console.error("Error expiring token:", expireData);
                return;
            }
        } catch (error) {
            console.error("Network error:", error);
        }

        localStorage.removeItem("jwt");

    } else {
        console.error("No JWT token found in localStorage.");
    }
}

export default Profile;
