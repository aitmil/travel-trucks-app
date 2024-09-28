import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import TruckList from '../../components/TruckList/TruckList';
import Filter from '../../components/Filter/Filter';

import {
  selectLoading,
  selectError,
  selectTotal,
  selectFilteredTrucks,
} from '../../redux/trucks/selectors';
import { fetchTrucks } from '../../redux/trucks/operations';

import css from './CatalogPage.module.css';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const total = useSelector(selectTotal);
  const filteredTrucks = useSelector(selectFilteredTrucks);

  const [currentPage, setCurrentPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const perPage = 4;

  useEffect(() => {
    dispatch(fetchTrucks(currentPage));
    setShowBtn(Math.round(total / perPage) !== currentPage);
  }, [dispatch, currentPage, total]);

  const handleLoadMore = () => {
    if (filteredTrucks.length < total) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <main className={css.container}>
      <Filter />
      {isLoading && <Loader />}
      {isError && <Error />}
      <div className={css.wrapper}>
        {filteredTrucks.length > 0 && <TruckList />}
        {showBtn && filteredTrucks.length > 0 && !isLoading && (
          <button onClick={handleLoadMore} className={css.loadMore}>
            Load More
          </button>
        )}
      </div>
    </main>
  );
}
