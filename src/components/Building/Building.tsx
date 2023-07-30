import React from 'react';
import styles from './Building.module.css';
import { randomIntFromInterval } from '@/helpers/helpers';

interface BuildingProps {
  type: BuildingType;
}

enum BuildingType {
  A = 'a',
  A1 = 'a_1',
  B = 'b',
  B1 = 'b_1',
  B2 = 'b_2',
  C = 'c',
  C1 = 'c_1',
  D = 'd',
  E = 'e',
  F = 'f'
}

const MINIMUM_BUILDING_WIDTH = 70; //px

export default function Building({ type }: BuildingProps) {

  const [height] = React.useState(randomIntFromInterval(50, 300));
  const [color] = React.useState(randomIntFromInterval(0, 360));
  const [light] = React.useState(randomIntFromInterval(0, 100));

  const style = { '--height': height, '--color': `hsl(${color}deg 50% ${light}%)` } as React.CSSProperties;

  return (
    <div style={style} className={`${styles.building} ${styles[type]}`}></div>
  );
}

export { BuildingType, MINIMUM_BUILDING_WIDTH };