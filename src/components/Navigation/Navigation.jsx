import css from './Navigation.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/movies" className={linkStyle}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
