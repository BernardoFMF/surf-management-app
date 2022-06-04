insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_, gender_, iban_) 
values (154781132, 156784242,'Miguel da Silva Lopes','Portuguese','2000-05-19','Lisboa','Rua do Ouro n45','2000-546','miguelgf@gmail.com', 967021559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','miguelf', 'Male', 'PT50002700000001234567831'),
(151444331, 156722241,'João Silva','Portuguese','2001-10-19','Lisboa','Rua do Cobre n22','2001-226','Silva@gmail.com', 933321559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Silva', 'Male', 'PT50002700000001234567832'),
(151111332, 151111242,'Roberto Bolha','Portuguese','1999-05-19','Porto','Rua da madeira n15','2075-543','Bolha@gmail.com', 922221559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Bolha', 'Other', 'PT50002700000001234567833'),
(152222333, 156333243,'Amilcar Dias','Portuguese','2000-09-19','Braga','Rua do Ouro n45','2330-216','Dias@gmail.com', 911121559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Dias', 'Other', 'PT50002700000001234567835'),
(222783334, 156111244,'Américo Jorge','Portuguese','2000-02-17','Coimbra','Rua da laranja n67','2321-541','Jorge@gmail.com', 937821559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Jorge', 'Male', 'PT50002700000001234567834'),
(123782333, 159994243,'Roger Dias','Portuguese','1999-01-11','Santarém','Rua da santa n45','2355-216','Roger@gmail.com', 911144559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Roger', 'Other', 'PT50002700000001234567836'),
(222782333, 155554243,'Tiago Pedro','Portuguese','1987-05-27','Portimão','Rua da mão n11','2220-216','Pedro@gmail.com', 911121999,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Pedro', 'Male', 'PT50002700000001234567838'),
(221782333, 133384243,'Nuna Dias','Portuguese','1967-04-11','Lisboa','Rua do Bolha n45','2344-216','Nuna@gmail.com', 911224543,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Nuna', 'Female', 'PT50002700000001234567837'),
(224782333, 156664243,'Rui Frango','Portuguese','1984-02-12','Lisboa','Rua do Calvário n45','2322-216','Frango@gmail.com', 911231469,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Frango', 'Other', 'PT50002700000001234567839');

insert into Member_Types_ 
values ('effective', 15),
('corporate', 50),
('merit', 0),
('founder', 0);
								
insert into Member_(member_type_, has_debt_, is_deleted_, username_, pword_, iban_) 
values ('founder',false,false, 'afonsoribeiro', '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K', 'PT50002700000001234567833'), 
('effective',true,FALSE, 'joselopes', '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K', 'PT50001234270000000567833'),
('corporate',false,FALSE, 'ripcurl','$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K',  'PT50001230056742700000833'), 
('corporate',false, FALSE,'billabong','$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K',  'PT50001211116742700000833');

insert into Event_(name_, initial_date_, end_date_) 
values ('Assembleia Geral','2022-4-9','2022-4-9'),
('Assembleia Particular','2022-4-11','2022-4-12'),
('Assembleia','2022-4-13','2022-4-14'),
('Reunião do conselho','2022-4-15','2022-4-15'),
('Almoçarada Geral','2022-4-21','2022-4-22'),
('Almoçarada Particular','2022-4-23','2022-4-23'),
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
values (1,'Ericeira','Rua do Clérigos n2 3ºesq','2050-032','afonsoribeiro@gmail.com', 962681730),
(2,'Lisboa','Rua da Bobadela n43', '2000-561', 'jlopes@gmail.com', 925827332),
(3,'Ericeira','Rua da ericeira','2812-829','ess@gmail.com', 938172388),
(4,'Billacity','Rua da billa', '2220-829', 'billybonga@gmail.com', 932323238) ;

insert into Company_ 
values (3,234517789,'Ripcurl shop'),
(4,423213348,'Billabong');

insert into User_ 
values (1,250549361,459254851,'Afonso Melo Ribeiro','Portuguese','1997-05-25','2020-03-14',true, true, 'Male'),
(2,250549381,459254751,'José Elias Lopes','Portuguese','1989-04-27','2021-03-14', true,false, 'Male');

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
(1,1,array['apprentice'],4891, 54,'Federacao Portuguesa de Surf',array[2021,2022],false), 
(1,2,array['coach'],4891, 52,'Federacao Portuguesa de Kneeboard',array[2019,2021,2022],false), 
(1,3,array['practitioner'],4891, 51,'Federacao Portuguesa de Bodysurf',array[2021,2022],false), 
(1,4,array['apprentice'],4891, 50,'Federacao Portuguesa de Wakeboard',array[2011,2012],false), 
(1,5,array['apprentice'],4891, 55,'Federacao Portuguesa de Finswimm',array[2012,2013],false),
(1,6,array['practitioner'],4891, 56,'Federacao Portuguesa de Windsurf',array[2014,2015],false), 
(1,7,array['apprentice'],4891, 57,'Federacao Portuguesa de Raft',array[2018,2019],false), 
(1,8,array['coach'],4891, 58,'Federacao Portuguesa de Kiteboard',array[2016,2017],false), 
(1,9,array['practitioner'],4891, 59,'Federacao Portuguesa de Paddleboard',array[2015,2016],false), 
(1,10,array['apprentice'],4891, 60,'Federacao Portuguesa de Canyoning',array[2021,2022],false), 
(1,11,array['practitioner'],4891, 55,'Federacao Portuguesa de Kayak Polo',array[2020,2021],false); 

insert into Membership_card_ 
values (1,'data:image/png;base64,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'),
(2, 'data:image/png;base64,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');