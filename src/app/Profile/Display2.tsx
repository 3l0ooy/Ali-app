// src/app/Profile/UserInfoDisplay.tsx

import React from 'react';
import styles from "./page.module.css";
import Skill from './Skill/Skill';

const UserInfoDisplay2 = ({ auditTatio, totalDown, totalUp }) => {
    // console.log("fuck", userData.tatal)

    
      return (
        <div className={styles.Half2}>
          <h3>Your Audit Ratio ➝ {auditTatio}</h3>
            <h3>your total up {totalUp}</h3>
            <h3>your total down {totalUp} </h3>
            <h1>your last autdits ?? </h1>
            <h1>your audit ?????</h1>
          <ul>
                {/* <p>Total Up: {item.totalUp}</p> */}
                {/* <p>Total Down: {item.totalDown}</p> */}
          </ul>
        </div>
      );

};

export default UserInfoDisplay2;
