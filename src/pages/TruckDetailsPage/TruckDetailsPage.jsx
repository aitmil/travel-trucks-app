import { useEffect, useState, useRef, Suspense } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Loader from '../../components/Loader/Loader';
import TruckInfo from '../../components/TruckInfo/TruckInfo';
import BookingForm from '../../components/BookingForm/BookingForm';

import {
  selectTruck,
  selectLoading,
  selectError,
} from '../../redux/trucks/selectors';
import { fetchTruckById } from '../../redux/trucks/operations';

import css from './TruckDetailsPage.module.css';

export default function TruckDetailsPage() {
  const dispatch = useDispatch();
  const truck = useSelector(selectTruck);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchTruckById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!isLoading && truck && !isLoaded) {
      setIsLoaded(true);
      navigate('features');
    }
  }, [isLoading, truck, isLoaded, navigate]);

  const getLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <main className={css.container}>
        {isLoading && <Loader />}
        {truck && <TruckInfo truck={truck} />}
        <ul className={css.listLinks}>
          <li className={css.itemLink}>
            <NavLink
              className={getLinkClass}
              to="features"
              state={{ ...location.state }}
            >
              Features
            </NavLink>
          </li>
          <li className={css.itemLink}>
            <NavLink
              className={getLinkClass}
              to="reviews"
              state={{ ...location.state }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <BookingForm />
        <Suspense fallback={isLoading && <Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
