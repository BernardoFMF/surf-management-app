import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

function RequireAuth({ children }) {
    const location = useLocation()
    return sessionStorage.getItem('authed') ? children : <Navigate to='/sign-in' replace state={{ from: location.pathname }}/>
}

export default RequireAuth