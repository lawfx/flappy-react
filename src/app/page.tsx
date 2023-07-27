import styles from './page.module.css';
import Background from '@/components/Background/Background';
import Character from '@/components/Character/Character';
import ObstacleCourse from '@/components/ObstacleCourse/ObstacleCourse';

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <Background />
      <ObstacleCourse />
      <Character />
    </main>
  )
}
