import { Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireUser({ children }) {
    let { id } = useParams()
    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin
    return memberInfo.id_ === parseInt(id) ? children : <Navigate to='/unauthorized' replace/>
}

export default RequireUser