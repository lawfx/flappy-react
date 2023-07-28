import useGameContext from "@/hooks/useGameContext";
import styles from './ScoreCounter.module.css';
import { GameStatus } from "../GameProvider/GameProvider";

export default function ScoreCounter() {
  const [state] = useGameContext();

  return (
    <>{
      state.status === GameStatus.Playing &&
      <div className={styles.wrapper}>
        <span className={styles.score}>{state.currentScore}</span>
      </div>
    }
    </>
  );
}