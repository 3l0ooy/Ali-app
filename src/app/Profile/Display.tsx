// src/app/Profile/UserInfoDisplay.tsx

import React from 'react';
import styles from "./page.module.css";
import Skill from './Skill/Skill';

const UserInfoDisplay = ({ userData, transactionData, auditData, userXP }) => {
    return (
    <div className={styles.Half}>
        <div className={styles.levels}>
        {transactionData && (
           <h3>Your Level  ➝  {transactionData[0]?.amount || 'N/A'} </h3>
        )}
           <h3>Your ar an ➝ </h3> 
           <h3>Your Total XP ➝ {userXP || 'N/A'}</h3>
        </div>
        <div className={styles.Skill}>
            <Skill  />
        </div>
    </div>
    )

};

export default UserInfoDisplay;

// {transactionData[0]?.amount || 'N/A'}
    //     <div>
    //         <div>
    //             <h1 id="name">Welcome, {userData[0]?.firstName || 'N/A'} {userData[0]?.lastName || 'N/A'}!</h1>
    //             <p id="username">👤 {userData[0]?.login || 'N/A'}</p>
    //             <p id="userid">🆔 {userData[0]?.id || 'N/A'}</p>
    //             <p id="email">📩 {userData[0]?.email || 'N/A'}</p>
    //             <p id="campus">🌐 {userData[0]?.campus || 'N/A'}</p>
    //         </div>
    //         {transactionData && (
    //             <div>
    //                 <h2>Latest Transaction Amount: {transactionData[0]?.amount || 'N/A'}</h2>
    //             </div>
    //         )}
    //         {auditData && (
    //             <div>
    //                 <h2>Valid Audits:</h2>
    //                 {auditData.validAudits && auditData.validAudits.nodes.length > 0 ? (
    //                     auditData.validAudits.nodes.map((audit: any) => (
    //                         <p key={audit.group.captainLogin}>{audit.group.captainLogin}: {audit.group.path}</p>
    //                     ))
    //                 ) : (
    //                     <p>No valid audits available.</p>
    //                 )}
    //                 <h2>Failed Audits:</h2>
    //                 {auditData.failedAudits && auditData.failedAudits.nodes.length > 0 ? (
    //                     auditData.failedAudits.nodes.map((audit: any) => (
    //                         <p key={audit.group.captainLogin}>{audit.group.captainLogin}: {audit.group.path}</p>
    //                     ))
    //                 ) : (
    //                     <p>No failed audits available.</p>
    //                 )}
    //             </div>
    //         )}
    //     </div>
    // );