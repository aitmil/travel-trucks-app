import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  setLocation,
  toggleTruckEquipment,
  setTruckType,
} from '../../redux/filters/slice';
import { fetchTrucks } from '../../redux/trucks/operations';
import { selectFilters } from '../../redux/filters/selectors';
import { clearTrucks } from '../../redux/trucks/slice';

import icons from '../../assets/icons.svg';
import { formatString, equipmentIcons, typeIcons } from '../../js/utils';

import css from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const { truckType, truckEquipment } = useSelector(selectFilters);

  const [activeFilters, setActiveFilters] = useState({
    location: '',
    truckType: { ...truckType },
    truckEquipment: { ...truckEquipment },
  });

  const locationRef = useRef('');
  const truckTypeRef = useRef({ ...truckType });
  const truckEquipmentRef = useRef({ ...truckEquipment });

  const handleLocationChange = e => {
    const input = e.target.value;
    locationRef.current = input.split(', ').reverse().join(', ');
    setActiveFilters(prev => ({ ...prev, location: e.target.value }));
  };

  const handleTruckTypeChange = type => {
    const newTruckType = { ...truckTypeRef.current };

    if (newTruckType[type]) {
      newTruckType[type] = false;
    } else {
      Object.keys(newTruckType).forEach(key => {
        newTruckType[key] = false;
      });
      newTruckType[type] = true;
    }

    truckTypeRef.current = newTruckType;

    setActiveFilters(prev => ({
      ...prev,
      truckType: { ...newTruckType },
    }));
  };

  const handleEquipmentToggle = equipment => {
    truckEquipmentRef.current[equipment] =
      !truckEquipmentRef.current[equipment];

    setActiveFilters(prev => ({
      ...prev,
      truckEquipment: {
        ...prev.truckEquipment,
        [equipment]: truckEquipmentRef.current[equipment],
      },
    }));
  };

  const handleSearch = () => {
    dispatch(clearTrucks());
    dispatch(setLocation(locationRef.current));

    Object.keys(truckTypeRef.current).forEach(type => {
      if (truckTypeRef.current[type]) {
        dispatch(setTruckType(type));
      }
    });

    Object.keys(truckEquipmentRef.current).forEach(equipment => {
      if (truckEquipmentRef.current[equipment]) {
        dispatch(toggleTruckEquipment(equipment));
      }
    });

    dispatch(fetchTrucks());
  };

  return (
    <section className={css.section}>
      <h2 className={css.title}>Location</h2>
      <div className={css.inputWrapper}>
        <svg
          className={`${css.inputIcon} ${
            locationRef.current ? css.inputFilled : css.inputEmpty
          }`}
          width={20}
          height={20}
        >
          <use xlinkHref={`${icons}#icon-map`} />
        </svg>
        <input
          type="text"
          placeholder="City"
          onChange={handleLocationChange}
          className={css.input}
        />
      </div>

      <h2 className={css.title}>Filters</h2>

      <h3 className={css.filterTitle}>Vehicle Equipment</h3>
      <ul className={css.filterList}>
        {Object.keys(truckEquipment).map(equipment => (
          <li key={equipment}>
            <button
              onClick={() => handleEquipmentToggle(equipment)}
              className={
                activeFilters.truckEquipment[equipment]
                  ? clsx(css.activeFilter, css.btnFilter)
                  : clsx(css.inActiveFilter, css.btnFilter)
              }
            >
              <svg className={css.icon} width={32} height={32}>
                <use xlinkHref={`${icons}#${equipmentIcons[equipment]}`} />
              </svg>
              {equipment}
            </button>
          </li>
        ))}
      </ul>

      <h3 className={css.filterTitle}>Vehicle Type</h3>
      <ul className={css.filterList}>
        {Object.keys(truckType).map(type => (
          <li key={type} className={css.item}>
            <button
              onClick={() => handleTruckTypeChange(type)}
              className={
                activeFilters.truckType[type]
                  ? clsx(css.activeFilter, css.btnFilter)
                  : clsx(css.inActiveFilter, css.btnFilter)
              }
            >
              {' '}
              <svg className={css.icon} width={32} height={32}>
                <use xlinkHref={`${icons}#${typeIcons[type]}`} />
              </svg>
              {formatString(type)}
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleSearch} className={clsx(css.btn, 'btn')}>
        Search
      </button>
    </section>
  );
}
