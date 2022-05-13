import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userDeletionReducer, userFetchReducer, userRegisterReducer, usersFetchReducer, userUpdateReducer} from './reducers/userReducers'
import customizationReducer from './reducers/customizationReducers'
import { typesFetchReducer } from './reducers/typeReducer'
import { sportsDeletionReducer, sportsFetchReducer} from './reducers/sportReducers'
import { memberQuotasFetchReducer, quotasFetchReducer, quotaUpdateReducer} from './reducers/quotaReducers'
import { candidateDeletionReducer, approveCandidateReducer, candidatesFetchReducer} from './reducers/candidateReducers'
import { companyDeletionReducer, companiesFetchReducer, companyFetchReducer} from './reducers/companyReducers'
import { EventDeletionReducer, eventsFetchReducer } from './reducers/eventReducers'
import { memberLoginReducer, memberFetchReducer } from './reducers/memberReducers'

const reducer = combineReducers({
  memberLogin: memberLoginReducer,
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
  companyFetch: companyFetchReducer,
  typesFetch: typesFetchReducer,
  memberQuotaFetch: memberQuotasFetchReducer,
  eventsFetch: eventsFetchReducer,
  eventDeletion: EventDeletionReducer,
  memberFetch: memberFetchReducer
})

const memberInfoFromStorage = sessionStorage.getItem('memberInfo')
  ? JSON.parse(sessionStorage.getItem('memberInfo'))
  : null

const initialState = {
  memberLogin: { memberInfo: memberInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store