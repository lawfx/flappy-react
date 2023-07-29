import styles from './EndScreenScoreBoard.module.css';

interface EndScreenScoreBoardProps {
  currentScore: number;
  highScore: number;
}

export default function EndScreenScoreBoard({ currentScore, highScore }: EndScreenScoreBoardProps) {
  return (
    <div className={styles.wrapper}>
      <span>SCORE</span>
      <span className={styles.number}>{currentScore}</span>
      <span>BEST</span>
      <span className={styles.number}>{highScore}</span>
    </div>
  );
}