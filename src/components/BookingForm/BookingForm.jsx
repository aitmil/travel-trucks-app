import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import ReactDatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import { BookingSchema } from '../../js/validation';
import css from './BookingForm.module.css';

export default function BookingForm() {
  const [placeholder, setPlaceholder] = useState('Booking date*');

  const mockPostRequest = values => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: 'Success' });
      }, 1000);
    });
  };

  const handleSubmit = async (values, actions) => {
    try {
      await mockPostRequest(values);
      toast.success('Booking successful!');
      actions.resetForm();
    } catch {
      toast.error('Booking error!');
    }
  };

  return (
    <section className={css.section}>
      <h4 className={css.title}>Book your campervan now</h4>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: '', email: '', date: null, comment: '' }}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className={css.form} autoComplete="off">
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.input} ${
                  errors.name && touched.name ? css.inputError : ''
                }`}
                type="text"
                name="name"
                placeholder="Name*"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.fieldWrapper}>
              <Field
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ''
                }`}
                type="email"
                name="email"
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            <ReactDatePicker
              name={'date'}
              selected={values.date}
              onChange={date => setFieldValue('date', date)}
              dateFormat="dd-MM-yyyy"
              minDate={subDays(new Date(), 0)}
              placeholderText={placeholder}
              onFocus={() => setPlaceholder('Select a date after today')}
              onBlur={() => {
                if (!values.date) setPlaceholder('Booking date*');
              }}
              className={`${css.input} ${
                errors.date && touched.date ? css.inputError : ''
              }`}
              calendarClassName={css.customCalendar}
              popperClassName={css.popper}
              dayClassName={() => css.day}
              monthClassName={() => css.month}
            />

            <ErrorMessage name="date" component="span" className={css.error} />

            <div className={css.fieldWrapper}>
              <Field
                as="textarea"
                className={`${css.textarea} ${
                  errors.comment && touched.comment ? css.inputError : ''
                }`}
                name="comment"
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css.error}
              />
            </div>

            <button className={clsx(css.btn, 'btn')} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
