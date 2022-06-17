import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userDeletionReducer, userFetchReducer, userRegisterReducer, usersFetchReducer, userUpdateReducer, userSportsFetchReducer, usersSportDeleteReducer, usersSportFetchReducer, userPostReducer, userSportsUpdateReducer, usersSportsCreateReducer } from './reducers/userReducers'
import customizationReducer from './reducers/customizationReducers'
import { typesFetchReducer, typesUpdateReducer, createTypeReducer } from './reducers/typeReducer'
import { sportsDeletionReducer, sportsFetchReducer, createSportReducer, updateSportReducer, userSportsTypesFetchReducer} from './reducers/sportReducers'
import { memberQuotasFetchReducer, quotasFetchReducer, quotaUpdateReducer, createQuotaReducer} from './reducers/quotaReducers'
import { candidateDeletionReducer, approveCandidateReducer, candidatesFetchReducer} from './reducers/candidateReducers'
import { companyPostReducer, companyDeletionReducer, companiesFetchReducer, companyFetchReducer, companyUpdateReducer, memberValidateFetchReducer } from './reducers/companyReducers'
import { memberLoginReducer, memberFetchReducer } from './reducers/memberReducers'
import { EventDeletionReducer, eventsFetchReducer, eventFetchReducer, eventAttendanceFetchReducer, memberEventsAttendanceFetchReducer, createEventReducer, memberEventAttendanceUpdateReducer} from './reducers/eventReducers'
import { uploadReducer} from './reducers/uploadReducers'
import { groupFetchReducer, memberGroupsFetchReducer, groupsFetchReducer, groupDeleteReducer, groupMembersFetchReducer, groupPostReducer } from './reducers/groupReducers'

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
  updateSport: updateSportReducer,
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
  companyUpdate: companyUpdateReducer,
  usersSportFetch: usersSportFetchReducer,
  memberEventsAttendanceFetch: memberEventsAttendanceFetchReducer,
  userPost: userPostReducer,
  companyPost: companyPostReducer,
  createEvent: createEventReducer,
  validateFetch: memberValidateFetchReducer,
  userSportUpdate: userSportsUpdateReducer,
  userSportDelete: usersSportDeleteReducer,
  uploadFileFetch: uploadReducer,
  usersSportsCreate: usersSportsCreateReducer,
  userSportsTypesFetch : userSportsTypesFetchReducer,
  memberGroupsFetch: memberGroupsFetchReducer,
  groupsFetch: groupsFetchReducer,
  groupDelete: groupDeleteReducer,
  groupFetch: groupFetchReducer,
  groupMembersFetch: groupMembersFetchReducer,
  memberEventAttendanceUpdate: memberEventAttendanceUpdateReducer,
  groupPost: groupPostReducer
})

const memberInfoFromStorage = localStorage.getItem('memberInfo')
  ? JSON.parse(localStorage.getItem('memberInfo'))
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