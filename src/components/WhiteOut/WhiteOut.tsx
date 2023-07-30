import useGameContext from '@/hooks/useGameContext';
import styles from './WhiteOut.module.css';
import { GameStatus } from '../GameProvider/GameProvider';

export default function WhiteOut() {
  const [state] = useGameContext();

  return (
    <>{
      state.status === GameStatus.Ended && <div className={styles.whiteout}></div>
    }</>

  );
}