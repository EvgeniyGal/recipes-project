import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ redirectTo }) => {
  const { token } = useSelector(state => state.authSlice);
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
