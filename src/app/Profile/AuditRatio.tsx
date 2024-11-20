import React from 'react';
import styles from './page.module.css';

const AuditRatio: React.FC<{ auditRatio: number; totalUp: number; totalDown: number }> = ({ auditRatio, totalUp, totalDown }) => {
    return (
        <div className={styles.auditContainer}>
            <h3 className={styles.auditTitle}>Audits ratio</h3>
            <div className={styles.progressBar}>
                <div className={styles.progressDone} style={{ width: '40%' }}></div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressReceived} style={{ width: '60%' }}></div>
            </div>
            <div className={styles.auditRatio}>
                <span className={styles.ratioNumber}>{auditRatio}</span>
                <span className={styles.ratioText}>Careful buddy!</span>
            </div>
            <div className={styles.auditInfo}>
                <div className={styles.auditData}>{totalUp} MB<br />Done ↑</div>
                <div className={styles.auditData}>{totalDown} MB<br />Received ↓</div>
            </div>
        </div>
    );
};

export default AuditRatio;
