import Obstacle from '../Obstacle/Obstacle';
import styles from './ObstaclePair.module.css';
import { randomIntFromInterval } from '../../helpers/helpers';
import React from 'react';

export default function ObstaclePair() {

  const [topPipeHeight, setTopPipeHeight] = React.useState(0);

  React.useEffect(() => {
    setTopPipeHeight(randomIntFromInterval(20, 50));
  }, []);

  const style = { '--top-pipe-height': topPipeHeight } as React.CSSProperties;

  return (
    <div style={style} className={styles.wrapper}>
      <div className={styles.top}>
        <Obstacle flipped={true} />
      </div>
      <div className={styles.bottom}>
        <Obstacle />
      </div>
    </div>
  );
}