import { Link } from 'react-router-dom';
import clsx from 'clsx';

import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Campers of your dreams</h1>
      <p className={css.text}>
        You can find everything you want in our catalog
      </p>
      <Link to="catalog" className={clsx(css.btn, 'btn')}>
        View Now
      </Link>
    </main>
  );
}
