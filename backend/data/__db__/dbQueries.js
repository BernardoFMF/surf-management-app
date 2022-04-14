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

export {QUERY_GET_USERS, QUERY_GET_USER_BY_ID, QUERY_POST_USER, QUERY_UPDATE_USER, QUERY_DELETE_USER, QUERY_GET_USERS_SPORTS, QUERY_GET_USERS_SPORT, QUERY_GET_USER_SPORTS_BY_ID, QUERY_POST_USER_SPORT, QUERY_UPDATE_USER_SPORT, QUERY_DELETE_USER_SPORT, QUERY_GET_QUOTAS, QUERY_GET_COMPANIES_QUOTAS, QUERY_GET_USERS_QUOTAS, QUERY_GET_MEMBERS_QUOTAS_BY_ID, QUERY_POST_QUOTA, QUERY_UPDATE_MEMBER_QUOTA, QUERY_GET_MEMBER_BY_ID, QUERY_GET_MEMBER_BY_USERNAME, QUERY_QUOTA_BY_ID, QUERY_GET_EMAILS, QUERY_UPDATE_QRCODE}