import { Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireCompany({ children }) {
    let { id } = useParams()
    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin
    return memberInfo.category === "company" ? children : <Navigate to='/unauthorized' replace/>
}

export default RequireCompany