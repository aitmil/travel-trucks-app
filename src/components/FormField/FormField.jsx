import { forwardRef } from 'react';
import { useField, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';

import css from './FormField.module.css';

const FormField = forwardRef(({ extraClass, icon, ...props }, ref) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = event => {
    const { value } = event.target;
    helpers.setValue(value);
  };

  return (
    <div className={css['field-wrapper']}>
      <Field
        innerRef={ref}
        className={clsx(css.input, {
          [css['error-input']]: meta.touched && meta.error,
          [css[extraClass]]: extraClass,
        })}
        name={props.name}
        placeholder={props.placeholder}
        {...field}
        {...props}
        onChange={handleChange}
      />
      {icon && icon}
      <ErrorMessage className={css.error} name={props.name} component="div" />
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
