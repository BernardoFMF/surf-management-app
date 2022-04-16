/**
 * Quando a cota é atualixada verificar se ainda há divida
*/

create or replace function verifyDebt()
returns trigger
language plpgsql
as
$body$
begin 
	if not exists (select * from Quota_  where payment_date_ is null and member_id_ = new.member_id_) and not exists (select * from User_ where member_id_ = new.member_id_ and paid_enrollment_ = false) then 
	update member_ set has_debt_ = false;
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
--update quota_ set payment_date_ = '2022-05-06' where id_ = 2;

/**
 * Quando é posta uma nova quota todos os members ficam com has_debt_ a true
*/

create or replace function setDebt()
returns trigger 
language plpgsql
as
$$
begin 
	update member_ set has_debt_ = true where quota_value_ <> 0;
	return new;
end
$$;

create or replace trigger setDebtTrigger
after insert 
on Quota_
execute procedure setDebt()

--Teste para o trigger 
--call post_quotas('2023-01-01'); 



