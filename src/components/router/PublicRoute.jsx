import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PublicRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};