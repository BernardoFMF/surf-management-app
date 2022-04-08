-- users

/**
 * Creates a member
 * Creates a contact
 * Creates a user
 * Creates a membership card
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */
create or replace procedure post_user(cc_ varchar(30), nif_ int, type_ varchar(40), quota_value_ int, birth_date_ date, nationality_ varchar(30), full_name_ varchar(60),
										phone_number_ int, email_ varchar(30), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30), pword_ text, username_ varchar(30), qrcode_ text, paid_enrollment_ bool)
{
	declare mid int;
	insert into Member_ (member_type_, quota_value_) values (type_, quota_value_) returning mid = id_;
	
	insert into Contact_ (member_id_, location_, address_, postal_code_, email_, phone_number_) 
	values (mid, location_, address_, postal_code_, email_, phone_number_);
	
	insert into User_ (member_id_, nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, pword_, username_)
	values (mid, nif_, cc_, full_name_, nationality_, birth_date_, select current_date, paid_enrollment_, pword_, username_); 
	
	insert into Membership_card_ (user_id_, qrcode_)
	values (mid, qrcode_);
	
	DECLARE date1 DATE;
	DECLARE curr_date DATE;
	DECLARE year1 int;
	SELECT date1 = date_ FROM Quota_ ORDER BY id_ DESC LIMIT 1;
	SELECT year1 = extract(YEAR FROM date1)
	SELECT curr_date = extract(YEAR FROM current_date)
	if(year1 == curr_date) {
		INSERT INTO Quota_(member_id_,payment_date_,date_) VALUES (mid,NULL,date1);	
	}
	return mid;
}

/**
 * Updates contact & user
 * Creates the user_Img
 */
create or replace procedure put_user(id_ int, cc_ varchar(30), nif_ int, type_ varchar(40),birth_date_ date, nationality_ varchar(30), full_name_ varchar(60), 
										phone_number_ int, postal_code_ varchar(8), address_ varchar(40), location_ varchar(30), pword_ text, username_ varchar(30), img_ bytea, is_admin_ bool, img_name_ varchar(30))
{
	update Contact_ set (location_, address_, postal_code_, email_, phone_number_) = (location_, address_, postal_code_, email_, phone_number_) where member_id_ = id_;

	update User_ set (nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, pword_, username_, is_admin_) = (nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, pword_, username_, is_admin_)
		where member_id_ = id_;
	
	if (img_ is not null)
		insert into User_Img_ (user_id_, img_name_, img_value_) values (id_, img_name_, img_);
}

/**
 * delete user is made by a simple update query (changes the member table)
 * no proc needed
 */

/**
 * Creates a user_sport
 * Verifies if this user had already practiced this sport before
 */
create or replace procedure post_user_sport(id_ int, sid_ int, fed_id_ int, fed_number_ int, fed_name_ varchar(30), type_ text [], years_federated_ int [])
{
	if exists (select * from User_Sport_ where user_id_ = id_ and sport_id_ = sid_ and is_absent_ = true)
		update 	User_Sport_ set is_absent_ = false where user_id_ = id_ and sport_id_ = sid_;
	
	insert into User_Sport_ (user_id_, sport_id_, type_, fed_number_, fed_id_ ,fed_name_ ,years_federated)
	values (id_, sid_, fed_id_, type_, fed_number_, fed_id_ ,fed_name_ ,years_federated)
}

/**
 * Updates user_sport
 */
create or replace procedure put_user_sport(id_ int, sid_ int, fed_id_ int, fed_number int, fed_name varchar(30), type_ text [], years_federated_ int []) 
{
	update User_Sport_ set (user_id_, sport_id_, type_, fed_id_ , fed_name_ , years_federated) = (id_, sid_, fed_id_, type_, fed_id_, fed_name_, years_federated);
}

/**
 * delete user_sport association is made by a simple update query (changes the isAbsent attribute)
 * no proc needed
 */

-- sports

/**
 * Creates a sport
 */
create or replace procedure post_sport(name_ varchar(30)) 
{
	insert into Sport_ (name_) values (name_)
}

/**
 * delete sport is made by a simple update query (changes the flag in sport)
 * no proc needed
 */

-- events

/**
 * Creates an event
 * no proc needed
 */

/**
 * Updates an event
 * no proc needed
 */

/**
 * Deletes an event
 * Checks if there is any attendance to this event 
 */
create or replace procedure delete_event(eid_ int){
	DELETE FROM Attendance_ WHERE event_id_ = eid_;
	DELETE FROM Event_ WHERE event_id_ = eid_;
}

/**
 * Creates an attendance
 * no proc needed
 */

/**
 * Updates an attendance
 * no proc needed
 */

-- candidates

/**
 * Creates a candidate
 * no proc needed
 */

/**
 * Deletes a candidate
 * no proc needed
 */

/**
 * Deletes a candidate
 * Creates a user
 */
create or replace procedure aproove_candidate(cid int, type_ varchar(40), quota_value_ int, qrcode_ text, paid_enrollement_ bool){
	DECLARE candidate_nif_ int;
	DECLARE candidate_cc_  varchar(30)
	declare candidate_full_name_ varchar(60),
	DECLARE candidate_nationality_ varchar(30),
	DECLARE candidate_birth_date_ varchar(30),
	DECLARE candidate_location_ varchar(30),
	DECLARE candidate_address_ varchar(40),
	declare candidate_postal_code_ varchar(8),
	DECLARE candidate_email_ varchar(30),
	DECLARE candidate_phone_number_	int,
	DECLARE candidate_pword_ text,
	DECLARE candidate_username_	varchar(30),
	SELECT candidate_nif_ = nif_, candidate_cc_=cc_, candidate_full_name_=full_name_, candidate_nationality_=nationality_,candidate_birth_date_=birth_date_, candidate_location_=location_, candidate_address_=address_, candidate_postal_code_=postal_code_, candidate_email_=email_, candidate_phone_number_ =phone_number_, candidate_pword_ =pword_, candidate_username_=username_ FROM Candidate_ WHERE id_ = cid;
	EXEC post_user(candidate_cc_, candidate_nif_, type_, quota_value_, candidate_birth_date_, candidate_birth_date_, candidate_nationality_, candidate_full_name_, candidate_phone_number_, candidate_email_, candidate_postal_code_, candidate_address_, candidate_location_, candidate_pword_, candidate_username_, qrcode_, paid_enrollement);
	DELETE FROM Candidate_ WHERE id_ = cid;
	RETURN id;
}

-- company

/**
 * Creates a member
 * Creates a contact
 * Creates a company
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */

create or replace procedure post_company(name_ varchar(40), nif_ int, phone_number_ int, email_ varchar(30), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30)){
	DECLARE cid int;
	INSERT INTO Member_(member_type_,has_debt_,quota_value_,is_deleted_) VALUES ('corporate',true,50,false) RETURN cid = id;
	INSERT INTO Contact_(member_id_,location_,address_,postal_code_,email_,phone_number_) VALUES (cid,location_,address_,postal_code_,email_,phone_number_);
	INSERT INTO Company_(member_id_,nif_,name_) VALUES (cid, nif_, name_);
	DECLARE date1 Date;
	DECLARE curr_date DATE;
	DECLARE year1 int;
	SELECT date1 = date_ FROM Quota_ ORDER BY id_ DESC LIMIT 1;
	SELECT year1 = extract(YEAR FROM date1)
	SELECT curr_date = extract(YEAR FROM current_date)
	if(year1 == curr_date) {
		INSERT INTO Quota_(member_id_,payment_date_,date_) VALUES (cid,NULL,date1);	
	}
	RETURN cid;
}

/**
 * Updates contact & company
 */
create or replace procedure put_company(cid_ int, name_ varchar(40), nif_ int, phone_number_ int, email_ varchar(30), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30)){
	UPDATE Contact_ SET phone_number_ = phone_number_, email_ = email_,postal_code_ = postal_code_,address_ = address_, location_ = location_ WHERE member_id_ = cid_;
	UPDATE Company_ SET name_ = name_, nif_ = nif_ WHERE member_id_ = cid_;
}

/**
 * delete company is made by a simple update query (changes the member table)
 * no proc needed
 */

-- quotas

/**
 * Creates a quota selecting every member to its respective quota
 */
create or replace procedure post_quotas(date_ date) {
	INSERT INTO Quotas_(member_id_, payment_date_, date_) SELECT id_,NULL,date_ FROM Member_;
}

/**
 * Updates the payment in a specific quota
 * no proc needed
 */









