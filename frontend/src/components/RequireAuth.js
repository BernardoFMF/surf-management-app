import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAfter } from "date-fns";
import { logout } from '../store/actions/memberActions';

function RequireAuth({ children }) {
    const location = useLocation()
    const dispatch = useDispatch()

    const checkExpiration = (date) => {
        if (!date) return true
        const curr = new Date()
        const expirationDate = new Date(date)
        return isAfter(curr, expirationDate)
    }

    const expirationDate = localStorage.getItem('memberInfo') ? JSON.parse(localStorage.getItem('memberInfo')).expires : null

    const isExpired = checkExpiration(expirationDate)

    if (expirationDate && isExpired) {
        localStorage.removeItem('memberInfo')
        dispatch(logout())
    }

    return expirationDate !== null && !isExpired ? children : <Navigate to='/sign-in' replace state={{ from: location.pathname }}/>
}

export default RequireAuth