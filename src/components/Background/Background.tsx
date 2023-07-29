import useGameContext from '@/hooks/useGameContext';
import Horizon from '../Horizon/Horizon';
import styles from './Background.module.css';
import { GameStatus } from '../GameProvider/GameProvider';

export default function Background() {
  const [state] = useGameContext();

  const gameStatus = state.status;

  const grassStyle = { '--grass-animation-state': gameStatus === GameStatus.Ended ? 'paused' : 'running' } as React.CSSProperties;

  return (
    <div className={styles.environment}>
      <div className={styles.sky}>
        <Horizon />
      </div>
      <div style={grassStyle} className={styles.grass}></div>
      <div className={styles.ground}></div>
    </div>
  );
}