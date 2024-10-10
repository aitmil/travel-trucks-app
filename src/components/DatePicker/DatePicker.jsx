import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { enUS } from 'date-fns/locale';
import { format, isToday } from 'date-fns';

import FormField from '../FormField/FormField';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

const Datepicker = ({ onChange, selected }) => {
  const [placeholder, setPlaceholder] = useState('Booking date*');

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <FormField
      name="bookingDate"
      value={value}
      onClick={onClick}
      onFocus={e => {
        setPlaceholder('Select a date after today');
        onClick(e);
      }}
      onBlur={() => {
        if (!value) setPlaceholder('Booking date*');
      }}
      placeholder={placeholder}
      ref={ref}
    />
  ));

  CustomInput.displayName = 'CustomInput';

  const customLocale = {
    ...enUS,
    options: {
      ...enUS.options,
      weekStartsOn: 1,
    },
    localize: {
      ...enUS.localize,
      day: n => format(new Date(2023, 0, n + 1), 'EEE'),
    },
  };

  registerLocale('custom-en', customLocale);

  const customDayClassName = date => {
    return isToday(date) ? 'today' : undefined;
  };

  return (
    <DatePicker
      locale="custom-en"
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy/MM/dd"
      customInput={<CustomInput />}
      dayClassName={customDayClassName}
    />
  );
};

export default Datepicker;
