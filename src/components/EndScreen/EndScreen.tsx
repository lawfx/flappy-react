import useGameContext from '@/hooks/useGameContext';
import EndScreenScoreBoard from '../EndScreenScoreBoard/EndScreenScoreBoard';
import styles from './EndScreen.module.css';
import React from 'react';
import { GameStateActionType, GameStatus } from '../GameProvider/GameProvider';

export default function EndScreen() {

  const [state, dispatch] = useGameContext();

  const resetGame = React.useCallback(() => {
    dispatch({ type: GameStateActionType.ResetGame });
  }, []);

  return (
    <>
      {
        state.status === GameStatus.Ended &&
        <div className={styles.wrapper}>
          <div className={styles.scoreBoardWrapper}>
            <EndScreenScoreBoard currentScore={state.currentScore} highScore={state.highestScore} />
          </div>
          <div className={styles.buttonWrapper}>
            <button onClick={resetGame} className={styles.button}>
              <span className={styles.buttonText}>RESTART</span>
            </button>
          </div>
        </div>
      }
    </>
  );
}