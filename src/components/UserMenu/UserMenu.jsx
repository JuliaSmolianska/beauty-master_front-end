import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useAuth } from '../../redux/hooks/useAuth';
import css from './UserMenu.module.css';
import { TbLogout } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const name = user.name;
  const avatarChars = name.split(' ')[0].charAt(0);

  return (
    <div className={css.wrapper}>
      <h4 className={`d-none d-sm-block ${css.user_avatar}`}>{avatarChars}</h4>
      <NavDropdown
        title={user.name}
        id="navbarScrollingDropdown"
        className="fw-bold"
      >
        <NavDropdown.Item
          as={Link}
          to="/settings"
          className="text-black text-decoration-none"
        >
          Мої налаштування
          <IoSettingsOutline className="ps-2" size={25} />
        </NavDropdown.Item>
        <NavDropdown.Divider className="mb-1" />
        <NavDropdown.Item className="text-center pt-0 pb-0">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => dispatch(logOut())}
          >
            Вийти
            <TbLogout className="ms-2" />
          </button>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
