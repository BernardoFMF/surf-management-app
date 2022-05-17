import { Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAdmin({ children }) {
    let { id } = useParams()
    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin

    return memberInfo.id_ === id || memberInfo.is_admin_ ? children : <Navigate to='/unauthorized' replace/>
}

export default RequireAdmin