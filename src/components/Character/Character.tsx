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
  FALLING,
  DEAD
}

const CharStateToDirectionClassMap: { [key in CharState]: string } = {
  [CharState.IDLE]: 'idle',
  [CharState.RISING]: 'lookUp',
  [CharState.FALLING]: 'lookDown',
  [CharState.DEAD]: 'lookDown'
}

const CHARACTER_SIZE = 65; //px
const CHARACTER_DROP_RATE = 20; //px
const CHARACTER_BUMP_RATE = 150; //px
const DROP_INTERVAL = 33; //ms
const TIME_PASS_TO_SET_AS_FALLING = 300; //ms

export default function Character() {

  const [isShown, setIsShown] = React.useState(false);
  const [charPos, setCharPos] = React.useState(0);
  const [charState, setCharState] = React.useState(CharState.IDLE);
  const [areaHeight, setAreaHeight] = React.useState(0);
  const [fallingForTime, setFallingForTime] = React.useState(0);
  const [gameState, gameStateDispatch] = useGameContext();
  const [_, collisionDetectionDispatch] = useCollisionDetectionContext();
  const ref = React.useRef(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const gameStatus = gameState.status;

  const MAX_HEIGHT = React.useMemo(() => - CHARACTER_SIZE / 2, []);
  const MIN_HEIGHT = React.useMemo(() => areaHeight - CHARACTER_SIZE / 2, [areaHeight]);

  React.useEffect(() => {
    const height = wrapperRef.current!.offsetHeight;
    setAreaHeight(height);
    setCharPos(height / 2);
    collisionDetectionDispatch({ type: CollisionDetectionActionType.SetCharacter, ref: ref.current });
    setIsShown(true);
  }, []);

  const bumpCharacter = React.useCallback(() => {
    setCharPos(pos => {
      const newPos = pos - CHARACTER_BUMP_RATE;
      return newPos >= MAX_HEIGHT ? newPos : MAX_HEIGHT;
    });
    setFallingForTime(0);
    setCharState(CharState.RISING);
  }, []);

  const dropCharacter = React.useCallback(() => {
    if (gameStatus !== GameStatus.Playing && gameStatus !== GameStatus.Ended) return;

    if (charState === CharState.DEAD) return;

    const predictedNewCharPos = charPos + CHARACTER_DROP_RATE;
    const newCharPos = predictedNewCharPos <= MIN_HEIGHT ? predictedNewCharPos : MIN_HEIGHT;
    setCharPos(newCharPos);

    const newFallingForTime = fallingForTime + DROP_INTERVAL;
    setFallingForTime(newFallingForTime);

    if (newFallingForTime >= TIME_PASS_TO_SET_AS_FALLING) {
      setCharState(CharState.FALLING);
    }

    if (newCharPos >= MIN_HEIGHT) {
      setCharState(CharState.DEAD);
      if (gameStatus !== GameStatus.Ended) {
        gameStateDispatch({ type: GameStateActionType.EndGame });
      }
    }
  }, [gameStatus, charPos, charState, fallingForTime]);

  //reset character position
  React.useEffect(() => {
    if (gameStatus !== GameStatus.Reset) return;

    setCharPos(areaHeight / 2);
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

  const charPosStyle = {
    '--character-position': charPos,
    '--character-size': CHARACTER_SIZE,
    '--area-height': areaHeight,
    '--is-shown': isShown ? 'block' : 'none'
  } as React.CSSProperties;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
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