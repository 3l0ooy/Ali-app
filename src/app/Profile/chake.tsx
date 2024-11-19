import React from 'react';
import styles from './ProgressGraph.module.css';

const levels = [
  { level: 0, label: "Aspiring developer" },
  { level: 10, label: "Beginner developer" },
  { level: 20, label: "Apprentice developer" },
  { level: 30, label: "Assistant developer" },
  { level: 40, label: "Basic developer" },
  { level: 50, label: "Junior developer" },
  { level: 55, label: "Confirmed developer" },
  { level: 60, label: "Full-Stack developer" }
];

const ProgressGraph = ({ level }) => {
  // Find the closest level label based on the input level
  const currentLevel = levels.reduce((prev, curr) => (
    Math.abs(curr.level - level) < Math.abs(prev.level - level) ? curr : prev
  ));

  const progressPercentage = (level / 60) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.levels}>
        {levels.map((lvl, index) => (
          <div key={lvl.level} className={styles.levelMarker} style={{ left: `${(lvl.level / 60) * 100}%` }}>
            <div className={styles.levelLabel}>{lvl.label}</div>
            <div className={`${styles.dot} ${lvl.level === currentLevel.level ? styles.activeDot : ''}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressGraph;
