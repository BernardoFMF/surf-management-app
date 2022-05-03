import { Navigate, useLocation, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

function RequireAuth({ children }) {
    const location = useLocation()
    return useAuth().authed === true ? children : <Navigate to='/sign-in' replace/>
}

export default RequireAuth