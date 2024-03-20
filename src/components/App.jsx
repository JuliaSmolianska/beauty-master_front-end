import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from '../redux/hooks/useAuth';

const WelcomePage = lazy(() => import('../pages/Welcome'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const HomePage = lazy(() => import('../pages/Home.jsx'));
const ClientsPage = lazy(() => import('../pages/Clients'));
const SettingsPage = lazy(() => import('../pages/UserSettings.jsx'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword.jsx'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/login" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/home" component={<LoginPage />} />
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute redirectTo="/login" component={<HomePage />} />
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute redirectTo="/login" component={<ClientsPage />} />
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute redirectTo="/login" component={<SettingsPage />} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RestrictedRoute
              component={<ForgotPasswordPage />}
              redirectTo="/login"
            />
          }
        />
      </Route>
    </Routes>
  );
};
