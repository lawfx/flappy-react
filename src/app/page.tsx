'use client';
import styles from './page.module.css';
import Background from '@/components/Background/Background';
import Character from '@/components/Character/Character';
import GameProvider from '@/components/GameProvider/GameProvider';
import PlayableArea from '@/components/PlayableArea/PlayableArea';

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <Background />
      <GameProvider>
        <PlayableArea>
          {/* <ObstacleCourse /> */}
          <Character />
        </PlayableArea>
      </GameProvider>
    </main>
  )
}
