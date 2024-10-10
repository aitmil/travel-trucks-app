import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectFilters } from '../../redux/filters/selectors';
import { selectTotal, selectTrucks } from '../../redux/trucks/selectors';
import { fetchTrucks } from '../../redux/trucks/operations';
import { clearTrucks } from '../../redux/trucks/slice';
import { scrollDown } from '../../js/scroll';

import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn() {
  const [currentPage, setCurrentPage] = useState(1);
  const trucks = useSelector(selectTrucks);
  const filters = useSelector(selectFilters);
  const total = useSelector(selectTotal);

  const limit = 4;
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(1);
    dispatch(fetchTrucks({ page: 1, filters, reset: true }));
  }, [filters, dispatch]);

  const handleLoadMore = () => {
    dispatch(
      fetchTrucks({
        page: currentPage + 1,
        filters,
        reset: false,
      })
    )
      .unwrap()
      .then(scrollDown)
      .catch(() => {
        dispatch(clearTrucks());
      });

    setCurrentPage(prev => prev + 1);
  };

  return (
    <>
      {currentPage < totalPages && trucks.length > 0 && (
        <button onClick={handleLoadMore} className={css.loadMore}>
          Load More
        </button>
      )}
    </>
  );
}
