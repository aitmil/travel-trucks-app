import icons from '../../assets/icons.svg';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <svg className={css.logo}>
          <use href={`${icons}#icon-logo`} />
        </svg>
        <Navigation />
      </div>
    </header>
  );
}
