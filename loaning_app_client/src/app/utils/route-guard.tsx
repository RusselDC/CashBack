import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/app-store";

const useIsAuthenticated = () => {
  return useSelector((state: RootState) => state.authStore.token);
};

export const PublicRoutes = () => {
  const location = useLocation();

  return !useIsAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/user/dashboard" state={{ from: location }} replace />
  );
};

export const AuthRoute = () => {
  const location = useLocation();

  return useIsAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
