'use client';
import React from 'react';
import styles from './Character.module.css';
import Image from 'next/image';
import flappyAvatar from '../../../public/flappy.svg';
import useGameContext from '@/hooks/useGameContext';
import useWindowClick from '@/hooks/useWindowClick';
import { GameStateActionType, GameStatus } from '../GameProvider/GameProvider';

enum CharState {
  IDLE,
  RISING,
  FALLING
}

const CharStateToDirectionClassMap: { [key in CharState]: string } = {
  [CharState.IDLE]: '',
  [CharState.RISING]: 'lookUp',
  [CharState.FALLING]: 'lookDown'
}

const CHARACTER_DROP_RATE = .02;
const CHARACTER_BUMP_RATE = .2;

export default function Character() {

  const [charPos, setCharPos] = React.useState(0.5);
  const [charState, setCharState] = React.useState(CharState.IDLE);
  const { state, dispatch } = useGameContext();

  const gameStatus = state.status;

  const bumpCharacter = React.useCallback(() => {
    setCharPos(pos => {
      const newPos = pos - CHARACTER_BUMP_RATE;
      return newPos >= 0 ? newPos : 0;
    });
    setCharState(CharState.RISING);
  }, []);

  const dropCharacter = React.useCallback(() => {
    if (gameStatus !== GameStatus.Playing) return;

    const predictedNewCharPos = charPos + CHARACTER_DROP_RATE;
    const newCharPos = predictedNewCharPos <= 1 ? predictedNewCharPos : 1;
    setCharPos(newCharPos);
    setCharState(CharState.FALLING);
    if (newCharPos === 1) {
      dispatch({ type: GameStateActionType.EndGame });
    }
  }, [gameStatus, charPos]);

  useWindowClick(() => {
    if (gameStatus === GameStatus.Ended) return;
    if (gameStatus === GameStatus.Waiting) {
      dispatch({ type: GameStateActionType.StartGame });
    }

    bumpCharacter();
  }, [gameStatus]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      dropCharacter();
    }, 33);

    return () => clearInterval(intervalId);
  }, [dropCharacter]);

  const charPosStyle = { '--character-position': charPos } as React.CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div className={styles.characterWrapper}>
        <div style={charPosStyle} className={`${styles.character} ${styles[CharStateToDirectionClassMap[charState]]}`}>
          <Image width={75} height={75} src={flappyAvatar} alt='' />
        </div>
      </div>
    </div>
  );
}