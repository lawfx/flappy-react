'use client';
import React from 'react';
import ObstaclePair from '../ObstaclePair/ObstaclePair';
import styles from './ObstacleCourse.module.css';
import useGameContext from '@/hooks/useGameContext';
import { GameStatus } from '../GameProvider/GameProvider';

interface Obstacle {
  id: string;
}

const TIME_TO_CROSS_HUNDRED_PIXELS = 500; //ms
const TIME_TO_SPAWN = 1500; //ms

export default function ObstacleCourse() {

  const [obstacles, setObstacles] = React.useState<Obstacle[]>([]);
  const { state } = useGameContext();
  const ref = React.useRef<HTMLDivElement>(null);
  const [obstacleTime, setObstacleTime] = React.useState(0);

  React.useEffect(() => {
    const width = ref.current?.offsetWidth;
    if (!width) return;
    setObstacleTime((width / 100) * TIME_TO_CROSS_HUNDRED_PIXELS);
  }, []);

  const gameStatus = state.status;

  React.useEffect(() => {
    if (gameStatus !== GameStatus.Playing) return;

    const intervalId = setInterval(() => {
      const id = crypto.randomUUID();
      setObstacles(obs => [...obs, { id }]);
    }, TIME_TO_SPAWN);

    return () => clearInterval(intervalId);
  }, [gameStatus]);

  const removeElement = React.useCallback((id: string) => {
    setObstacles(obs => obs.filter(o => o.id !== id));
  }, []);

  const style = React.useMemo(() => ({ '--obstacle-cross-time': obstacleTime } as React.CSSProperties), [obstacleTime]);

  return (
    <div ref={ref} style={style} className={styles.wrapper}>
      {obstacles.map(({ id }) => (
        <div onAnimationEnd={() => removeElement(id)} key={id} className={styles.obstacle}>
          <ObstaclePair />
        </div>
      ))}
    </div>
  );
}