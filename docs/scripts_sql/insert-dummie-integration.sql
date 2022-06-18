insert into Member_Types_ 
values ('effective', 15, 'user'),
('corporate', 50, 'company'),
('corporatev2', 51, 'company'),
('merit', 0, 'user'),
('founder', 0, 'user');

insert into Member_(member_type_, has_debt_, is_deleted_, username_, pword_, iban_) 
values ('founder',false,false, 'afonsoribeiro', '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K', 'PT50001100000001234567833');

insert into Contact_ 
values (1,'Ericeira','Rua do Cl�rigos n2 3�esq','2050-032','afonsoribeiro@gmail.com', 962681730);

insert into User_ 
values (1,250549361,459254851,'Afonso Melo Ribeiro','Portuguese','1997-05-25','2020-03-14',true, true, 'Male');

insert into Member_img_ 
values (1, null);

insert into Membership_card_ 
values (1,'data:image/png;base64,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');
