import styles from './page.module.css';
import Background from '@/components/Background/Background';
import Character from '@/components/Character/Character';
import ObstacleCourse from '@/components/ObstacleCourse/ObstacleCourse';
import PlayableArea from '@/components/PlayableArea/PlayableArea';

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <Background />
      <PlayableArea>
        <ObstacleCourse />
        <Character />
      </PlayableArea>
    </main>
  )
}
