import { Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'

function RequireAdmin({ children }) {
    const userInfo = JSON.parse(sessionStorage.getItem('memberInfo'))
    let { id } = useParams()

    return userInfo.id_.toString() === id || userInfo.is_admin_ ? children : <Navigate to='/unauthorized' replace/>
}

export default RequireAdmin