import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userDeletionReducer, userFetchReducer, userRegisterReducer, usersFetchReducer, userUpdateReducer, userSportsFetchReducer, usersSportFetchReducer} from './reducers/userReducers'
import customizationReducer from './reducers/customizationReducers'
import { typesFetchReducer, typesUpdateReducer, createTypeReducer } from './reducers/typeReducer'
import { sportsDeletionReducer, sportsFetchReducer, createSportReducer} from './reducers/sportReducers'
import { memberQuotasFetchReducer, quotasFetchReducer, quotaUpdateReducer, createQuotaReducer} from './reducers/quotaReducers'
import { candidateDeletionReducer, approveCandidateReducer, candidatesFetchReducer} from './reducers/candidateReducers'
import { companyDeletionReducer, companiesFetchReducer, companyFetchReducer} from './reducers/companyReducers'
import { memberLoginReducer, memberFetchReducer } from './reducers/memberReducers'
import { EventDeletionReducer, eventsFetchReducer, eventFetchReducer, eventAttendanceFetchReducer} from './reducers/eventReducers'

const reducer = combineReducers({
  memberLogin: memberLoginReducer,
  customization: customizationReducer,
  userRegister: userRegisterReducer,
  userDeletion: userDeletionReducer,
  usersFetch: usersFetchReducer,
  userFetch: userFetchReducer,
  sportsFetch: sportsFetchReducer,
  sportDeletion: sportsDeletionReducer,
  createSport: createSportReducer,
  quotasFetch: quotasFetchReducer,
  quotaUpdate: quotaUpdateReducer,
  createQuota: createQuotaReducer,
  userUpdate: userUpdateReducer,
  candidateDeletion: candidateDeletionReducer,
  approveCandidate: approveCandidateReducer,
  candidatesFetch: candidatesFetchReducer,
  companyDeletion: companyDeletionReducer,
  companiesFetch: companiesFetchReducer,
  companyFetch: companyFetchReducer,
  typesFetch: typesFetchReducer,
  typesUpdate: typesUpdateReducer,
  createType: createTypeReducer,
  memberQuotaFetch: memberQuotasFetchReducer,
  eventsFetch: eventsFetchReducer,
  eventDeletion: EventDeletionReducer,
  memberFetch: memberFetchReducer,
  userSportsFetch : userSportsFetchReducer,
  eventFetch : eventFetchReducer,
  eventAttendanceFetch : eventAttendanceFetchReducer,
  usersSportFetch: usersSportFetchReducer
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