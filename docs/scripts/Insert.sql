insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_) values (15478233,'15678424','Miguel Gafanhoto da Silva Lopes','Portugues','2000-05-19','Lisboa','Rua do Ouro n45','2000-546','miguelgf@gmail.com',
								967021559,'83AFECF217B446F5F040D1B18A804AA30463E200635C94B3AFC0D7807FC33004','miguelf');
								
insert into Member_(member_type_, has_debt_, quota_value_, is_deleted_) values ('founder',false,0,false), ('effective',true,15,false), ('corporate',false,50,false), ('corporate',false, 50, false);

insert into Event_(name_, initial_date_, end_date_) values ('Assembleia Geral','2022-4-9','2022-4-9'), ('WSL','2022-07-08','2022-07-28');

insert into Attendance_ values (1,1,'going'), (2,2,'going');

insert into Quota_(member_id_, payment_date_, date_) values (2,'2021-06-23','2021-01-01'), (2,null,'2022-1-1'), (3,'2021-06-07','2021-01-01'), (3,'2022-09-28','2022-01-01'), (4,'2022-11-26','2022-01-01');

insert into Contact_ values (1,'Ericeira','Rua do Clérigos n2 3ºesq','2050-032','afonsoribs@hotmail.com', 962681730), (2,'Lisboa','Rua da Bobadela n43', '2000-561', 'jlopes@gmail.com', 925827332),(3,'Ericeira','Rua da ericeira','2812-829','ess@gmail.com', 938172388), (4,'Billacity','Rua da billa', '2220-829', 'billybonga@gmail.com', 932323238) ;

insert into Company_ values (3,23451789,'Ripcurl shop'), (4,423213348,'Billabong');

insert into User_ values (1,25054936,45925485,'Afonso Melo Ribeiro','Portugues','1997-05-25','2020-03-14',true, 'EA98D5CDA5D40DD1889BA34628F0FA65D7921BDEFB791F420E2B9CA99F952BE8',true,'afonsoribeiro'), (2,25054938,45925475,'José Elias Lopes','Portugues','1989-04-27','2021-03-14', true, 'BD31AD2503125F31258EE522EA82740798E5F56899DABE8BFB1F0D4A56E6E0F6',false,'joselopes');

insert into User_img_ values (1,'profilephoto.jpeg','\xDEADBEEF'), (2,'ppic.png', '\xEAABDFFA');

insert into Sport_(name_, is_deleted_) values ('Surf',false), ('Bodyboard',false);

insert into User_sport_ values (2,1,array['aprendice'],54,'Federacao Portuguesa de Surf',array[2021,2022],false), (2,2,array['aprendice'],53,'Federacao Portuguesa de Bodyboard',array[2022],false);

insert into Membership_card_ values (1,'qrcodebuedabarilgostomuito'), (2,'comopoderdaamizadetudoepossivel');