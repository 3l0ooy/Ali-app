import React, { useEffect, useState } from 'react';
import styles from "./pop.module.css";

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
        <div className={styles.container}>
            {errorMessage && <div id="error-message">{errorMessage}</div>}
            {userData && (
                <div className={styles.div}>
                    <h1 id="name" className={styles.name}>Welcome, {userData.attrs.firstName || 'N/A'} {userData.attrs.lastName || 'N/A'}!</h1>
                    <p id="username" className={styles.paragraph}>👤 {userData.attrs.firstName || 'N/A'}</p>
                    <p id="email" className={styles.paragraph}>📩  {userData.attrs.email || 'N/A'}</p>
                    <p id="campus" className={styles.paragraph}>🌐  {userData.attrs.addressCountry || 'N/A'}</p>
                    <p id="gender" className={styles.paragraph}>🧑‍🤝‍🧑 Gender: {userData.attrs.genders || 'N/A'}</p>
                    <p id="cpr" className={styles.paragraph}>👤 CPR Number: {userData.attrs.CPRnumber || 'N/A'}</p>
                    <p id="phone" className={styles.paragraph}>📱 Phone: {userData.attrs.PhoneNumber || 'N/A'}</p>
                    <p id="dob" className={styles.paragraph}>🎂 Date of Birth: {userData.attrs.dateOfBirth || 'N/A'}</p>
                    <p id="qualification" className={styles.paragraph}>🎓 Qualification: {userData.attrs.qualification || 'N/A'}</p>
                    <p id="degree" className={styles.paragraph}>🎓 Degree: {userData.attrs.Degree || 'N/A'}</p>
                </div>
            )}
        </div>
    );
    
};

export default AllUser;
