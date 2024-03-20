import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRegistered,
  selectIsRefreshing,
  selectIsLoading
} from '../auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRegistered = useSelector(selectIsRegistered);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    isRegistered,
    isRefreshing,
    isLoading,
    user,
  };
};