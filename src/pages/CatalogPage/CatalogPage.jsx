import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import TruckList from '../../components/TruckList/TruckList';
import Filter from '../../components/Filter/Filter';

import { selectLoading, selectError } from '../../redux/trucks/selectors';
import { fetchTrucks } from '../../redux/trucks/operations';

import css from './CatalogPage.module.css';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTrucks());
  }, [dispatch]);

  return (
    <main className={css.container}>
      <Filter />
      {isLoading && <Loader />}
      {isError ? <Error /> : <TruckList />}
    </main>
  );
}
