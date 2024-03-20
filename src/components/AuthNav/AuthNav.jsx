import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import { IoLogInOutline } from 'react-icons/io5';

export const AuthNav = () => {
  return (
    <div>
      <NavLink className={css.link} to="/register">
        Реєстрація
      </NavLink>
      <NavLink className={css.link} to="/login">
        Вхід <IoLogInOutline />
      </NavLink>
    </div>
  );
};
