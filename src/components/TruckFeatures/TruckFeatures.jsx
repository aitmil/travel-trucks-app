import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectTruck } from '../../redux/trucks/selectors';
import { fetchTruckById } from '../../redux/trucks/operations';
import { formatDimension } from '../../js/utils';

import icons from '../../assets/icons.svg';
import css from './TruckFeatures.module.css';

export default function TruckFeatures() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const truck = useSelector(selectTruck);

  const {
    radio = false,
    microwave = false,
    petrol = false,
    gas = false,
    water = false,
    transmission = '',
    kitchen = false,
    AC = false,
    TV = false,
    bathroom = false,
    form = '',
    length = '',
    width = '',
    height = '',
    tank = '',
    consumption = '',
  } = truck || {};

  useEffect(() => {
    dispatch(fetchTruckById(id));
  }, [dispatch, id]);

  return (
    <section className={css.section}>
      <ul className={css.list}>
        {transmission === 'automatic' && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-diagram`} />
            </svg>
            <p>Automatic</p>
          </li>
        )}
        {petrol && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-fuel-pump`} />
            </svg>
            <p>Petrol</p>
          </li>
        )}
        {gas && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-fuel-pump`} />
            </svg>
            <p>Gas</p>
          </li>
        )}
        {kitchen && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-cup-hot`} />
            </svg>
            <p>Kitchen</p>
          </li>
        )}
        {microwave && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-tv`} />
            </svg>
            <p>Microwave</p>
          </li>
        )}
        {AC && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-wind`} />
            </svg>
            <p>AC</p>
          </li>
        )}
        {TV && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-tv`} />
            </svg>
            <p>TV</p>
          </li>
        )}
        {radio && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-ui-radios`} />
            </svg>
            <p>Radio</p>
          </li>
        )}
        {bathroom && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-bi_droplet`} />
            </svg>
            <p>Bathroom</p>
          </li>
        )}
        {water && (
          <li className={css.item}>
            <svg className={css.icon} width={20} height={20}>
              <use xlinkHref={`${icons}#icon-bi_droplet`} />
            </svg>
            <p>Water</p>
          </li>
        )}
      </ul>

      <h4 className={css.title}>Vehicle details</h4>

      <ul className={css.detailsList}>
        <li className={css.detailsItem}>
          <h5 className={css.details}>Form</h5>
          <p className={css.details}>{form}</p>
        </li>
        <li className={css.detailsItem}>
          <h5 className={css.details}>Length</h5>
          <p className={css.details}>{formatDimension(length)}</p>
        </li>
        <li className={css.detailsItem}>
          <h5 className={css.details}>Width</h5>
          <p className={css.details}>{formatDimension(width)}</p>
        </li>
        <li className={css.detailsItem}>
          <h5 className={css.details}>Height</h5>
          <p className={css.details}>{formatDimension(height)}</p>
        </li>
        <li className={css.detailsItem}>
          <h5 className={css.details}>Tank</h5>
          <p className={css.details}>{formatDimension(tank)}</p>
        </li>
        <li className={css.detailsItem}>
          <h5 className={css.details}>Consumption</h5>
          <p className={css.details}>{consumption}</p>
        </li>
      </ul>
    </section>
  );
}
