import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

export default function Navigation() {
  const getLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink className={getLinkClass} to="/">
        Home
      </NavLink>

      <NavLink className={getLinkClass} to="/contacts">
        Catalog
      </NavLink>
    </nav>
  );
}
