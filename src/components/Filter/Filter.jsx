import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import { fetchTrucks } from '../../redux/trucks/operations';
import { addFilters, clearFilters } from '../../redux/filters/slice';
import { clearTrucks } from '../../redux/trucks/slice';

import { formatString, equipmentIcons, typeIcons } from '../../js/utils';
import { LocationSchema } from '../../js/validation';
import icons from '../../assets/icons.svg';

import css from './Filter.module.css';
import { selectFilters } from '../../redux/filters/selectors';

export default function Filter() {
  const [trucksFiltered, setTrucksFiltered] = useState(false);
  const filters = useSelector(selectFilters);

  const dispatch = useDispatch();

  const initialValues = {
    location: '',
    transmission: false,
    truckEquipment: [],
    form: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const { location, transmission, truckEquipment, form } = values;

    if (!location && !truckEquipment.length && !form && !transmission) {
      toast.error('At least one filter should be chosen');
      setSubmitting(false);
      return;
    }

    const newFilters = {
      location,
      transmission: transmission ? 'automatic' : '',
      truckEquipment,
      form,
    };

    dispatch(addFilters(newFilters));

    dispatch(fetchTrucks({ page: 1, filters: newFilters, reset: true }))
      .unwrap()
      .then(() => {
        setTrucksFiltered(true);
      })
      .catch(() => {
        dispatch(clearTrucks());
        setTrucksFiltered(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleReset = resetForm => {
    dispatch(clearFilters());
    dispatch(fetchTrucks({ page: 1, filters, reset: true }));
    resetForm();
    setTrucksFiltered(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LocationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, resetForm }) => {
        const isAnyFilterSelected =
          values.location || values.truckEquipment.length > 0 || values.form;

        return (
          <Form className={css.section}>
            <h2 className={css.title}>Location</h2>
            {/* Location Input */}
            <div className={css.inputWrapper}>
              <svg
                className={`${css.inputIcon} ${
                  values.location ? css.inputFilled : css.inputEmpty
                }`}
                width={20}
                height={20}
              >
                <use xlinkHref={`${icons}#icon-map`} />
              </svg>
              <Field
                type="text"
                name="location"
                placeholder="Kyiv, Ukraine"
                className={css.input}
              />
              <ErrorMessage
                name="location"
                component="span"
                className={css.error}
              />
            </div>

            <h2 className={css.title}>Filters</h2>

            <h3
              className={css.filterTitle}
              id="vehicle-equipment-checkbox-group"
            >
              Vehicle Equipment
            </h3>
            {/* Vehicle Equipment checkboxes */}
            <div
              className={css.filterList}
              role="group"
              aria-labelledby="vehicle-equipment-checkbox-group"
            >
              <div>
                <Field
                  type="checkbox"
                  name="transmission"
                  id="checkbox-transmission"
                  className={css.hiddenCheckbox}
                />
                <label
                  htmlFor="checkbox-transmission"
                  className={css.checkboxWrapper}
                >
                  <svg className={css.icon} width={32} height={32}>
                    <use xlinkHref={`${icons}#icon-diagram`} />
                  </svg>
                  Automatic
                </label>
              </div>

              {['kitchen', 'AC', 'TV', 'bathroom'].map(equipment => (
                <div key={equipment}>
                  <Field
                    type="checkbox"
                    name="truckEquipment"
                    value={equipment}
                    id={`checkbox-${equipment}`}
                    className={css.hiddenCheckbox}
                  />
                  <label
                    htmlFor={`checkbox-${equipment}`}
                    className={css.checkboxWrapper}
                  >
                    <svg className={css.icon} width={32} height={32}>
                      <use
                        xlinkHref={`${icons}#${equipmentIcons[equipment]}`}
                      />
                    </svg>
                    <span>{formatString(equipment)}</span>
                  </label>
                </div>
              ))}
            </div>

            <h3 className={css.filterTitle} id="vessel-type-group">
              Vessel Type
            </h3>
            {/* Vehicle Type radio btns */}
            <div
              className={css.filterList}
              role="group"
              aria-labelledby="vessel-type-group"
            >
              {['van', 'fullyIntegrated', 'alcove'].map((type, index) => (
                <div key={index} className={css.filter}>
                  <Field
                    type="radio"
                    name="form"
                    value={type}
                    id={`radio-${type}`}
                    className={css.hiddenCheckbox}
                  />
                  <label
                    htmlFor={`radio-${type}`}
                    className={css.checkboxWrapper}
                  >
                    <svg className={css.icon} width={32} height={32}>
                      <use xlinkHref={`${icons}#${typeIcons[type]}`} />
                    </svg>
                    <span>{formatString(type)}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className={css.btns}>
              <button
                type="submit"
                className={clsx(css.btn, 'btn')}
                disabled={isSubmitting}
              >
                Filter
              </button>

              {isAnyFilterSelected && trucksFiltered && (
                <button
                  onClick={() => handleReset(resetForm)}
                  type="button"
                  className={clsx(css.btn, 'btn')}
                >
                  Reset
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
