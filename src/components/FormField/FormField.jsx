import { useField, Field, ErrorMessage } from 'formik';
import { saveToSessionStorage } from '../../js/sessionStorage';
import clsx from 'clsx';
import css from './FormField.module.css';

const FormField = ({ extraClass, icon, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = event => {
    const { value } = event.target;
    saveToSessionStorage(props.name, value);
    helpers.setValue(value);
  };

  return (
    <div className={css['field-wrapper']}>
      <Field
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
      <ErrorMessage
        className={css.error}
        name={props.name}
        component="div"
      ></ErrorMessage>
    </div>
  );
};

export default FormField;
