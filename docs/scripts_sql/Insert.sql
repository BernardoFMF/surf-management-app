insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_, gender_, iban_) 
values (154781132, 156784242,'Miguel da Silva Lopes','Portuguese','2000-05-19','Lisboa','Rua do Ouro n45','2000-546','miguelgf@gmail.com', 967021559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','miguelf', 'Male', 'PT50002700000001234567831'),
(151444331, 156722241,'Jo�o Silva','Portuguese','2001-10-19','Lisboa','Rua do Cobre n22','2001-226','Silva@gmail.com', 933321559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Silva', 'Male', 'PT50002700000001234567832'),
(151142332, 151111142,'Roberto Bolha','Portuguese','1999-05-19','Porto','Rua da madeira n15','2075-543','Bolha@gmail.com', 922221559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Bolha', 'Other', 'PT50002700000001234567833'),
(152242333, 156333243,'Amilcar Dias','Portuguese','2000-09-19','Braga','Rua do Ouro n45','2330-216','Dias@gmail.com', 911121559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Dias', 'Other', 'PT50002700000001234567835'),
(222783334, 156111244,'Am�rico Jorge','Portuguese','2000-02-17','Coimbra','Rua da laranja n67','2321-541','Jorge@gmail.com', 937821559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Jorge', 'Male', 'PT50002700000001234567834'),
(123782333, 159994243,'Roger Dias','Portuguese','1999-01-11','Santar�m','Rua da santa n45','2355-216','Roger@gmail.com', 911144559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Roger', 'Other', 'PT50002700000001234567836'),
(222782133, 155554243,'Tiago Pedro','Portuguese','1987-05-27','Portim�o','Rua da m�o n11','2220-216','Pedro@gmail.com', 911121999,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Pedro', 'Male', 'PT50002700000001234567838'),
(221782233, 133384243,'Nuna Dias','Portuguese','1967-04-11','Lisboa','Rua do Bolha n45','2344-216','Nuna@gmail.com', 911224543,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Nuna', 'Female', 'PT50002700000001234567837'),
(224782433, 156664243,'Rui Frango','Portuguese','1984-02-12','Lisboa','Rua do Calv�rio n45','2322-216','Frango@gmail.com', 911231469,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Frango', 'Other', 'PT50002700000001234567839');

insert into Member_Types_ 
values ('effective', 15, 'user'),
('corporate', 50, 'company'),
('corporatev2', 51, 'company'),
('merit', 0, 'user'),
('founder', 0, 'user');
								
insert into Member_(member_type_, has_debt_, is_deleted_, username_, pword_, iban_) 
values ('founder',false,false, 'afonsoribeiro', '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K', 'PT50001100000001234567833'), 
('effective',true,FALSE, 'joselopes', '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K', 'PT50001234270000000567833'),
('corporate',false,FALSE, 'ripcurl','$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K',  'PT50001230056742700000833'), 
('corporate',false, FALSE,'billabong','$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K',  'PT50001211116742700000833');
/*
insert into Event_(name_, initial_date_, end_date_) 
values ('Assembleia Geral','2022-4-9','2022-4-9'),
('Assembleia Particular','2022-4-11','2022-4-12'),
('Assembleia','2022-4-13','2022-4-14'),
('Reuni�o do conselho','2022-4-15','2022-4-15'),
('Almo�arada Geral','2022-4-21','2022-4-22'),
('Almo�arada Particular','2022-4-23','2022-4-23'),
('Jantarada Geral','2022-4-25','2022-4-26'),
('Jantarada Particular','2022-4-1','2022-4-2'),
('Lanche Geral','2022-4-3','2022-4-4'),
('Lanche Particular','2022-4-1','2022-4-5'),
('WSL','2022-07-08','2022-07-28');

insert into Attendance_ 
values (1,1,'going'),
(1,2,'interested'),
(1,3,'not going'),
(1,4,'not going'),
(1,5,'going'),
(1,6,'going'),
(1,7,'interested'),
(2,1,'going'),
(2,2,'going'),
(2,3,'going'),
(2,4,'not going'),
(2,5,'interested'),
(2,6,'going'),
(2,7,'interested'),
(2,8,'interested'),
(2,9,'going'),
(2,10,'interested'),
(2,11,'not going');
*/
insert into Quota_(member_id_, payment_date_, amount_, date_) 
values (2,null, 15, '2022-01-01'),
(2,'2021-06-23', 15, '2021-01-01'),
(2,null, 15, '2020-01-01'),
(2,'2019-02-23', 15, '2019-01-01'),
(2,'2018-02-23', 15, '2018-01-01'),
(2,null, 15, '2017-01-01'),
(2,'2016-04-23', 15, '2016-01-01'),
(2,'2015-05-23', 15, '2015-01-01'),
(2,'2014-06-23', 15, '2014-01-01'),
(2,'2013-07-23', 15, '2013-01-01'),
(2,'2012-07-23', 15, '2012-01-01'),
(2,'2011-08-23', 15, '2011-01-01'),
(3,null,  50,'2021-01-01'),
(3,null, 50,'2022-01-01'),
(4,null, 50,'2022-01-01');


insert into Contact_ 
values (1,'Ericeira','Rua do Cl�rigos n2 3�esq','2050-032','afonsoribeiro@gmail.com', 962681730),
(2,'Lisboa','Rua da Bobadela n43', '2000-561', 'jlopes@gmail.com', 925827332),
(3,'Ericeira','Rua da ericeira','2812-829','ess@gmail.com', 938172388),
(4,'Billacity','Rua da billa', '2220-829', 'billybonga@gmail.com', 932323238);

insert into Company_ 
values (3,234517789,'Ripcurl shop'),
(4,423213348,'Billabong');

insert into User_ 
values (1,250549361,459254851,'Afonso Melo Ribeiro','Portuguese','1997-05-25','2020-03-14',true, true, 'Male'),
(2,250549381,459254751,'Jos� Elias Lopes','Portuguese','1989-04-27','2021-03-14', true,false, 'Male');

insert into Member_img_ 
values (1, null), (2, null), (3, null), (4, null);

insert into Sport_(name_, is_deleted_) 
values ('Surfing',false),
('Kneeboarding',false),
('Bodysurfing',false),
('Wakeboard',false),
('Finswimming',false),
('Windsurf',false),
('Rafting',false),
('Kiteboarding',false),
('Paddleboarding',false),
('Canyoning',false),
('Kayak Polo',false),
('Bodyboarding',false);

insert into User_sport_ 
values (2,1,array['apprentice'],4890, 54,'Federacao Portuguesa de Surf',array[2021,2022],false), 
(2,2,array['coach'],4890, 52,'Federacao Portuguesa de Kneeboard',array[2019,2021,2022],false), 
(2,3,array['practitioner'],4890, 51,'Federacao Portuguesa de Bodysurf',array[2021,2022],false), 
(2,4,array['apprentice'],4890, 50,'Federacao Portuguesa de Wakeboard',array[2011,2012],false), 
(2,5,array['apprentice'],4890, 55,'Federacao Portuguesa de Finswimm',array[2012,2013],false),
(2,6,array['practitioner'],4890, 56,'Federacao Portuguesa de Windsurf',array[2014,2015],false), 
(2,7,array['apprentice'],4890, 57,'Federacao Portuguesa de Raft',array[2018,2019],false), 
(2,8,array['coach'],4890, 58,'Federacao Portuguesa de Kiteboard',array[2016,2017],false), 
(2,9,array['practitioner'],4890, 59,'Federacao Portuguesa de Paddleboard',array[2015,2016],false), 
(2,10,array['apprentice'],4890, 60,'Federacao Portuguesa de Canyoning',array[2021,2022],false), 
(2,11,array['practitioner'],4890, 55,'Federacao Portuguesa de Kayak Polo',array[2020,2021],false), 
(1,1,array['practitioner'],4891, 54,'Federacao Portuguesa de Surf',array[2021,2022],false); 

insert into User_Sport_Types_(type_) 
values ('coach'),
('practitioner'),
('apprentice'),
('jury');

call post_group('grupo para fundadores', 'descricao de grupo', array['founder'], 'member_type', array[]::integer[], 0);
call post_group('grupo para effective e corporate', 'descricao de grupo',array['effective', 'corporate'], 'member_type', array[]::integer[], 0);
call post_group('grupo para coaches', 'descricao de grupo', array['coach'], 'member_sport_type', array[1], 0);
call post_group('grupo para coaches do desporto 2', 'descricao de grupo', array['coach'], 'member_sport_type', array[2], 0);

insert into Membership_card_ 
values (1,'data:image/png;base64,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'),
(2, 'data:image/png;base64,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');