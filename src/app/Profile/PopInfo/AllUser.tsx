// src/app/Profile/Dashpord.tsx
import styles from "./pop.module.css"


import React, { useEffect, useState } from 'react';

const AllUser: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchUserInfo = async () => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt || jwt.split(".").length !== 3) {
            console.error("Invalid Token");
            setErrorMessage("Invalid Token");
            return;
        }
        
        try {
            const response = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                    {
                        user {
                            attrs
                             }
                    }

                    `,
                }),
            });

            if (!response.ok) {
                setErrorMessage("Failed to fetch user data.");
                return;
            }

            const result = await response.json();
            console.log("User Info:", JSON.stringify(result, null, 2));
            
            if (result.errors) {
                console.error("GraphQL Errors:", result.errors);
                setErrorMessage("GraphQL Errors: " + result.errors.map((error: { message: any; }) => error.message).join(", "));
                return;
            }

            const userInfo = result.data?.user;
            if (Array.isArray(userInfo) && userInfo.length > 0) {
                setUserData(userInfo[0]);
            } else {
                setErrorMessage("No user info");
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            setErrorMessage("Error fetching user info");
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div>
            {errorMessage && <div id="error-message">{errorMessage}</div>}
            {userData && (
                <div>
                    <h1 id="name">Welcome, {userData.attrs.firstName || 'N/A'} {userData.attrs. lastName || 'N/A'}!</h1>
                    <p id="username" className={styles.username}>👤 {userData.attrs.firstName || 'N/A'}</p>
                    <p id="email">📩 {userData.attrs.email || 'N/A'}</p>
                    <p id="campus">🌐 {userData.attrs.addressCountry || 'N/A'}</p>
                    <p id="campus"> {userData.attrs.genders || 'N/A'}</p>
                    <p id="campus"> {userData.attrs.CPRnumber || 'N/A'}</p>
                    <p id="campus"> {userData.attrs.PhoneNumber || 'N/A'}</p>
                    <p id="campus"> {userData.attrs.dateOfBirth || 'N/A'}</p>
                    <p id="campus"> {userData.attrs.qualification || 'N/A'}</p>
                    <p id="campus"> {userData.attrs.Degree || 'N/A'}</p>

                    

                </div>
            )}
        </div>
    );
};

export default AllUser;
