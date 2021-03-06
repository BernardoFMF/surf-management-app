/**
 * Quando a cota ? atualixada verificar se ainda h? divida
*/

create or replace function verifyDebt()
returns trigger
language plpgsql
as
$body$
begin 
	if not exists (select * from Quota_  where payment_date_ is null and member_id_ = new.member_id_) 
		and (exists (select * from User_ where member_id_ = new.member_id_ and paid_enrollment_ = true)
			or exists (select * from Company_ where member_id_ = new.member_id_))
	then 
		update member_ set has_debt_ = false where id_ = new.member_id_;
	end if;
	return new;
end
$body$;

create or replace trigger verifyDebtTrigger 
after update 
on Quota_
for each row
execute procedure verifyDebt();

--Teste para o trigger 
--update quota_ set payment_date_ = '2022-05-06' where id_ = 4;

/**
 * Quando ? posta uma nova quota todos os members ficam com has_debt_ a true
*/

create or replace function setDebt()
returns trigger 
language plpgsql
as
$$
begin 
	update member_ set has_debt_ = true where is_deleted_ = false and member_type_ in (select type_ from Member_Types_ where quota_value_ <> 0);
	return new;
end
$$;

create or replace trigger setDebtTrigger
after insert 
on Quota_
execute procedure setDebt();

--Teste para o trigger 
--call post_quotas('2023-01-01'); 

create or replace function deleteSportsForDeletedUser()
returns trigger 
language plpgsql
as
$$
begin 
	update user_sport_  set is_absent_ = true where user_id_ in (select id_ from Member_ where is_deleted_ = true);
	return new;
end
$$;

create or replace trigger deleteSportsForDeletedUserTrigger
after update 
on User_
execute procedure deleteSportsForDeletedUser();


create or replace function deleteSportsForDeletedSport()
returns trigger 
language plpgsql
as
$$
begin 
	update user_sport_  set is_absent_ = true where sport_id_ in (select id_ from Sport_ where is_deleted_ = true);
	return new;
end
$$;

create or replace trigger deleteSportsForDeletedSportTrigger
after update 
on Sport_
execute procedure deleteSportsForDeletedSport();

create or replace function addGroupMembersByMember()
returns trigger
language plpgsql
as
$body$
begin
	insert into Group_Member_ (member_id_, group_id_) 
	select distinct id_, new.group_id_ from Member_ 
	where member_type_ = new.member_type_;
	return new;
end
$body$;

create or replace trigger addGroupMembersByMemberTrigger 
after insert 
on Group_Member_Types_
for each row
execute procedure addGroupMembersByMember();

create or replace function addGroupMembersBySport()
returns trigger
language plpgsql
as
$body$
begin	
	insert into Group_Member_ (member_id_, group_id_)
	select distinct us.user_id_, new.group_id_ from User_Sport_ us
	where new.sport_member_type_ = any(us.type_) and us.sport_id_ = new.sport_id_ and us.user_id_ not in (
		select g.member_id_ 
		from Group_Member_ g
		where g.group_id_ = new.group_id_
	);
	return new;
end
$body$;

create or replace trigger addGroupMembersBySportTrigger 
after insert 
on Group_Sports_
for each row
execute procedure addGroupMembersBySport();

