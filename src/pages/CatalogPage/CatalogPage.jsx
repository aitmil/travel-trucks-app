import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import TruckList from '../../components/TruckList/TruckList';
import Filter from '../../components/Filter/Filter';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

import {
  selectLoading,
  selectError,
  selectTrucks,
} from '../../redux/trucks/selectors';
import { selectFilters } from '../../redux/filters/selectors';
import { fetchTrucks } from '../../redux/trucks/operations';

import css from './CatalogPage.module.css';

export default function CatalogPage() {
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const trucks = useSelector(selectTrucks);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrucks({ page: 1, filters, reset: true }));
  }, [dispatch, filters]);

  return (
    <main className={css.container}>
      <Filter />
      {isLoading && <Loader />}
      {isError && <Error />}
      <div className={css.wrapper}>
        {trucks.length > 0 && <TruckList />}
        <LoadMoreBtn />
      </div>
    </main>
  );
}
