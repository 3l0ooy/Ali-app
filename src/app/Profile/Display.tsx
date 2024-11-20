import React, { Suspense } from 'react';
import styles from "./page.module.css";
import Skill from './Skill/Skill';
import ProgressGraph from './chake';

// Define the type for the props
interface TransactionData {
  amount: number;
}

interface UserInfoDisplayProps {
  userData: Record<string, any>; // You can replace `any` with a more specific type if you know the structure of userData
  transactionData: TransactionData[] | null; // Array of transaction objects or null
  auditData: Record<string, any>; // You can replace `any` with a more specific type if you know the structure of auditData
  userXP: number | string; // XP can be a number or string
  userSkill: Record<string, any>; // You can replace `any` with a more specific type if you know the structure of userSkill
}

// Loading component defined in the same file
const Loading: React.FC = () => {
  return <div>Loading...</div>;
};

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({ userData, transactionData, auditData, userXP, userSkill }) => {
  const level = transactionData && transactionData.length > 0 ? transactionData[0].amount : 0;

  return (
    <div className={styles.Half}>
      <div>
        <h1 className={styles.levels}>Your Level ➝ {level === 0 ? 'N/A' : level} </h1>
        <Suspense fallback={<Loading />}>
          <ProgressGraph level={level} />
        </Suspense>
        <h1 className={styles.xp}>Your Total XP ➝ {userXP || 'N/A'}</h1>
      </div>
      <div className={styles.Skill}>
        <Skill />
      </div>
    </div>
  );
};
export default UserInfoDisplay;
