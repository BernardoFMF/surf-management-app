import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import { useDispatch } from 'react-redux';
import { isAfter } from "date-fns";
import { logout } from '../store/actions/memberActions';
import { useEffect } from 'react';

function RequireAuth({ children }) {
    const location = useLocation()
    const dispatch = useDispatch()

    const checkExpiration = (date) => {
        if (!date) return true
        const curr = new Date()
        const expirationDate = new Date(date)
        console.log("date: " + date);
        console.log("valor booleano: " + isAfter(curr, expirationDate));
        return isAfter(curr, expirationDate)
    }

    const expirationDate = localStorage.getItem('memberInfo') ? JSON.parse(localStorage.getItem('memberInfo')).expires : null

    const isExpired = checkExpiration(expirationDate)

    if (expirationDate && isExpired) {
        localStorage.removeItem('memberInfo')
        dispatch(logout())
        console.log("deu logout no require auth");
    }

    return expirationDate !== null && !isExpired ? children : <Navigate to='/sign-in' replace state={{ from: location.pathname }}/>
}

export default RequireAuth