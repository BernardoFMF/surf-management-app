insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_, gender_) 
values (154781132, 156784242,'Miguel Gafanhoto da Silva Lopes','Portuguese','2000-05-19','Lisboa','Rua do Ouro n45','2000-546','miguelgf@gmail.com', 967021559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','miguelf', 'Male'),
(151444331, 156722241,'João Silva','Portuguese','2001-10-19','Lisboa','Rua do Cobre n22','2001-226','Silva@gmail.com', 933321559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Silva', 'Male'),
(151111332, 151111242,'Roberto Bolha','Portuguese','1999-05-19','Porto','Rua da madeira n15','2075-543','Bolha@gmail.com', 922221559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Bolha', 'Other'),
(152222333, 156333243,'Amilcar Dias','Portuguese','2000-09-19','Braga','Rua do Ouro n45','2330-216','Dias@gmail.com', 911121559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Dias', 'Other'),
(222783334, 156111244,'Américo Jorge','Portuguese','2000-02-17','Coimbra','Rua da laranja n67','2321-541','Jorge@gmail.com', 937821559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Jorge', 'Male'),
(123782333, 159994243,'Roger Dias','Portuguese','1999-01-11','Santarém','Rua da santa n45','2355-216','Roger@gmail.com', 911144559,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Roger', 'Other'),
(222782333, 155554243,'Tiago Pedro','Portuguese','1987-05-27','Portimão','Rua da mão n11','2220-216','Pedro@gmail.com', 911121999,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Pedro', 'Male'),
(221782333, 133384243,'Nuna Dias','Portuguese','1967-04-11','Lisboa','Rua do Bolha n45','2344-216','Nuna@gmail.com', 911224543,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Nuna', 'Female'),
(224782333, 156664243,'Rui Frango','Portuguese','1984-02-12','Lisboa','Rua do Calvário n45','2322-216','Frango@gmail.com', 911231469,'$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K','Frango', 'Other');

insert into Member_Types_ 
values ('effective', 15),
('corporate', 50), 
('merit', 0), 
('founder', 0);
								
insert into Member_(member_type_, has_debt_, is_deleted_, username_, pword_) 
values ('founder',false,false, 'afonsoribeiro', '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K'), 
('effective',true,FALSE, 'joselopes', '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K'),
('corporate',false,FALSE, 'ripcurl','$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K'), 
('corporate',false, FALSE,'billabong','$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K');

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
(1,8,'interested'),
(1,9,'going'),
(1,10,'going'),
(1,11,'not going'),
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
values (2,'2021-06-23', 15, '2021-01-01'),
(2,'2021-06-23', 15, '2021-01-01'),
(2,'2020-01-23', 15, '2020-01-01'),
(2,'2019-02-23', 15, '2019-01-01'),
(2,'2018-02-23', 15, '2018-01-01'),
(2,'2017-03-23', 15, '2017-01-01'),
(2,'2016-04-23', 15, '2016-01-01'),
(2,'2015-05-23', 15, '2015-01-01'),
(2,'2014-06-23', 15, '2014-01-01'),
(2,'2013-07-23', 15, '2013-01-01'),
(2,'2012-07-23', 15, '2012-01-01'),
(2,'2011-08-23', 15, '2011-01-01'),
(2,null, 15,'2022-1-1'),
(1,null, 15,'2022-01-01'),
(3,'2021-06-07',  50,'2021-01-01'),
(3,'2022-09-28', 50,'2022-01-01'),
(4,'2022-11-26', 50,'2022-01-01'),
(1,'2021-01-02', 15,'2021-01-01'),
(1,'2019-01-02', 15,'2019-01-01'),
(1,'2018-01-02', 15,'2018-01-01'),
(1,'2017-01-02', 15,'2017-01-01'),
(1,'2016-01-02', 15,'2016-01-01'),
(1,'2015-01-02', 15,'2015-01-01');


insert into Contact_ 
values (1,'Ericeira','Rua do Clérigos n2 3ºesq','2050-032','miguelgbosousa@gmail.com', 962681730),
(2,'Lisboa','Rua da Bobadela n43', '2000-561', 'jlopes@gmail.com', 925827332),
(3,'Ericeira','Rua da ericeira','2812-829','ess@gmail.com', 938172388),
(4,'Billacity','Rua da billa', '2220-829', 'billybonga@gmail.com', 932323238) ;

insert into Company_ 
values (3,23451789,'Ripcurl shop'),
(4,423213348,'Billabong');

insert into User_ 
values (1,25054936,45925485,'Afonso Melo Ribeiro','Portuguese','1997-05-25','2020-03-14',true, true, 'Male'),
(2,25054938,45925475,'José Elias Lopes','Portuguese','1989-04-27','2021-03-14', true,false, 'Male');

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
values (2,1,array['aprendice'],4890, 54,'Federacao Portuguesa de Surf',array[2021,2022],false), 
(2,2,array['coach'],4890, 52,'Federacao Portuguesa de Kneeboard',array[2019,2021,2022],false), 
(2,3,array['praticcioner'],4890, 51,'Federacao Portuguesa de Bodysurf',array[2021,2022],false), 
(2,4,array['aprendice'],4890, 50,'Federacao Portuguesa de Wakeboard',array[2011,2012],false), 
(2,5,array['aprendice'],4890, 55,'Federacao Portuguesa de Finswimm',array[2012,2013],false),
(2,6,array['praticcioner'],4890, 56,'Federacao Portuguesa de Windsurf',array[2014,2015],false), 
(2,7,array['aprendice'],4890, 57,'Federacao Portuguesa de Raft',array[2018,2019],false), 
(2,8,array['coach'],4890, 58,'Federacao Portuguesa de Kiteboard',array[2016,2017],false), 
(2,9,array['praticcioner'],4890, 59,'Federacao Portuguesa de Paddleboard',array[2015,2016],false), 
(2,10,array['aprendice'],4890, 60,'Federacao Portuguesa de Canyoning',array[2021,2022],false), 
(2,11,array['praticcioner'],4890, 55,'Federacao Portuguesa de Kayak Polo',array[2020,2021],false), 
(1,1,array['aprendice'],4891, 54,'Federacao Portuguesa de Surf',array[2021,2022],false), 
(1,2,array['coach'],4891, 52,'Federacao Portuguesa de Kneeboard',array[2019,2021,2022],false), 
(1,3,array['praticcioner'],4891, 51,'Federacao Portuguesa de Bodysurf',array[2021,2022],false), 
(1,4,array['aprendice'],4891, 50,'Federacao Portuguesa de Wakeboard',array[2011,2012],false), 
(1,5,array['aprendice'],4891, 55,'Federacao Portuguesa de Finswimm',array[2012,2013],false),
(1,6,array['praticcioner'],4891, 56,'Federacao Portuguesa de Windsurf',array[2014,2015],false), 
(1,7,array['aprendice'],4891, 57,'Federacao Portuguesa de Raft',array[2018,2019],false), 
(1,8,array['coach'],4891, 58,'Federacao Portuguesa de Kiteboard',array[2016,2017],false), 
(1,9,array['praticcioner'],4891, 59,'Federacao Portuguesa de Paddleboard',array[2015,2016],false), 
(1,10,array['aprendice'],4891, 60,'Federacao Portuguesa de Canyoning',array[2021,2022],false), 
(1,11,array['praticcioner'],4891, 55,'Federacao Portuguesa de Kayak Polo',array[2020,2021],false); 

insert into Membership_card_ 
values (1,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATOSURBVO3BQY4jRxAEwfAC//9l1xzzVECjk6PVKszwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1Lzm4BMaiYgk5ongExqJiC/Sc0bJ1WLTqoWnVQt+mSZmk1AngAyqbkBcqPmRs0EZFIzAZnUPKFmE5BNJ1WLTqoWnVQt+uTLgDyh5gkgm9RMQCY1N2omIDdAJjVPAHlCzTedVC06qVp0UrXok7+MmhsgN0AmNROQN9RMQP4mJ1WLTqoWnVQt+uQvB+QJNW+omYD8n5xULTqpWnRSteiTL1Pzm4DcqNmkZgIyqblR84aaP8lJ1aKTqkUnVYs+WQbk36RmAnIDZFIzAZnUTEAmNROQSc0EZFJzA+RPdlK16KRq0UnVok9eUvMnAXID5Ak1m4A8oea/5KRq0UnVopOqRZ+8BGRSMwHZpGZScwNkE5BJzY2aGyA3QDap+aaTqkUnVYtOqhZ9sgzIjZobIJOaN9Q8AWRScwNkUvMGkBs1E5BJzRNAJjVvnFQtOqladFK1CH/kBSA3aiYgk5obIE+omYDcqJmAbFIzAZnU3ACZ1PzJTqoWnVQtOqlahD/yApBJzRNAJjU3QCY1E5BJzQ2QGzU3QCY1N0C+Sc0NkEnNppOqRSdVi06qFn2yDMikZgLyBJAn1NwAuVEzAXkCyI2aJ4DcqLkBMqn5ppOqRSdVi06qFuGPLALyhJoJyKRmAvKEmk1AJjU3QG7UTEAmNROQGzVPAJnUvHFSteikatFJ1aJPfpmaCcgNkEnNDZAJyBNq3gAyqbkBMqn5TWo2nVQtOqladFK1CH/kFwG5UbMJyKTmCSCTmgnIpGYTkEnNBGRSMwG5UbPppGrRSdWik6pFn/xhgNyomYC8AWRSM6mZgExqJiA3at4AMqmZgExqftNJ1aKTqkUnVYs+eQnIpOYJNU8AmdQ8AWRSMwF5Asik5gkgk5obNZuATGreOKladFK16KRq0Sf/MiBvALlRcwPkDTUTkBs1N0AmNROQSc0NkEnNpGbTSdWik6pFJ1WLPvkyIG+omYBMat5QMwGZ1NwAeQLIpOYNIE8AmdRsOqladFK16KRqEf7IC0AmNTdAJjU3QG7UfBOQN9RMQL5JzQTkCTVvnFQtOqladFK1CH/kPwzIjZobIJOaGyCTmjeATGqeAHKjZgJyo+aNk6pFJ1WLTqoW4Y+8AOQ3qXkCyKTmm4BMaiYgN2omIJOaCcgTar7ppGrRSdWik6pFnyxTswnIDZBJzQ2QSc0NkEnNBGRSc6NmAnKjZhOQSc2mk6pFJ1WLTqoWffJlQJ5Qs0nNBOQJNROQSc0EZFLzBJBvUvNNJ1WLTqoWnVQt+uQvB2RSMwF5A8ikZgIyqZnUTEAmNTdAJjU3QCY1m06qFp1ULTqpWvTJXwbIE2o2AZnUfJOaGyC/6aRq0UnVopOqRZ98mZpvUvMEkDfUTEAmNROQSc0bQG7UTGomIN90UrXopGrRSdWiT5YB+U1AJjU3aiYgN2omIG8AmdQ8oWYC8oSabzqpWnRSteikahH+SNWSk6pFJ1WLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatE/mEg4N+2PBjoAAAAASUVORK5CYII='),
(2,'comopoderdaamizadetudoepossivel');

