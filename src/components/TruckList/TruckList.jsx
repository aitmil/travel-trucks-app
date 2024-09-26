import { useSelector } from 'react-redux';
import css from './TruckList.module.css';
import TruckCard from '../TruckCard/TruckCard';
import { selectFilteredTrucks } from '../../redux/trucks/selectors';

export default function TruckList() {
  const filteredTrucks = useSelector(selectFilteredTrucks);

  return (
    <>
      <ul className={css.list}>
        {filteredTrucks.map(truck => (
          <li className={css.item} key={truck.id}>
            <TruckCard truck={truck} />
          </li>
        ))}
      </ul>
    </>
  );
}
