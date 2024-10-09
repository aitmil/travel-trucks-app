import * as Yup from 'yup';

export const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .min(3, 'Name is too short')
    .max(50, 'Name is too long'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  bookingDate: Yup.date().required('Booking date is required').nullable(),
  comment: Yup.string().trim().max(500, 'Comment is too long'),
});

export const LocationSchema = Yup.object().shape({
  location: Yup.string().matches(
    /^[A-Z][a-z]+,\s[A-Z][a-z]+$/,
    'Must be in the format: Kyiv, Ukraine'
  ),
});
