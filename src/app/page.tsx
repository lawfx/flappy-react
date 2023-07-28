'use client';
import styles from './page.module.css';
import Background from '@/components/Background/Background';
import Character from '@/components/Character/Character';
import CollisionDetectionProvider from '@/components/CollisionDetectionProvider/CollisionDetectionProvider';
import GameProvider from '@/components/GameProvider/GameProvider';
import ObstacleCourse from '@/components/ObstacleCourse/ObstacleCourse';
import PlayableArea from '@/components/PlayableArea/PlayableArea';
import ScoreCounter from '@/components/ScoreCounter/ScoreCounter';

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <Background />
      <GameProvider>
        <PlayableArea>
          <CollisionDetectionProvider>
            <ObstacleCourse />
            <Character />
          </CollisionDetectionProvider>
          <ScoreCounter />
        </PlayableArea>
      </GameProvider>
    </main>
  )
}
