'use client';
import React from 'react';
import styles from './Character.module.css';
import Image from 'next/image';
import flappyAvatar from '../../../public/flappy.svg';
import useGameContext from '@/hooks/useGameContext';
import useWindowClick from '@/hooks/useWindowClick';
import { GameStateActionType, GameStatus } from '../GameProvider/GameProvider';
import useCollisionDetectionContext from '@/hooks/useCollisionDetectionContext';
import { CollisionDetectionActionType } from '../CollisionDetectionProvider/CollisionDetectionProvider';

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
const INITIAL_CHAR_POSITION = 0.5;

export default function Character() {

  const [charPos, setCharPos] = React.useState(INITIAL_CHAR_POSITION);
  const [charState, setCharState] = React.useState(CharState.IDLE);
  const [gameState, gameStateDispatch] = useGameContext();
  const [_, collisionDetectionDispatch] = useCollisionDetectionContext();
  const ref = React.useRef(null);

  const gameStatus = gameState.status;

  React.useEffect(() => {
    collisionDetectionDispatch({ type: CollisionDetectionActionType.SetCharacter, ref: ref.current });
  }, []);

  React.useEffect(() => {
    if (gameStatus !== GameStatus.Reset) return;

    setCharPos(INITIAL_CHAR_POSITION);
  }, [gameStatus]);

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
      gameStateDispatch({ type: GameStateActionType.EndGame });
    }
  }, [gameStatus, charPos]);

  useWindowClick(() => {
    if (gameStatus === GameStatus.Ended) return;
    if (gameStatus === GameStatus.Waiting) {
      gameStateDispatch({ type: GameStateActionType.StartGame });
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
        <div ref={ref} style={charPosStyle} className={`${styles.character} ${styles[CharStateToDirectionClassMap[charState]]}`}>
          <Image width={75} height={75} src={flappyAvatar} alt='' />
        </div>
      </div>
    </div>
  );
}