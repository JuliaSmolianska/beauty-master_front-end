import { NavLink } from 'react-router-dom';
import { useAuth } from '../../redux/hooks/useAuth';
import css from './Navigation.module.css';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
 
  return (
    <nav>
      <NavLink className={css.link} to={isLoggedIn ? '/home' : '/'}>
        <h3
          className="rounded-circle fst-italic bg-white text-dark text-center pt-2 m-0 fw-bold"
          style={{ width: '50px', height: '50px' }}
        >
          BM
        </h3>
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.link} to="/clients">
          Клієнти
        </NavLink>
      )}
    </nav>
  );
};
