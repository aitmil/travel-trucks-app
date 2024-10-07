import { useSelector } from 'react-redux';
import css from './TruckList.module.css';
import TruckCard from '../TruckCard/TruckCard';
import { selectTrucks } from '../../redux/trucks/selectors';

export default function TruckList() {
  const trucks = useSelector(selectTrucks);

  return (
    <>
      <ul className={css.list}>
        {trucks.map((truck, index) => (
          <li className={css.item} key={index}>
            <TruckCard truck={truck} />
          </li>
        ))}
      </ul>
    </>
  );
}
