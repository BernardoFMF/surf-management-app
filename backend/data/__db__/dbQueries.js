const QUERY_GET_CANDIDATES = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_;'

const QUERY_GET_CANDIDATE_BY_ID = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where id_ = $1;'

const QUERY_POST_CANDIDATE = 'insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning id_;'

const QUERY_DELETE_CANDIDATE = 'delete from candidate_ where id_ = $1;'

const QUERY_APPROVE_CANDIDATE = 'call aproove_candidate($1, $2, $3, $4, $5, $6);'

const QUERY_GET_CANDIDATE_BY_USERNAME = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where username_ = $1;'

const QUERY_GET_COMPANIES = 'select member_id_, nif_, name_, username_, has_debt_, member_type_ from company_ c join member_ m on (c.member_id_ = m.id_) where is_deleted_ = false;'

const QUERY_GET_COMPANY_BY_ID = 'select member_id_, nif_, name_ from company_ where member_id_ = $1;'

const QUERY_POST_COMPANY = 'call post_company($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);'

const QUERY_UPDATE_COMPANY = 'call put_company($1, $2, $3, $4, $5, $6, $7, $8, $9);'

const QUERY_DELETE_COMPANY = 'update member_ set is_deleted_ = true where id_ = $1;'

const QUERY_GET_SPORTS = 'select id_, name_ from Sport_ where is_deleted = false;'

const QUERY_GET_SPORT_BY_ID = 'select id_, name_ from Sport_ where is_deleted = false and id_ = $1;'

const QUERY_POST_SPORT = 'insert into Sport_ (name_) values ($1) returning id_;'

const QUERY_DELETE_SPORT = 'update sport_ set is_deleted_ = true where id_ = $1;'

const QUERY_GET_EVENTS = 'select id_, name_, initial_date_, end_date_ from Event;'

const QUERY_GET_EVENT_BY_ID = 'select id_, name_, initial_date_, end_date_ from Event where id_ = $1;'

const QUERY_POST_EVENT = 'insert into Event_ (name_,initial_date_,end_date_) values ($1, $2, $3) returning id_;'

const QUERY_UPDATE_EVENT = 'update Event_ set name_ = $1, initial_date_ = $2, end_date_ = $3 where id_ = $4;'

const QUERY_DELETE_EVENT = 'call delete_event($1);'

const QUERY_GET_USERS = 'select member_id_, nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, is_admin_, member_type_, has_debt_, username_ from user_ u join member_ m on u.member_id_ = m.id_ where m.is_deleted_ = false'

const QUERY_GET_USER_BY_ID = 'select member_id_, nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, is_admin_, member_type_, has_debt_, username_ from user_ u join member_ m on u.member_id_ = m.id_ where m.is_deleted_ = false and m.id_ = $1'

const QUERY_POST_USER = 'call post_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)'

const QUERY_UPDATE_USER = ''

const QUERY_DELETE_USER = ''

const QUERY_GET_USERS_SPORTS = ''

const QUERY_GET_USERS_SPORT = ''

const QUERY_GET_USER_SPORTS_BY_ID = ''

const QUERY_POST_USER_SPORT = ''

const QUERY_UPDATE_USER_SPORT = ''

const QUERY_DELETE_USER_SPORT = ''

const QUERY_GET_QUOTAS = ''

const QUERY_GET_COMPANIES_QUOTAS = ''

const QUERY_GET_USERS_QUOTAS = ''

const QUERY_GET_MEMBERS_QUOTAS_BY_ID = ''

const QUERY_POST_QUOTA = ''

const QUERY_UPDATE_MEMBER_QUOTA = ''

const QUERY_GET_MEMBER_BY_ID = ''

const QUERY_GET_MEMBER_BY_USERNAME = ''

const QUERY_QUOTA_BY_ID = ''

const QUERY_GET_EMAILS = ''

const QUERY_UPDATE_QRCODE = ''

export {QUERY_GET_CANDIDATES, QUERY_GET_CANDIDATE_BY_ID, QUERY_POST_CANDIDATE, QUERY_DELETE_CANDIDATE, QUERY_APPROVE_CANDIDATE, QUERY_GET_CANDIDATE_BY_USERNAME, QUERY_GET_COMPANIES, QUERY_GET_COMPANY_BY_ID, QUERY_POST_COMPANY, QUERY_UPDATE_COMPANY, QUERY_DELETE_COMPANY, QUERY_GET_SPORTS, QUERY_GET_SPORT_BY_ID, QUERY_POST_SPORT, QUERY_DELETE_SPORT, QUERY_GET_EVENTS, QUERY_GET_EVENT_BY_ID, QUERY_POST_EVENT, QUERY_UPDATE_EVENT, QUERY_DELETE_EVENT, QUERY_GET_USERS, QUERY_GET_USER_BY_ID, QUERY_POST_USER, QUERY_UPDATE_USER, QUERY_DELETE_USER, QUERY_GET_USERS_SPORTS, QUERY_GET_USERS_SPORT, QUERY_GET_USER_SPORTS_BY_ID, QUERY_POST_USER_SPORT, QUERY_UPDATE_USER_SPORT, QUERY_DELETE_USER_SPORT, QUERY_GET_QUOTAS, QUERY_GET_COMPANIES_QUOTAS, QUERY_GET_USERS_QUOTAS, QUERY_GET_MEMBERS_QUOTAS_BY_ID, QUERY_POST_QUOTA, QUERY_UPDATE_MEMBER_QUOTA, QUERY_GET_MEMBER_BY_ID, QUERY_GET_MEMBER_BY_USERNAME, QUERY_QUOTA_BY_ID, QUERY_GET_EMAILS, QUERY_UPDATE_QRCODE}