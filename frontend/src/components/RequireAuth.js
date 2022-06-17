import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import { useDispatch } from 'react-redux';
import { isAfter } from "date-fns";
import { logout } from '../store/actions/memberActions';

function RequireAuth({ children }) {
    const location = useLocation()
    const dispatch = useDispatch()

    const checkExpiration = (date) => {
        const curr = new Date()
        const expirationDate = new Date(date)
        console.log("REQUIRE AUTH");
        console.log(curr);
        console.log(expirationDate);
        return isAfter(curr, expirationDate)
    }


    const expirationDate = localStorage.getItem('memberInfo') ? JSON.parse(localStorage.getItem('memberInfo')).expires : null

    const isExpired = checkExpiration(expirationDate)

    if (expirationDate && isExpired) {
        dispatch(logout())
    }

    return expirationDate !== null && !isExpired ? children : <Navigate to='/sign-in' replace state={{ from: location.pathname }}/>
}

export default RequireAuth