import * as Yup from 'yup';

export const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name is too short'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  date: Yup.date()
    .required('Booking date is required')
    .min(new Date(), 'Booking date cannot be in the past'),
  comment: Yup.string().max(500, 'Comment is too long'),
});
