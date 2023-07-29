'use client';
import React from 'react';
import ObstaclePair from '../ObstaclePair/ObstaclePair';
import styles from './ObstacleCourse.module.css';
import useGameContext from '@/hooks/useGameContext';
import { GameStatus } from '../GameProvider/GameProvider';
import useCollisionDetectionContext from '@/hooks/useCollisionDetectionContext';
import { CollisionDetectionActionType } from '../CollisionDetectionProvider/CollisionDetectionProvider';

interface Obstacle {
  id: number;
}

const TIME_TO_CROSS_HUNDRED_PIXELS = 500; //ms
const TIME_TO_SPAWN = 1500; //ms

export default function ObstacleCourse() {

  const [obstacles, setObstacles] = React.useState<Obstacle[]>([]);
  const [state] = useGameContext();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [obstacleSpeed, setObstacleSpeed] = React.useState(0);
  const [, collisionDetectionDispatch] = useCollisionDetectionContext();

  const gameStatus = state.status;

  //calculate the speed of the obstacles
  React.useEffect(() => {
    const width = wrapperRef.current?.offsetWidth;
    if (!width) return;
    setObstacleSpeed((width / 100) * TIME_TO_CROSS_HUNDRED_PIXELS);
  }, []);

  //spawn obstacles
  React.useEffect(() => {
    if (gameStatus !== GameStatus.Playing) return;

    const intervalId = setInterval(() => {
      const id = Math.random();
      setObstacles(obs => [...obs, { id }]);
    }, TIME_TO_SPAWN);

    return () => clearInterval(intervalId);
  }, [gameStatus]);

  //clear obstacles on reset
  React.useEffect(() => {
    if (gameStatus !== GameStatus.Reset) return;

    setObstacles([]);
  }, [gameStatus, obstacles]);

  const removeObstacle = React.useCallback((id: number) => {
    setObstacles(obs => obs.filter(o => o.id !== id));
    collisionDetectionDispatch({ type: CollisionDetectionActionType.RemoveObstacle, id });
  }, []);

  const style = React.useMemo(() => ({
    '--obstacle-speed': obstacleSpeed,
    '--obstacle-animation-state': gameStatus === GameStatus.Playing ? 'running' : 'paused'
  } as React.CSSProperties), [obstacleSpeed, gameStatus]);

  return (
    <div ref={wrapperRef} style={style} className={styles.wrapper}>
      {obstacles.map(({ id }) => (
        <div onAnimationEnd={() => removeObstacle(id)} key={id} className={styles.obstacle}>
          <ObstaclePair id={id} />
        </div>
      ))}
    </div>
  );
}