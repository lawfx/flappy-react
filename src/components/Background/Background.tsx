import styles from './Background.module.css';

export default function Background() {
  return (
    <div className={styles.environment}>
      <div className={styles.sky}></div>
      <div className={styles.grass}></div>
      <div className={styles.ground}></div>
    </div>
  );
}