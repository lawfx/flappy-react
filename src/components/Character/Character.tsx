'use client';
import React from 'react';
import styles from './Character.module.css';
import Image from 'next/image';
import flappyAvatar from '../../../public/flappy.svg';

enum CharState {
  IDLE,
  RISING,
  FALLING
}

const CharStateToDirectionClassMap: { [key in CharState]: string } = {
  [CharState.IDLE]: '',
  [CharState.RISING]: 'look-up',
  [CharState.FALLING]: 'look-down'
}

export default function Character() {

  const [charPos, setCharPos] = React.useState(0);
  const [charState, setCharState] = React.useState(CharState.IDLE);

  React.useEffect(() => {
    function handleClick() {
      setCharPos(pos => pos - 100);
      setCharState(CharState.RISING);
    }

    window.addEventListener('pointerdown', handleClick);

    return () => window.removeEventListener('pointerdown', handleClick);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCharPos(pos => pos < 200 ? pos + 10 : pos);
      setCharState(CharState.FALLING);
    }, 33);

    return () => clearInterval(intervalId);
  }, []);

  const charPosStyle = { '--character-position': charPos } as React.CSSProperties;

  return (
    <div style={charPosStyle} className={styles.wrapper}>
      <div className={`${styles.character} ${styles[CharStateToDirectionClassMap[charState]]}`}>
        <Image width={100} height={100} src={flappyAvatar} alt='' />
      </div>
    </div >
  );
}