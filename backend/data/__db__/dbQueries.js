const QUERY_GET_CANDIDATES = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_, gender_ from candidate_'

const QUERY_NUMBER_OF_CANDIDATES = 'select count(*)  from Candidate_'

const QUERY_GET_CANDIDATE_BY_ID = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_, gender_, img_ from candidate_ where id_ = $1;'

const QUERY_POST_CANDIDATE = 'insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_, img_, gender_) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning id_;'

const QUERY_DELETE_CANDIDATE = 'delete from candidate_ where id_ = $1;'

const QUERY_APPROVE_CANDIDATE = 'call approve_candidate($1, $2, $3, $4);'

const QUERY_GET_CANDIDATE_BY_USERNAME = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where username_ = $1;'

const QUERY_GET_CANDIDATE_BY_CC = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where cc_ = $1;'

const QUERY_GET_CANDIDATE_BY_NIF = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where nif_ = $1;'

const QUERY_GET_CANDIDATE_BY_EMAIL = 'select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where email_ = $1;'

const QUERY_GET_COMPANIES = 'select c.member_id_, nif_, name_, username_, has_debt_, member_type_, is_deleted_, email_ from company_ c join member_ m on c.member_id_ = m.id_ join contact_ co on c.member_id_ = co.member_id_'

const QUERY_NUMBER_OF_COMPANIES = 'select count(*)  from Company_'

const QUERY_GET_COMPANY_BY_ID = 'select c.member_id_, c.nif_, c.name_, co.location_, co.address_, co.postal_code_, co.email_, co.phone_number_, m.has_debt_, m.member_type_, m.username_, is_deleted_, img_value_ from company_ c join contact_ co on c.member_id_ = co.member_id_ join member_ m on c.member_id_ = m.id_ join Member_img_ mi on m.id_ = mi.member_id_ where c.member_id_ = $1;'

const QUERY_POST_COMPANY = 'call post_company($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);'

const QUERY_UPDATE_COMPANY = 'call put_company($1, $2, $3, $4, $5, $6, $7, $8, $9);'

const QUERY_DELETE_COMPANY = 'update member_ set is_deleted_ = true where id_ = $1;'

const QUERY_GET_SPORTS = 'select id_, name_, is_deleted_ , (select count(*) as practitioners_ from user_sport_ us where sport_id_ = id_) from sport_ s2 ;'

const QUERY_GET_SPORT_BY_ID = 'select id_, name_, is_deleted_ from Sport_ where id_ = $1;'

const QUERY_POST_SPORT = 'insert into Sport_ (name_) values ($1) returning id_;'

const QUERY_UPDATE_SPORT = 'update Sport_ set is_deleted_ = $2, name_ = $3 where id_ = $1;'

const QUERY_DELETE_SPORT = 'update Sport_ set is_deleted_ = true where id_ = $1;'

const QUERY_GET_EVENTS = 'select id_, name_, initial_date_, end_date_ from Event_;'

const QUERY_GET_EVENT_BY_ID = 'select id_, name_, initial_date_, end_date_ from Event_ where id_ = $1;'

const QUERY_POST_EVENT = 'insert into Event_ (name_,initial_date_,end_date_) values ($1, $2, $3) returning id_;'

const QUERY_UPDATE_EVENT = 'update Event_ set name_ = $1, initial_date_ = $2, end_date_ = $3 where id_ = $4;'

const QUERY_DELETE_EVENT = 'call delete_event($1);'

const QUERY_GET_USERS = 'select u.member_id_, nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, is_admin_, member_type_, has_debt_, username_, location_, address_, postal_code_, email_, phone_number_, gender_, img_value_, is_deleted_ from User_ u join Member_ m on u.member_id_ = m.id_ join Contact_ c on m.id_ = c.member_id_ join Member_Img_ ui on m.id_ = ui.member_id_ '

const QUERY_NUMBER_OF_USERS = 'select count(*) from user_'

const QUERY_GET_USER_BY_ID = 'select u.member_id_, nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, is_admin_, member_type_, has_debt_, username_, location_, address_, postal_code_, email_, phone_number_, gender_, img_value_, is_deleted_, qrcode_ from User_ u join Member_ m on u.member_id_ = m.id_ join Contact_ c on m.id_ = c.member_id_ join Member_Img_ ui on m.id_ = ui.member_id_ join Membership_Card_ mc on m.id_ = mc.user_id_ where m.id_ = $1'

const QUERY_POST_USER = 'call post_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)'

const QUERY_UPDATE_USER = 'call put_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)'

const QUERY_DELETE_USER = 'call delete_user($1);'

const QUERY_GET_USERS_SPORTS = 'select username_, name_, user_id_, sport_id_, type_, fed_number_, fed_id_, fed_name_, years_federated_, is_absent_ from Member_ m join User_sport_ us on m.id_ = us.user_id_ join Sport_ s on us.sport_id_ = s.id_ where m.is_deleted_ = false and s.is_deleted_ = false'

const QUERY_GET_USERS_SPORT = 'select username_, name_, user_id_, sport_id_, type_, fed_number_, fed_id_, fed_name_, years_federated_, is_absent_ from Member_ m join User_sport_ us on m.id_ = us.user_id_ join Sport_ s on us.sport_id_ = s.id_ where m.is_deleted_ = false and s.is_deleted_ = false and sport_id_ = $1'

const QUERY_GET_USER_SPORTS_BY_ID = 'select username_, name_, user_id_, sport_id_, type_, fed_number_, fed_id_, fed_name_, years_federated_, is_absent_ from Member_ m join User_sport_ us on m.id_ = us.user_id_ join Sport_ s on us.sport_id_ = s.id_ where m.is_deleted_ = false and s.is_deleted_ = false and user_id_ = $1'

const QUERY_POST_USER_SPORT = 'call post_user_sport($1, $2, $3, $4, $5, $6, $7)'

const QUERY_UPDATE_USER_SPORT = 'call put_user_sport($1, $2, $3, $4, $5, $6, $7, $8)'

const QUERY_DELETE_USER_SPORT = 'update User_sport_ set is_absent_ = true where user_id_ = $1 and sport_id_ = $2'

const QUERY_GET_QUOTAS = 'select q.id_, q.member_id_, username_, payment_date_, date_, email_, phone_number_ from Quota_ q join Member_ m on q.member_id_ = m.id_ join Contact_ c on m.id_ = c.member_id_'

const QUERY_NUMBER_OF_QUOTAS = 'select count(*) from quota_'

const QUERY_NUMBER_OF_MEMBER_QUOTAS = 'select count(*) from quota_ where member_id_ = $1'

const QUERY_GET_COMPANIES_QUOTAS = 'select q.id_, member_id_, username_, payment_date_, date_ from Quota_ q join Member_ m on q.member_id_ = m.id_ where m.is_deleted_ = false and m.member_type_ = \'corporate\''

const QUERY_GET_USERS_QUOTAS = 'select q.id_, member_id_, username_, payment_date_, date_ from Quota_ q join Member_ m on q.member_id_ = m.id_ where m.is_deleted_ = false and m.member_type_ != \'corporate\''

const QUERY_GET_MEMBERS_QUOTAS_BY_ID = 'select q.id_, member_id_, username_, payment_date_, date_ from Quota_ q join Member_ m on q.member_id_ = m.id_ where m.is_deleted_ = false and m.id_ = $1'

const QUERY_POST_QUOTA = 'call post_quotas($1, $2)'

const QUERY_UPDATE_MEMBER_QUOTA = 'update Quota_ set payment_date_ = $1 where id_ = $2'

const QUERY_GET_MEMBER_BY_ID = 'select id_, member_type_, has_debt_, quota_value_, is_deleted_, username_, pword_, img_value_ from Member_ m join Member_Types_ qp on m.member_type_ = qp.type_ join Member_img_ mi on m.id_ = mi.member_id_ where id_ = $1'

const QUERY_GET_MEMBER_BY_USERNAME = 'select id_, member_type_, has_debt_, quota_value_, is_deleted_, username_, pword_ from Member_ m join Member_Types_ qp on m.member_type_ = qp.type_  where username_ = $1'

const QUERY_GET_MEMBER_BY_CC = 'select id_, member_type_, has_debt_, quota_value_, is_deleted_, username_, pword_ from Member_ m join User_ u on m.id_ = u.member_id_ join Member_Types_ qp on m.member_type_ = qp.type_  where cc_ = $1'

const QUERY_GET_USER_BY_NIF = 'select id_, member_type_, has_debt_, quota_value_, is_deleted_, username_, pword_ from Member_ m join User_ u on m.id_ = u.member_id_ join Member_Types_ qp on m.member_type_ = qp.type_  where nif_ = $1'

const QUERY_GET_COMPANY_BY_NIF = 'select id_, member_type_, has_debt_, quota_value_, is_deleted_, username_, pword_ from Member_ m join Company_ c on m.id_ = c.member_id_ join Member_Types_ qp on m.member_type_ = qp.type_  where nif_ = $1'

const QUERY_GET_MEMBER_BY_EMAIL = 'select id_, member_type_, has_debt_, quota_value_, is_deleted_, username_, pword_ from Member_ m join Contact_ c on m.id_ = c.member_id_ join Member_Types_ qp on m.member_type_ = qp.type_  where email_ = $1'

const QUERY_GET_QUOTA_BY_ID = 'select q.id_, member_id_, username_, payment_date_, date_ from Quota_ q join Member_ m on q.member_id_ = m.id_ where m.is_deleted_ = false and q.id_ = $1'

const QUERY_GET_EMAILS = 'select email_ from Contact_'

const QUERY_GET_USER_EMAIL = 'select email_ from Contact_ where member_id_ = $1'

const QUERY_UPDATE_QRCODE = 'insert into Membership_card_ (user_id_, qrcode_) values ($1, $2)'

const QUERY_POST_ATTENDANCE = 'insert into Attendance_(member_id_, event_id_, state_) values ($1, $2, $3)'

const QUERY_UPDATE_ATTENDANCE = 'update Attendance_ set state_ = $3 where event_id_ = $1 and member_id_ = $2'

const QUERY_GET_ATTENDANCE = 'select member_id_, username_, event_id_, name_, state_ from Attendance_ a join Member_ m on a.member_id_ = m.id_ join Event_ e on a.event_id_ = e.id_ where event_id_ = $1'

const QUERY_GET_MEMBER_ATTENDANCE = 'select a.member_id_, a.event_id_, e.name_, a.state_, e.initial_date_, e.end_date_ from Attendance_ a join Event_ e on a.event_id_ = e.id_ where a.member_id_ = $1 '

const QUERY_GET_MEMBER_TOKEN = 'select member_id_, token_, createdAt_ from Member_token_ where member_id_ = $1' 

const QUERY_DELETE_MEMBER_TOKEN = 'delete from Member_token_ where member_id_ = $1'

const QUERY_UPDATE_MEMBER_TOKEN = 'update Member_token_ set token_ = $2, createdAt_ = SELECT CURRENT_DATE where member_id_ = $1'

const QUERY_POST_NEW_TOKEN = 'call post_token($1,$2)'

const QUERY_GET_MANAGEMENT_QUOTAS = 'select type_, quota_value_ from Member_Types_'

const QUERY_UPDATE_MANAGEMENT_QUOTAS = 'update Member_Types_ set quota_value_ = $1 where type_ = $2'

const QUERY_POST_MEMBER_TOKEN = 'insert into Member_Types_ values($1, $2)'

const QUERY_GET_MANAGEMENT_QUOTA_BY_TYPE = 'select type_, quota_value_ from Member_Types_ where type_ = $1'


export default {QUERY_GET_MANAGEMENT_QUOTAS, QUERY_GET_MANAGEMENT_QUOTA_BY_TYPE, QUERY_UPDATE_MANAGEMENT_QUOTAS, QUERY_POST_MEMBER_TOKEN, QUERY_GET_MEMBER_ATTENDANCE, QUERY_GET_CANDIDATES, QUERY_GET_CANDIDATE_BY_ID, QUERY_POST_CANDIDATE, QUERY_DELETE_CANDIDATE, QUERY_APPROVE_CANDIDATE, QUERY_GET_CANDIDATE_BY_USERNAME, QUERY_GET_COMPANIES, QUERY_GET_COMPANY_BY_ID, QUERY_POST_COMPANY, QUERY_UPDATE_COMPANY, QUERY_DELETE_COMPANY, QUERY_GET_SPORTS, QUERY_GET_SPORT_BY_ID, QUERY_POST_SPORT, QUERY_UPDATE_SPORT, QUERY_DELETE_SPORT, QUERY_GET_EVENTS, QUERY_GET_EVENT_BY_ID, QUERY_POST_EVENT, QUERY_UPDATE_EVENT, QUERY_DELETE_EVENT, QUERY_GET_USERS, QUERY_GET_USER_BY_ID, QUERY_POST_USER, QUERY_UPDATE_USER, QUERY_DELETE_USER, QUERY_GET_USERS_SPORTS, QUERY_GET_USERS_SPORT, QUERY_GET_USER_SPORTS_BY_ID, QUERY_POST_USER_SPORT, QUERY_UPDATE_USER_SPORT, QUERY_DELETE_USER_SPORT, QUERY_GET_QUOTAS, QUERY_GET_COMPANIES_QUOTAS, QUERY_GET_USERS_QUOTAS, QUERY_GET_MEMBERS_QUOTAS_BY_ID, QUERY_POST_QUOTA, QUERY_UPDATE_MEMBER_QUOTA, QUERY_GET_MEMBER_BY_ID, QUERY_GET_MEMBER_BY_USERNAME, QUERY_GET_QUOTA_BY_ID, QUERY_GET_EMAILS,QUERY_GET_USER_EMAIL, QUERY_UPDATE_QRCODE, QUERY_POST_ATTENDANCE, QUERY_UPDATE_ATTENDANCE, QUERY_GET_ATTENDANCE, QUERY_GET_MEMBER_TOKEN, QUERY_DELETE_MEMBER_TOKEN, QUERY_UPDATE_MEMBER_TOKEN, QUERY_POST_NEW_TOKEN, QUERY_GET_MEMBER_BY_CC, QUERY_GET_COMPANY_BY_NIF, QUERY_GET_USER_BY_NIF, QUERY_GET_MEMBER_BY_EMAIL, QUERY_GET_CANDIDATE_BY_EMAIL, QUERY_GET_CANDIDATE_BY_NIF, QUERY_GET_CANDIDATE_BY_CC, QUERY_NUMBER_OF_CANDIDATES, QUERY_NUMBER_OF_COMPANIES, QUERY_NUMBER_OF_USERS, QUERY_NUMBER_OF_QUOTAS, QUERY_NUMBER_OF_MEMBER_QUOTAS}
