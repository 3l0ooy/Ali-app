// src/app/Profile/UserInfo.tsx

import styles from "./page.module.css";
"use client";

import React, { useEffect, useState } from 'react';
import { USER_INFO_QUERY, TRANSACTION_QUERY, AUDIT_QUERY , TOTAL_XP, User_Skill, Audit_Ratio} from './Query';
import UserInfoDisplay from './Display';
import Skill from "./Skill/Skill";
import UserInfoDisplay2 from "./Display2";

let auditTatio: null = null
let totalUp: null = null 
let totalDown: null = null

const UserInfo: React.FC = () => {

    const [userAudit, setUserAudit] = useState<any>(null)
    const [userSkill, setUserSkill] = useState<any>(null)
    const [ userXP, setUserXP] = useState<any>(null)
    const [userData, setUserData] = useState<any>(null);
    const [transactionData, setTransactionData] = useState<any>(null);
    const [auditData, setAuditData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchData = async (query: string) => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt || jwt.split(".").length !== 3) {
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
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                setErrorMessage("Failed to fetch data.");
                return;
            }

            const result = await response.json();
            if (result.errors) {
                setErrorMessage("GraphQL Errors: " + result.errors.map((error: { message: any; }) => error.message).join(", "));
                return;
            }

            return result.data;
        } catch (error) {
            setErrorMessage("Error fetching data");
        }
    };

    const fetchUserInfo = async () => {
        const data = await fetchData(USER_INFO_QUERY);
        if (data) {
            setUserData(data.user);
        }
    };

    const fetchTransactionInfo = async () => {
        const data = await fetchData(TRANSACTION_QUERY);
        if (data) {
            setTransactionData(data.transaction);
        }
    };

    const fetchAuditInfo = async () => {
        const data = await fetchData(AUDIT_QUERY);
        if (data) {
            setAuditData(data.user);
        }
    };
    const fetchTotalXP = async () => {
        const data = await fetchData(TOTAL_XP);
        if (data) {
            setUserXP(data.transaction_aggregate?.aggregate?.sum?.amount)
        }
    };
    const fetchUserSkill = async () => {
        const data = await fetchData(User_Skill);
        if (data) {
            setUserSkill(data)
        }
    }
    const fetchUserAudit = async () => {
        const data = await fetchData(Audit_Ratio)
        if (data) {
            setUserAudit(data)
        }


    }
    // console.log("sayed", userAudit)

    useEffect(() => {
        if (userAudit) {
            auditTatio = userAudit.user[0].auditRatio
             totalUp = userAudit.user[0].totalUp
             totalDown = userAudit.user[0].totalDown
            console.log("sayed")
        }
    })

    useEffect(() => {
        fetchUserAudit();
        fetchUserSkill();
        fetchUserInfo();
        fetchTransactionInfo();
        fetchAuditInfo();
        fetchTotalXP();
    }, []);

    return (
        <div>
            {errorMessage && <div id="error-message">{errorMessage}</div>}
            {userData && <UserInfoDisplay userData={userData} transactionData={transactionData} auditData={auditData} userXP={userXP} userdkill={userSkill} />}
            {userData && <UserInfoDisplay2  auditTatio={auditTatio} totalDown={totalDown} totalUp={totalUp}/>}

        </div>
    );
};

export default UserInfo;
