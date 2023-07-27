import { ReactNode } from "react";
import styles from './PlayableArea.module.css';

interface PlayableArea {
  children: ReactNode;
}

export default function PlayableArea({ children }: PlayableArea) {
  return (
    <div className={styles.wrapper}>{children}</div>
  )
}