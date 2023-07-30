import useGameContext from '@/hooks/useGameContext';
import Horizon from '../Horizon/Horizon';
import styles from './Background.module.css';
import { GameStatus } from '../GameProvider/GameProvider';
import useElementWidth from '@/hooks/useElementWidth';
import React from 'react';

const TIME_TO_CROSS_HUNDRED_PIXELS = 1000; //ms

export default function Background() {
  const [state] = useGameContext();
  const [grassSpeed, setGrassSpeed] = React.useState(0);

  //calculate the speed of the obstacles
  const wrapperRef = useElementWidth((width: number) => {
    setGrassSpeed((width / 100) * TIME_TO_CROSS_HUNDRED_PIXELS);
  }, []);

  const gameStatus = state.status;

  const grassStyle = { '--grass-speed': grassSpeed, '--grass-animation-state': gameStatus === GameStatus.Ended ? 'paused' : 'running' } as React.CSSProperties;

  return (
    <div ref={wrapperRef} className={styles.environment}>
      <div className={styles.sky}>
        <Horizon />
      </div>
      <div style={grassStyle} className={styles.grass}></div>
      <div className={styles.ground}></div>
    </div>
  );
}