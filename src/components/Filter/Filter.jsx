import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

import { fetchTrucks } from '../../redux/trucks/operations';
import { selectFilters } from '../../redux/filters/selectors';
import { clearTrucks } from '../../redux/trucks/slice';

import icons from '../../assets/icons.svg';
import { formatString, equipmentIcons, typeIcons } from '../../js/utils';

import css from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const { truckEquipment } = useSelector(selectFilters);

  const initialValues = {
    location: '',
    form: '',
    transmission: '',
    truckEquipment: {
      kitchen: false,
      AC: false,
      TV: false,
      bathroom: false,
    },
  };

  const handleSubmit = values => {
    console.log('Form submitted with values:', values);
    dispatch(clearTrucks());

    const filters = {
      location: values.location,
      form: values.form,
      transmission: values.transmission,

      truckEquipment: {
        kitchen: values.truckEquipment.kitchen,
        AC: values.truckEquipment.AC,
        TV: values.truckEquipment.TV,
        bathroom: values.truckEquipment.bathroom,
      },
    };

    console.log('Dispatching fetchTrucks with filters:', filters);

    dispatch(fetchTrucks({ page: 1, filters }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => handleSubmit(values)}
    >
      {({ values, setFieldValue }) => {
        const handleTruckEquipmentChange = equipment => {
          setFieldValue('truckEquipment', {
            ...values.truckEquipment,
            [equipment]: !values.truckEquipment[equipment], // Toggle the boolean value
          });
        };

        return (
          <Form className={css.section}>
            <h2 className={css.title}>Location</h2>
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
                placeholder="City"
                className={css.input}
              />
            </div>

            <h2 className={css.title}>Filters</h2>

            <h3
              className={css.filterTitle}
              id="vehicle-equipment-checkbox-group"
            >
              Vehicle Equipment
            </h3>
            <div
              className={css.filterList}
              role="group"
              aria-labelledby="vehicle-equipment-checkbox-group"
            >
              <div>
                <input
                  type="checkbox"
                  name="transmission"
                  value="automatic"
                  checked={values.transmission === 'automatic'}
                  id={'checkbox-transmission'}
                  onChange={() => {
                    const newTransmission =
                      values.transmission === 'automatic' ? '' : 'automatic';
                    setFieldValue('transmission', newTransmission);
                  }}
                  className={css.hiddenCheckbox}
                />
                <label
                  htmlFor={'checkbox-transmission'}
                  className={clsx(
                    css.checkboxWrapper,
                    values.transmission === 'automatic'
                      ? clsx(css.activeFilter, css.btnFilter)
                      : clsx(css.inActiveFilter, css.btnFilter)
                  )}
                >
                  <svg className={css.icon} width={32} height={32}>
                    <use xlinkHref={`${icons}#icon-diagram`} />
                  </svg>
                  Automatic
                </label>
              </div>

              {Object.keys(truckEquipment).map(equipment => (
                <div key={equipment}>
                  <input
                    type="checkbox"
                    name={`truckEquipment.${equipment}`}
                    checked={values.truckEquipment[equipment]}
                    onChange={() => handleTruckEquipmentChange(equipment)}
                    id={`checkbox-${equipment}`} // Ensure ID is unique and linked to label
                    className={css.hiddenCheckbox} // Hidden checkbox styling
                  />
                  <label
                    htmlFor={`checkbox-${equipment}`} // Link label with the checkbox
                    className={clsx(
                      css.checkboxWrapper,
                      values.truckEquipment[equipment]
                        ? css.activeFilter
                        : css.inActiveFilter
                    )}
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
            <div
              className={css.filterList}
              role="group"
              aria-labelledby="vessel-type-group"
            >
              {['van', 'fullyIntegrated', 'alcove'].map((type, index) => (
                <label key={index} className={css.checkboxWrapper}>
                  <Field
                    type="radio"
                    name="form"
                    value={type}
                    className={
                      values.form === type
                        ? clsx(css.activeFilter, css.btnFilter)
                        : clsx(css.inActiveFilter, css.btnFilter)
                    }
                  />
                  <svg className={css.icon} width={32} height={32}>
                    <use xlinkHref={`${icons}#${typeIcons[type]}`} />
                  </svg>
                  {formatString(type)}
                </label>
              ))}
            </div>

            <button type="submit" className={clsx(css.btn, 'btn')}>
              Filter
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
