import React from 'react';
import styles from './Obstacle.module.css';

interface ObstacleProps {
  flipped?: boolean;
}

export default React.memo(function Obstacle({ flipped = false }: ObstacleProps) {
  return (
    <div className={`${styles.wrapper} ${flipped ? styles.flipped : ''}`}>
      <div className={styles.cap}></div>
      <div className={styles.pipe}></div>
    </div>
  );
});