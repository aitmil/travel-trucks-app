import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <div className={css['loader-group']}>
        <ThreeDots
          visible={true}
          height="100"
          width="100"
          color="#d84343"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperClass={css.loader}
        />
      </div>
    </div>
  );
}
