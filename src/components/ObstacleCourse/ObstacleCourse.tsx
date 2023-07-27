'use client';
import React from 'react';
import ObstaclePair from '../ObstaclePair/ObstaclePair';
import styles from './ObstacleCourse.module.css';

export default function ObstacleCourse() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.obstacle}>
        <ObstaclePair />
      </div>

      {/* {[0, 1, 2, 3, 4].map((t, i) => (

          
        ))} */}
    </div>
  );
}