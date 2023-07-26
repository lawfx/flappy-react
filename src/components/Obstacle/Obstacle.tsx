import styles from './Obstacle.module.css';

interface ObstacleProps {
  height: number;
}

export default function Obstacle({ height }: ObstacleProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cap}></div>
      <div className={styles.pipe}></div>
    </div>
  );
}