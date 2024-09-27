import icons from '../../assets/icons.svg';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <svg height={64} width={136}>
          <use href={`${icons}#icon-logo`} />
        </svg>
        <Navigation />
      </div>
    </header>
  );
}
