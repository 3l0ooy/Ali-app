// src/app/Profile/UserInfoDisplay.tsx

import React from 'react';
import styles from "./page.module.css";
import Skill from './Skill/Skill';
import AuditsTable from '../Audit/Audit';
import AuditRatio from './AuditRatio'; // Import the new AuditRatio component

// Define the type for the props
interface UserInfoDisplay2Props {
    auditTatio: number; // Adjust the type as per your actual data type
    totalDown: number;  // Adjust the type as per your actual data type
    totalUp: number;    // Adjust the type as per your actual data type
}

const UserInfoDisplay2: React.FC<UserInfoDisplay2Props> = ({ auditTatio, totalDown, totalUp }) => {
    return (
        <div className={styles.Half2}>
            {/* Use the AuditRatio component */}
            <AuditRatio auditRatio={auditTatio} totalUp={totalUp} totalDown={totalDown} />
            <AuditsTable />
        </div>
    );
};

export default UserInfoDisplay2;
