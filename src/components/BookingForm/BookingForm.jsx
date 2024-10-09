import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import clsx from 'clsx';

import FormField from '../FormField/FormField';
import Datepicker from '../DatePicker/DatePicker';
import { BookingSchema } from '../../js/validation';
import { getItemFromSessionStorage } from '../../js/sessionStorage';

import css from './BookingForm.module.css';

export default function BookingForm() {
  const initialValues = {
    name: getItemFromSessionStorage('name') ?? '',
    email: getItemFromSessionStorage('email') ?? '',
    bookingDate: getItemFromSessionStorage('bookingDate') ?? '',
    comment: getItemFromSessionStorage('comment') ?? '',
  };

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
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form} autoComplete="off">
            <FormField name="name" placeholder="Name*" />
            <FormField name="email" type="email" placeholder="Email*" />
            <Datepicker
              selected={values.bookingDate}
              onChange={date => setFieldValue('bookingDate', date)}
            />
            <FormField
              extraClass="textarea"
              name="comment"
              as="textarea"
              placeholder="Comment"
            />

            <button className={clsx(css.btn, 'btn')} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
