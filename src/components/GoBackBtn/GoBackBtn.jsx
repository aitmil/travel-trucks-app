import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import css from './GoBackBtn.module.css';

const GoBackBtn = () => {
  return (
    <Link className={css.backLink} to={'/catalog'}>
      <HiArrowLeft className={css.icon} /> Go back
    </Link>
  );
};

export default GoBackBtn;
