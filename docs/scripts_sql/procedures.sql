-- users

/**
 * Creates a member
 * Creates a contact
 * Creates a user
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */
create or replace procedure post_user(cc_ bigint, nif_ bigint, mtype_ varchar(40), birth_date_ date, nationality_ varchar(30), full_name_ varchar(60),
										phone_number_ int, email_ varchar(50), postal_code_ varchar(8), address_ text, location_ varchar(30), pword_ text, username_ varchar(30), paid_enrollment_ bool, gender_ varchar(40), iban_ text, p_img_ text, p_enrollment_date_ date, out new_id_ int)
LANGUAGE plpgsql  
as
$$
declare 
	date1 DATE;
	curr_year int;
	year1 int;
begin
	with new_id_table_ as (
		insert into Member_ (member_type_, username_, pword_, iban_) values (mtype_, username_, pword_, iban_) returning id_
	)
	select id_ into new_id_ from new_id_table_;

	insert into Contact_ (member_id_, location_, address_, postal_code_, email_, phone_number_) 
	values (new_id_, location_, address_, postal_code_, email_, phone_number_);

	insert into User_ (member_id_, nif_, cc_, full_name_, nationality_, birth_date_, enrollment_date_, paid_enrollment_, gender_)
	values (new_id_, nif_, cc_, full_name_, nationality_, birth_date_, p_enrollment_date_, paid_enrollment_, gender_); 

	insert into Group_Member_ (member_id_, group_id_) 
	select new_id_, g.group_id_ from Group_ g join Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_
	where g.group_type_ = 'member_type' and gmt.member_type_ = mtype_;

	for date1 in SELECT distinct date_ FROM Quota_ where extract(YEAR FROM date_) >= extract(YEAR FROM current_date) order by date_ ASC
    LOOP
		INSERT INTO Quota_(member_id_,payment_date_,amount_,date_) select new_id_, null, quota_value_, date1 from Member_Types_ mt where mt.type_ = mtype_;
    END LOOP;
   
	insert into member_img_ values(new_id_, p_img_);
end
$$;

/**
 * Updates contact & user
 * Creates the user_Img
 */
create or replace procedure put_user(p_id_ int, p_cc_ bigint, p_nif_ bigint, p_type_ varchar(40), p_birth_date_ date, p_nationality_ varchar(30), p_full_name_ varchar(60), 
										p_phone_number_ int, p_postal_code_ varchar(8), p_address_ text, p_location_ varchar(30), p_img_ text, p_is_admin_ bool, p_paid_enrollment_ bool, p_is_deleted_ bool, p_gender_ varchar(40), p_iban_ text)
LANGUAGE plpgsql  
as
$$
declare
	old_type varchar(40);
	old_deleted bool;
begin
	select member_type_ into old_type from Member_ where id_ = p_id_;
	select is_deleted_ into old_deleted from Member_ where id_ = p_id_;

	if old_type != p_type_ or (old_deleted = true and p_is_deleted_ = false) then
		delete from Group_Member_ gm where gm.member_id_ = p_id_ and gm.group_id_ in (
			select gm2.group_id_ 
			from Group_Member_ gm2 join Group_ g on gm2.group_id_ = g.group_id_ join Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_
			where g.group_type_ = 'member_type' and gmt.member_type_ = old_type
		);
		
		insert into Group_Member_ (member_id_, group_id_) 
		select p_id_, g.group_id_ from Group_ g join Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_
		where g.group_type_ = 'member_type' and gmt.member_type_ = p_type_;
	end if;

	update Contact_ set location_ = p_location_, address_ = p_address_, postal_code_ = p_postal_code_, phone_number_= p_phone_number_ where member_id_ = p_id_;

	update Member_ set is_deleted_ = p_is_deleted_, member_type_ = p_type_, iban_ = p_iban_ where id_ = p_id_;

	update User_ set nif_ = p_nif_, cc_ = p_cc_, full_name_= p_full_name_, nationality_= p_nationality_, birth_date_ = p_birth_date_, paid_enrollment_= p_paid_enrollment_, is_admin_ = p_is_admin_, gender_ = p_gender_ where member_id_ = p_id_;
	
	if p_img_ is not null then
		update Member_Img_ set img_value_ = p_img_ where member_id_ = p_id_;
	end if;
end
$$;

/**
 * delete user
 */

create or replace procedure delete_user(p_id_ int)
LANGUAGE plpgsql  
as
$$
begin
	update Member_ set is_deleted_ = true where id_ = p_id_; 
	update User_Sport_ set is_absent_ = true where user_id_ = p_id_;
	delete from Group_Member_ gm where gm.member_id_ = p_id_;
end
$$;

/**
 * Creates a user_sport
 * Verifies if this user had already practiced this sport before
 */
create or replace procedure post_user_sport(id_ int, sid_ int, fed_id_ int, fed_number_ int, fed_name_ varchar(30), type_ text [], years_federated_ int [], is_candidate_ bool)
LANGUAGE plpgsql
as
$$
declare
	type_elem_ text;
begin
	if exists (select * from User_Sport_ where user_id_ = id_ and sport_id_ = sid_ and is_absent_ = true) then
		update 	User_Sport_ set is_absent_ = false where user_id_ = id_ and sport_id_ = sid_;
	end if;

	if is_candidate_ = false then
		foreach type_elem_ in array type_
	   	loop
	    	insert into Group_Member_ (member_id_, group_id_) 
	    	select distinct id_, g.group_id_ 
	    	from Group_ g join Group_Sports_ gs on g.group_id_ = gs.group_id_ 
	    	where g.group_type_ = 'member_sport_type' and gs.sport_member_type_ = type_elem_ and g.group_id_ not in (
	    		select gm.group_id_ from Group_Member_ gm join Group_Sports_ gs on gm.group_id_ = gs.group_id_ where gs.sport_member_type_ = type_elem_ and gm.member_id_ = id_
	    	);
	   	end loop;
   	end if;

	insert into User_Sport_ (user_id_, sport_id_, type_, fed_number_, fed_id_ ,fed_name_ ,years_federated_, is_candidate_)
	values (id_, sid_, type_, fed_number_, fed_id_ ,fed_name_ ,years_federated_, is_candidate_);
end
$$;

/**
 * Updates user_sport
 */
create or replace procedure put_user_sport(p_id_ int, p_sid_ int, p_fed_id_ int, p_fed_number_ int, p_fed_name_ varchar(30), p_type_ text [], p_years_federated_ int [], p_is_absent_ bool, p_is_candidate_ bool) 
LANGUAGE plpgsql  
as
$$
declare
	old_types text[];
	old_absent bool;
	old_candidate bool;
	type_elem_ text;
begin
	select type_ into old_types from User_Sport_ where user_id_ = p_id_ and sport_id_ = p_sid_;
	select is_absent_ into old_absent from User_Sport_ where user_id_ = p_id_ and sport_id_ = p_sid_;
	select is_candidate_ into old_candidate from User_Sport_ where user_id_ = p_id_ and sport_id_ = p_sid_;

	delete from Group_Member_ where member_id_ = p_id_ and group_id_ in (
		select g.group_id_ 
		from Group_Member_ gm join Group_ g on gm.group_id_ = g.group_id_ join Group_Sports_ gs on g.group_id_ = gs.group_id_
		where g.group_type_ = 'member_sport_type' and gs.sport_id_ = p_sid_
	);

	if ((old_candidate = true and p_is_candidate_ = false) or (old_candidate = false and p_is_candidate_ = false)) and ((old_absent = false and (old_absent = p_is_absent_)) or (old_absent = true and p_is_absent_ = false)) then
		insert into Group_Member_ (member_id_, group_id_) 
	    	select distinct p_id_, g.group_id_ 
	    	from Group_ g join Group_Sports_ gs on g.group_id_ = gs.group_id_
	    	where g.group_type_ = 'member_sport_type' and gs.sport_member_type_ = any(p_type_) and gs.sport_id_ = p_sid_;
	end if;


	update User_Sport_ set type_ = p_type_, fed_number_ = p_fed_number_, fed_id_ = p_fed_id_, fed_name_ = p_fed_name_, years_federated_ = p_years_federated_, is_absent_ = p_is_absent_, is_candidate_ = p_is_candidate_ where user_id_ = p_id_ and sport_id_ = p_sid_;
end
$$;

/**
 * Delete a user sport
 */

create or replace procedure delete_user_sport(p_uid_ int, p_sid_ int)
LANGUAGE plpgsql  
as
$$
begin
	update User_sport_ set is_absent_ = true where user_id_ = p_uid_ and sport_id_ = p_sid_;
	delete from Group_Member_ gm where gm.member_id_ = p_uid_ and gm.group_id_ in (
		select gm.group_id_ 
		from Group_Member_ gm join Group_Sports_ gs on gm.group_id_ = gs.group_id_ 
		where gm.member_id_ = p_uid_ and gs.sport_id_ = p_sid_
	);
end
$$;

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
	delete from GROUP_EVENT_ where event_id_ = eid_;
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
create or replace procedure approve_candidate(cid int, type_ text, paid_enrollment_ bool, out new_id int)
LANGUAGE plpgsql  
as
$$
DECLARE 
	candidate_nif_ bigint;
	candidate_cc_  bigint;
	candidate_full_name_ text;
	candidate_nationality_ text;
	candidate_birth_date_ date;
	candidate_location_ text;
	candidate_address_ text;
	candidate_postal_code_ varchar(8);
	candidate_email_ text;
	candidate_phone_number_ int;
	candidate_pword_ text;
 	candidate_username_ text;
 	candidate_id_ int;
 	candidate_img_ text;
 	candidate_gender_ text;
 	candidate_iban_ text;
 	curr_date_ DATE;
	
begin
	select nif_,cc_,full_name_,nationality_,birth_date_,location_, address_, postal_code_, email_, phone_number_,pword_, username_, img_, gender_, iban_ into candidate_nif_, candidate_cc_, candidate_full_name_, candidate_nationality_, candidate_birth_date_, candidate_location_, candidate_address_, candidate_postal_code_, candidate_email_, candidate_phone_number_ , candidate_pword_ , candidate_username_, candidate_img_, candidate_gender_, candidate_iban_ FROM Candidate_ WHERE id_ = cid;
	
	select current_date into curr_date_;
	
	call post_user(candidate_cc_, candidate_nif_, type_, candidate_birth_date_, candidate_nationality_, candidate_full_name_, candidate_phone_number_, candidate_email_, candidate_postal_code_, candidate_address_, candidate_location_, candidate_pword_, candidate_username_, paid_enrollment_, candidate_gender_, candidate_iban_,candidate_img_, curr_date_, candidate_id_);
	
	select candidate_id_ into new_id;
	
	update member_img_ set img_value_ = candidate_img_ where member_id_ = new_id;

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

create or replace procedure post_company(name_ text, nif_ bigint, phone_number_ int, email_ text, postal_code_ varchar(8), address_ text, location_ text, username_ text, pword_ text, mtype_ text, img_ text, iban_ text, out new_id_ int)
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
		INSERT INTO Member_(member_type_,username_,pword_, iban_) VALUES (mtype_, username_,pword_, iban_) returning id_
	)
	select id_ into new_id_ from new_id_table_;

	INSERT INTO Contact_(member_id_,location_,address_,postal_code_,email_,phone_number_) VALUES (new_id_,location_,address_,postal_code_,email_,phone_number_);
	INSERT INTO Company_(member_id_,nif_,name_) VALUES (new_id_, nif_, name_);

	insert into Group_Member_ (member_id_, group_id_) 
	select new_id_, g.group_id_ from Group_ g join Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_
	where g.group_type_ = 'member_type' and gmt.member_type_ = mtype_;

	for date1 in SELECT distinct date_ FROM Quota_ where extract(YEAR FROM date_) >= extract(YEAR FROM current_date) order by date_ ASC
    LOOP
		INSERT INTO Quota_(member_id_,payment_date_,amount_,date_) select new_id_, null, quota_value_, date1 from Member_Types_ mt where mt.type_ = mtype_;
    END LOOP;
	insert into Member_Img_ (member_id_, img_value_) values (new_id_, img_);
end
$$;

/**
 * Updates contact & company
 */
create or replace procedure put_company(cid_ int, p_nif_ bigint, p_type_ text, p_name_ text, p_phone_number_ int, p_postal_code_ varchar(8), p_address_ text, p_location_ text, p_img_ text, p_is_deleted_ bool, p_iban_ text)
LANGUAGE plpgsql  
as
$$
declare
	old_type text;
	old_deleted bool;
begin
	select member_type_ into old_type from Member_ where id_ = cid_;
	select is_deleted_ into old_deleted from Member_ where id_ = cid_;

	if old_type != p_type_ or (old_deleted = true and old_deleted != p_is_deleted_) then
		delete from Group_Member_ gm where gm.member_id_ = cid_ and gm.group_id_ in (
			select gm2.group_id_ 
			from Group_Member_ gm2 join Group_ g on gm2.group_id_ = g.group_id_ join Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_
			where g.group_type_ = 'member_type' and gmt.member_type_ = old_type
		);
		
		insert into Group_Member_ (member_id_, group_id_) 
		select cid_, g.group_id_ from Group_ g join Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_
		where g.group_type_ = 'member_type' and gmt.member_type_ = p_type_;
	end if;

	UPDATE Contact_ SET phone_number_ = p_phone_number_, postal_code_ = p_postal_code_,address_ = p_address_, location_ = p_location_ WHERE member_id_ = cid_;
	UPDATE Company_ SET name_ = p_name_, nif_ = p_nif_ WHERE member_id_ = cid_;
	update member_  set is_deleted_ = p_is_deleted_, iban_ = p_iban_, member_type_ = p_type_ WHERE id_ = cid_;

	if p_img_ is not null then
		UPDATE Member_Img_ SET img_value_ = p_img_ WHERE member_id_ = cid_;
	end if;
end
$$;

/**
 * delete company
 */
create or replace procedure delete_company(p_id_ int)
LANGUAGE plpgsql  
as
$$
begin
	update Member_ set is_deleted_ = true where id_ = p_id_; 
	delete from Group_Member_ gm where gm.member_id_ = p_id_;
end
$$;

-- quotas

/**
 * Creates a quota selecting every member to its respective quota
 */
create or replace procedure post_quotas(p_date_ date, out count_date int) 
LANGUAGE plpgsql  
as
$$
begin
	INSERT INTO Quota_(member_id_, payment_date_, amount_, date_) SELECT m.id_, NULL, quota_value_, p_date_ FROM Member_ m join Member_Types_ mt on m.member_type_ = mt.type_ 
	where quota_value_ <> 0 and is_deleted_ = false and m.id_ not in ( select member_id_ from quota_ where date_ = p_date_);
	select count(*) into count_date from quota_ where date_ = p_date_;
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

create or replace procedure post_group(p_name_ text, p_description_ text, p_types_ text[], p_group_type_ text, p_sports_ int[], out new_id_ int)
LANGUAGE plpgsql  
as
$$
declare
	type_ text;
	sport_ int;
begin
	with new_id_table_ as (
		insert into Group_ (name_, description_, group_type_) values (p_name_, p_description_, p_group_type_) returning group_id_
	)
	select group_id_ into new_id_ from new_id_table_;

	if p_group_type_ = 'member_type' then
		foreach type_ in array p_types_
	   	loop
			insert into Group_Member_Types_ (group_id_, member_type_) values (new_id_, type_::varchar(40));
		end loop;
	elsif p_group_type_ = 'member_sport_type' then
		foreach type_ in array p_types_
	   	loop
		   	foreach sport_ in array p_sports_
		   	loop
				insert into Group_Sports_ (group_id_, sport_id_, sport_member_type_) values (new_id_, sport_, type_);
			end loop;
		end loop;
	end if;
end
$$;

create or replace procedure delete_group(p_group_id_ int)
LANGUAGE plpgsql  
as
$$
begin
	delete from Group_Event_ where group_id_ = p_group_id_;
	delete from Group_Member_ where group_id_ = p_group_id_;
	delete from Group_Sports_ where group_id_ = p_group_id_;
	delete from Group_Member_Types_ where group_id_ = p_group_id_;
	delete from Group_ where group_id_ = p_group_id_;
end
$$;

create or replace procedure post_event(name_ text, initial_date_ date, end_date_ date, groups_ int[], out new_id_ int)
LANGUAGE plpgsql  
as
$$
declare
	group_ int;
begin
	with new_id_table_ as (
		insert into Event_ (name_,initial_date_,end_date_) values (name_, initial_date_, end_date_) returning id_
	)
	select id_ into new_id_ from new_id_table_;

	foreach group_ in array groups_
   	loop
		insert into Group_Event_ (event_id_, group_id_) values (new_id_, group_);
		if not exists (select member_id_  from Attendance_ where member_id_ in (select member_id_ from Group_Member_ where group_id_ = group_) and event_id_ = new_id_)
		then
			insert into Attendance_ (member_id_, event_id_, state_) select member_id_, new_id_, null from Group_Member_ where group_id_ = group_;
		end if;
	end loop;
end
$$;