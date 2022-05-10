import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userDeletionReducer, userFetchReducer, userLoginReducer, userRegisterReducer, usersFetchReducer, userUpdateReducer} from './reducers/userReducers'
import customizationReducer from './reducers/customizationReducers'
import { sportsDeletionReducer, sportsFetchReducer} from './reducers/sportReducers'
import { quotasFetchReducer, quotaUpdateReducer} from './reducers/quotaReducers'
import { candidateDeletionReducer, approveCandidateReducer, candidatesFetchReducer} from './reducers/candidateReducers'
import { companyDeletionReducer, companiesFetchReducer, companyFetchReducer} from './reducers/companyReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  customization: customizationReducer,
  userRegister: userRegisterReducer,
  userDeletion: userDeletionReducer,
  usersFetch: usersFetchReducer,
  userFetch: userFetchReducer,
  sportsFetch: sportsFetchReducer,
  sportDeletion: sportsDeletionReducer,
  quotasFetch: quotasFetchReducer,
  quotaUpdate: quotaUpdateReducer,
  userUpdate: userUpdateReducer,
  candidateDeletion: candidateDeletionReducer,
  approveCandidate: approveCandidateReducer,
  candidatesFetch: candidatesFetchReducer,
  companyDeletion: companyDeletionReducer,
  companiesFetch: companiesFetchReducer,
  companyFetch: companyFetchReducer
})

const userInfoFromStorage = sessionStorage.getItem('userInfo')
  ? JSON.parse(sessionStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store