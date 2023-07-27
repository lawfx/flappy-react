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
  [CharState.RISING]: 'lookUp',
  [CharState.FALLING]: 'lookDown'
}

export default function Character() {

  const [charPos, setCharPos] = React.useState(0);
  const [charState, setCharState] = React.useState(CharState.IDLE);

  React.useEffect(() => {
    function handleClick() {
      setCharPos(pos => {
        const newPos = pos - .3;
        return newPos >= 0 ? newPos : 0;
      });
      setCharState(CharState.RISING);
    }

    window.addEventListener('pointerdown', handleClick);

    return () => window.removeEventListener('pointerdown', handleClick);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCharPos(pos => {
        const newPos = pos + .02;
        return newPos <= 1 ? newPos : 1;
      });
      setCharState(CharState.FALLING);
    }, 33);

    return () => clearInterval(intervalId);
  }, []);

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