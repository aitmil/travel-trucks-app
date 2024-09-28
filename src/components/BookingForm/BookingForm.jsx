import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BookingSchema } from '../../js/validation';
import css from './BookingForm.module.css';
import axios from 'axios';

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, actions) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/bookings', values);
      toast.success('Booking successful!');
      actions.resetForm();
    } catch {
      toast.error('Booking error!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={css.section}>
      <h4 className={css.title}>Book your campervan now</h4>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={{ name: '', email: '', date: '', comment: '' }}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form} autoComplete="off">
            <Field
              className={css.input}
              type="text"
              name="name"
              placeholder="Name*"
            />
            <ErrorMessage className={css.error} name="name" component="span" />

            <Field
              className={css.input}
              type="email"
              name="email"
              placeholder="Email*"
            />
            <ErrorMessage className={css.error} name="email" component="span" />

            <Field
              className={css.input}
              type="date"
              name="date"
              placeholder="Booking date*"
            />
            <ErrorMessage className={css.error} name="date" component="span" />

            <Field
              className={css.textarea}
              as="textarea"
              name="comment"
              placeholder="Comment"
            />
            <ErrorMessage
              className={css.error}
              name="comment"
              component="span"
            />

            <button className={css.btn} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
