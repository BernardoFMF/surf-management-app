-- users

/**
 * Creates a member
 * Creates a contact
 * Creates a user
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */
create or replace procedure post_user(cc_ bigint, nif_ bigint, type_ varchar(40), quota_value_ int, birth_date_ varchar(30), nationality_ varchar(30), full_name_ varchar(60),
										phone_number_ int, email_ varchar(50), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30), pword_ text, username_ varchar(30), paid_enrollment_ bool, out new_id_ int)
LANGUAGE plpgsql  
as
$$
declare 
	date1 DATE;
	curr_year int;
	year1 int;
	curr_date DATE;
begin
	with new_id_table_ as (
		insert into Member_ (member_type_, quota_value_, username_, pword_) values (type_, quota_value_, username_, pword_) returning id_
	)
	select id_ into new_id_ from new_id_table_;

	insert into Contact_ (member_id_, location_, address_, postal_code_, email_, phone_number_) 
	values (new_id_, location_, address_, postal_code_, email_, phone_number_);
	
	select current_date into curr_date;
	insert into User_ (member_id_, nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_)
	values (new_id_, nif_, cc_, full_name_, nationality_, birth_date_, curr_date, paid_enrollment_); 

	SELECT date_ into date1 FROM Quota_ ORDER BY id_ DESC LIMIT 1;
	SELECT extract(YEAR FROM date1) into year1;
	SELECT extract(YEAR FROM current_date) into curr_year;
	if year1 = curr_year then
		INSERT INTO Quota_(member_id_,payment_date_,date_) VALUES (new_id_,NULL,date1);	
	end if;
end
$$;

/**
 * Updates contact & user
 * Creates the user_Img
 */
create or replace procedure put_user(p_id_ int, p_cc_ bigint, p_nif_ bigint, p_type_ varchar(40), p_quota_value_ int, p_birth_date_ date, p_nationality_ varchar(30), p_full_name_ varchar(60), 
										p_phone_number_ int, p_postal_code_ varchar(8), p_address_ varchar(40), p_location_ varchar(30), p_img_ bytea, p_is_admin_ bool, p_paid_enrollment_ bool)
LANGUAGE plpgsql  
as
$$
begin
	update Contact_ set location_ = p_location_, address_ = p_address_, postal_code_ = p_postal_code_, phone_number_= p_phone_number_ where member_id_ = p_id_;

	update Member_ set quota_value_ = p_quota_value_ where id_ = p_id_;

	update User_ set nif_ = p_nif_, cc_ = p_cc_, full_name_= p_full_name_, nationality_= p_nationality_, birth_date_ = p_birth_date_, paid_enrollment_= p_paid_enrollment_, is_admin_ = p_is_admin_ where member_id_ = p_id_;
	
	if p_img_ is not null and not exists(select * from User_img_ where user_id_ = p_id_) then
		insert into User_Img_ (user_id_, img_value_) values (p_id_, p_img_);
	elseif p_img_ is not null then
		update User_Img_ set img_value_ = p_img_ where user_id_ = p_id_;
	end if;
end
$$;

/**
 * delete user is made by a simple update query (changes the member table)
 * no proc needed
 */

/**
 * Creates a user_sport
 * Verifies if this user had already practiced this sport before
 */
create or replace procedure post_user_sport(id_ int, sid_ int, fed_id_ int, fed_number_ int, fed_name_ varchar(30), type_ text [], years_federated_ int [])
LANGUAGE plpgsql  
as
$$
begin
	if exists (select * from User_Sport_ where user_id_ = id_ and sport_id_ = sid_ and is_absent_ = true) then
		update 	User_Sport_ set is_absent_ = false where user_id_ = id_ and sport_id_ = sid_;
	end if;
	
	insert into User_Sport_ (user_id_, sport_id_, type_, fed_number_, fed_id_ ,fed_name_ ,years_federated_)
	values (id_, sid_, type_, fed_number_, fed_id_ ,fed_name_ ,years_federated_);
end
$$;

/**
 * Updates user_sport
 */
create or replace procedure put_user_sport(p_id_ int, p_sid_ int, p_fed_id_ int, p_fed_number_ int, p_fed_name_ varchar(30), p_type_ text [], p_years_federated_ int [], p_is_absent_ bool) 
LANGUAGE plpgsql  
as
$$
begin
	update User_Sport_ set type_ = p_type_, fed_id_ = p_fed_id_, fed_name_ = p_fed_name_, years_federated_ = p_years_federated_, is_absent_ = p_is_absent_ where user_id_ = p_id_ and sport_id_ = p_sid_;
end
$$;

/**
 * delete user_sport association is made by a simple update query (changes the isAbsent attribute)
 * no proc needed
 */

-- sports

/**
 * Creates a sport
 */
create or replace procedure post_sport(name_ varchar(30)) 
LANGUAGE plpgsql  
as
$$
begin
	insert into Sport_ (name_) values (name_); --on conflict (name_) raise exception concat('There is already a sport with the name ', name_)  ;
end
$$;

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
create or replace procedure delete_event(eid_ int)
LANGUAGE plpgsql  
as
$$
begin
	DELETE FROM Attendance_ WHERE event_id_ = eid_;
	DELETE FROM Event_ WHERE id_ = eid_;
end
$$;

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
create or replace procedure approve_candidate(cid int, type_ varchar(40), quota_value_ int, paid_enrollment_ bool, out new_id int)
LANGUAGE plpgsql  
as
$$
DECLARE 
	candidate_nif_ bigint;
	candidate_cc_  bigint;
	candidate_full_name_ varchar(60);
	candidate_nationality_ varchar(30);
	candidate_birth_date_ varchar(30);
	candidate_location_ varchar(30);
	candidate_address_ varchar(40);
	candidate_postal_code_ varchar(8);
	candidate_email_ varchar(50);
	candidate_phone_number_ int;
	candidate_pword_ text;
 	candidate_username_ varchar(30);
 	candidate_id_ int;
 	candidate_img_ bytea;
	
begin
	select nif_,cc_,full_name_,nationality_,birth_date_,location_, address_, postal_code_, email_, phone_number_,pword_, username_, img_ into candidate_nif_, candidate_cc_, candidate_full_name_, candidate_nationality_, candidate_birth_date_, candidate_location_, candidate_address_, candidate_postal_code_, candidate_email_, candidate_phone_number_ , candidate_pword_ , candidate_username_, candidate_img_ FROM Candidate_ WHERE id_ = cid;
	
	call post_user(candidate_cc_, candidate_nif_, type_, quota_value_, candidate_birth_date_, candidate_nationality_, candidate_full_name_, candidate_phone_number_, candidate_email_, candidate_postal_code_, candidate_address_, candidate_location_, candidate_pword_, candidate_username_, paid_enrollment_, candidate_id_);
	
	select candidate_id_ into new_id;

	if candidate_img_ is not null then
		insert into User_Img_ (user_id_, img_value_) values (new_id, candidate_img_);
	end if;
	
	DELETE FROM Candidate_ WHERE id_ = cid;
end
$$;

-- company

/**
 * Creates a member
 * Creates a contact
 * Creates a company
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */

create or replace procedure post_company(name_ varchar(40), nif_ bigint, phone_number_ int, email_ varchar(30), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30), username_ varchar(30), pword_ text, out new_id_ int)
LANGUAGE plpgsql  
as
$$
DECLARE 
	cid int;
    date1 Date;
	curr_date int;
	year1 int;
begin
	with new_id_table_ as (
		INSERT INTO Member_(member_type_,has_debt_,quota_value_,is_deleted_,username_,pword_) VALUES ('corporate',true,50,false,username_,pword_) returning id_
	)
	select id_ into new_id_ from new_id_table_;
	
	SELECT id_ into cid FROM Member_ ORDER BY id_ DESC LIMIT 1;
	INSERT INTO Contact_(member_id_,location_,address_,postal_code_,email_,phone_number_) VALUES (cid,location_,address_,postal_code_,email_,phone_number_);
	INSERT INTO Company_(member_id_,nif_,name_) VALUES (cid, nif_, name_);
	SELECT date_ into date1 FROM Quota_ ORDER BY id_ DESC LIMIT 1;
	SELECT extract(YEAR FROM date1) into year1;
	SELECT extract(YEAR FROM current_date) into curr_date;
	if year1 = curr_date then
		INSERT INTO Quota_(member_id_,payment_date_,date_) VALUES (cid,NULL,date1);	
	end if;
end
$$;

/**
 * Updates contact & company
 */
create or replace procedure put_company(cid_ int, p_name_ varchar(40), p_nif_ bigint, p_phone_number_ int, p_email_ varchar(30), p_postal_code_ varchar(8), p_address_ varchar(40), p_location_ varchar(30))
LANGUAGE plpgsql  
as
$$
begin
	UPDATE Contact_ SET phone_number_ = p_phone_number_, postal_code_ = p_postal_code_,address_ = p_address_, location_ = p_location_ WHERE member_id_ = cid_;
	UPDATE Company_ SET name_ = p_name_, nif_ = p_nif_ WHERE member_id_ = cid_;
end
$$;

/**
 * delete company is made by a simple update query (changes the member table)
 * no proc needed
 */

-- quotas

/**
 * Creates a quota selecting every member to its respective quota
 */
create or replace procedure post_quotas(p_date_ date, out count_date int) 
LANGUAGE plpgsql  
as
$$
begin
	if not exists(select * from quota_ where date_ = p_date_) then
		INSERT INTO Quota_(member_id_, payment_date_, date_) SELECT id_, NULL, p_date_ FROM Member_ where quota_value_ <> 0 and is_deleted_ = false;
		select count(*) into count_date from quota_ where date_ = p_date_;
	end if;
end
$$;

/**
 * Updates the payment in a specific quota
 * no proc needed
 */

create or replace procedure post_token(p_member_id_ int, p_token_ text)
LANGUAGE plpgsql  
as
$$
DECLARE 
	curr_date date;
begin
	select current_date into curr_date;
	insert into member_token_(member_id_, token_, createdAt_) values (p_member_id_, p_token_, curr_date);
end
$$;









