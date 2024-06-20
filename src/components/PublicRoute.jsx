import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ redirectTo = '/', restricted = false }) => {
  const { token } = useSelector(state => state.authSlice);
  const shouldRedirect = token && restricted;

  return shouldRedirect ? (
    <Navigate to={redirectTo} />
  ) : (
    <Suspense fallback={<div>loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

PublicRoute.propTypes = {
  redirectTo: PropTypes.string,
  restricted: PropTypes.bool,
};

export default PublicRoute;
