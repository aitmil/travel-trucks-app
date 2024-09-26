import Loader from '../../components/Loader/Loader';
import TruckList from '../../components/TruckList/TruckList';

import css from './CatalogPage.module.css';
import Filter from '../../components/Filter/Filter';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/trucks/selectors';

export default function CatalogPage() {
  const isLoading = useSelector(selectLoading);

  return (
    <main className={css.container}>
      <Filter />
      {isLoading && <Loader />}
      <TruckList />
    </main>
  );
}
