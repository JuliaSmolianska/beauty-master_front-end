import { useAuth } from '../redux/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRegistered } = useAuth();
  return (
    <>
      {isRegistered && <Navigate to="/login" />}
      {isLoggedIn ? <Navigate to={redirectTo} /> : Component}
    </>
  );
};
