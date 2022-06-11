import { Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireMember({ children }) {
    let { id } = useParams()
    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin
    return memberInfo.id_ === parseInt(id) || memberInfo.is_admin_ ? children : <Navigate to='/unauthorized' replace/>
}

export default RequireMember