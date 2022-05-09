import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

function RequireAuth({ children }) {
    return sessionStorage.getItem('authed') ? children : <Navigate to='/sign-in' replace/>
}

export default RequireAuth