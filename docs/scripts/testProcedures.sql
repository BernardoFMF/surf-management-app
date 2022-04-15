call post_user(45623876,87450157,'effective',15,'2000-06-09','Portugues','Miguel Andre Santos',967021667,'concursodatvi@gmail.com','2070-567','Rua Jose da Silva','Lisboa','5B63FACAB549DB1B8444DC1029DBAD4214BEC793B1186DBC855CF94D9BB6C9F0','miguel38','qrcodegandafixe',true);

call put_user(1,45623876,87110157,'effective','2000-06-09','Portugues','Miguel Andre Santos',967021667,'2070-567','Rua Jose da Silva','Lisboa','5B63FACAB549DB1B8444DC1029DBAD4214BEC793B1186DBC855CF94D9BB6C9F0','miguel38','/x1321D33F',true, 'foto.png',true);

call post_sport('Surf');

call post_user_sport(1,1,54,56814,'Federacao de Surf Portuguesa',array['practicioner'],array[2022]);

insert into Event_(name_, initial_date_, end_date_) values ('Assembleia Geral','2022-4-9','2022-4-9');

call delete_event(1);

insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_) values (15478233,'15678424','Miguel Gafanhoto da Silva Lopes','Portugues','2000-05-19','Lisboa','Rua do Ouro n45','2000-546','miguelgf@gmail.com',967021559,'83AFECF217B446F5F040D1B18A804AA30463E200635C94B3AFC0D7807FC33004','miguelf');
							
call aproove_candidate(1, 'effective', 15, 'qrmtbaril', true);

call post_company('BillaBonga',24567028,967022458,'billabong@clix.pt','2580-278','Mem Martins','Lisboa','billi','$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K',0);

call put_company(1,'BillaBong',24567028,967022458,'billabong@hotmail.com','2580-278','Mem Martins','Lisboa');

call post_quotas('01-01-2022');