import Obstacle from '../Obstacle/Obstacle';
import styles from './ObstaclePair.module.css';
import { randomIntFromInterval } from '../../helpers/helpers';
import React from 'react';
import useCollisionDetectionContext from '@/hooks/useCollisionDetectionContext';
import { CollisionDetectionActionType } from '../CollisionDetectionProvider/CollisionDetectionProvider';

interface ObstaclePairProps {
  id: number;
}

export default function ObstaclePair({ id }: ObstaclePairProps) {

  const [topPipeHeight, setTopPipeHeight] = React.useState(0);
  const scoreAreaRef = React.useRef(null);
  const topObstacleRef = React.useRef(null);
  const bottomObstacleRef = React.useRef(null);
  const [, dispatch] = useCollisionDetectionContext();

  React.useEffect(() => {
    dispatch({ type: CollisionDetectionActionType.AddObstacle, id, scoreAreaRef: scoreAreaRef.current, topRef: topObstacleRef.current, bottomRef: bottomObstacleRef.current });
  }, []);

  React.useEffect(() => {
    setTopPipeHeight(randomIntFromInterval(20, 50));
  }, []);

  const style = { '--top-pipe-height': topPipeHeight } as React.CSSProperties;

  return (
    <div style={style} className={styles.wrapper}>
      <div ref={topObstacleRef} className={styles.top}>
        <Obstacle flipped={true} />
      </div>
      <div className={styles.passage}>
        <div ref={scoreAreaRef} className={styles.scoreArea}></div>
      </div>
      <div ref={bottomObstacleRef} className={styles.bottom}>
        <Obstacle />
      </div>
    </div>
  );
}