import { useSelector } from 'react-redux';
import { selectError } from '../../redux/trucks/selectors';
import { GiTerror } from 'react-icons/gi';
import { IoReload } from 'react-icons/io5';
import css from './Error.module.css';

export default function Error() {
  const error = useSelector(selectError);

  if (error === 'Items matching your filter not found') {
    return <p className={css.error}>{`${error}!`}</p>;
  } else {
    return (
      <div className={css.errorBox}>
        <GiTerror size={48} className={css.iconMain} />
        <div className={css.error}>
          <p className={css.text}>
            Ooops... Something went wrong! Try to reload this page
          </p>
          <IoReload />
        </div>
      </div>
    );
  }
}
