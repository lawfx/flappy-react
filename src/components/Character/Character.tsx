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
  [CharState.IDLE]: 'idle',
  [CharState.RISING]: 'lookUp',
  [CharState.FALLING]: 'lookDown'
}

const CHARACTER_SIZE = 65; //px
const CHARACTER_DROP_RATE = .04;
const CHARACTER_BUMP_RATE = .35;
const INITIAL_CHAR_POSITION = 0.5;
const DROP_INTERVAL = 33; //ms
const TIME_PASS_TO_SET_AS_FALLING = 300; //ms

export default function Character() {

  const [charPos, setCharPos] = React.useState(INITIAL_CHAR_POSITION);
  const [charState, setCharState] = React.useState(CharState.IDLE);
  const [fallingForTime, setFallingForTime] = React.useState(0);
  const [gameState, gameStateDispatch] = useGameContext();
  const [_, collisionDetectionDispatch] = useCollisionDetectionContext();
  const ref = React.useRef(null);

  const gameStatus = gameState.status;

  const bumpCharacter = React.useCallback(() => {
    setCharPos(pos => {
      const newPos = pos - CHARACTER_BUMP_RATE;
      return newPos >= 0 ? newPos : 0;
    });
    setFallingForTime(0);
    setCharState(CharState.RISING);
  }, []);

  const dropCharacter = React.useCallback(() => {
    if (gameStatus !== GameStatus.Playing && gameStatus !== GameStatus.Ended) return;

    const predictedNewCharPos = charPos + CHARACTER_DROP_RATE;
    const newCharPos = predictedNewCharPos <= 1 ? predictedNewCharPos : 1;
    setCharPos(newCharPos);
    const newFallingForTime = fallingForTime + DROP_INTERVAL;
    setFallingForTime(newFallingForTime);
    if (newFallingForTime >= TIME_PASS_TO_SET_AS_FALLING) {
      setCharState(CharState.FALLING);
    }
    if (newCharPos === 1) {
      gameStateDispatch({ type: GameStateActionType.EndGame });
    }
  }, [gameStatus, charPos, fallingForTime]);

  //setup character for collision detection
  React.useEffect(() => {
    collisionDetectionDispatch({ type: CollisionDetectionActionType.SetCharacter, ref: ref.current });
  }, []);

  //reset character position
  React.useEffect(() => {
    if (gameStatus !== GameStatus.Reset) return;

    setCharPos(INITIAL_CHAR_POSITION);
    setCharState(CharState.IDLE);
  }, [gameStatus]);

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
    }, DROP_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dropCharacter]);

  const charPosStyle = { '--character-position': charPos } as React.CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div className={styles.characterWrapper}>
        <div ref={ref} style={charPosStyle} className={styles.characterBoundingBox}>
          <div className={`${styles.character} ${styles[CharStateToDirectionClassMap[charState]]}`}>
            <Image width={CHARACTER_SIZE} height={CHARACTER_SIZE} src={flappyAvatar} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}