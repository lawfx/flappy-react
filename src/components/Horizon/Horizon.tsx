import React from 'react';
import Building, { MINIMUM_BUILDING_WIDTH, BuildingType } from '../Building/Building';
import styles from './Horizon.module.css';
import { randomIntFromInterval } from '@/helpers/helpers';
import useElementWidth from '@/hooks/useElementWidth';

export default function Horizon() {
  const [buildings, setBuildings] = React.useState<BuildingType[]>([]);
  const refToMeasure = useElementWidth((width: number) => {
    const buildingsNeeded = Math.ceil(width / MINIMUM_BUILDING_WIDTH);
    const buildingPool = Object.values(BuildingType);
    const buildingsToSpawn = [];
    for (let i = 0; i < buildingsNeeded; i++) {
      const randNum = randomIntFromInterval(0, buildingPool.length - 1);
      buildingsToSpawn.push(buildingPool[randNum]);
    }
    setBuildings(buildingsToSpawn);
  }, []);

  return (
    <div ref={refToMeasure} className={styles.wrapper}>
      {buildings.map((b, i) => (
        <Building type={b} key={i} />
      )
      )}
    </div>
  );
}