create table Candidate_ (
	id_ 			int generated always as identity,
	nif_			int unique check (nif_ <= 999999999),
	cc_ 			int unique check (cc_ <= 999999999),
	full_name_ 		varchar(60),
	nationality_ 	varchar(30),
	birth_date_		varchar(30),
	location_		varchar(30),
	address_ 		varchar(40),
	postal_code_ 	varchar(8) check (postal_code_ like '%-%'),
	email_ 			varchar(50) check (email_ like '%@%') unique,
	phone_number_	int,
	pword_			text,
	username_		varchar(30) unique,
	img_ 			bytea,
	gender_ 		varchar(40),
	
	primary key(id_)
);

create table Member_ (
	id_ 			int generated always as identity,
	member_type_	varchar(40) check (member_type_ in ('founder', 'effective', 'merit', 'corporate')),
	has_debt_ 		bool default false,
	quota_value_ 	int,
	is_deleted_ 	bool default false,
	username_		varchar(30) unique,
	pword_			varchar(100),
	
	primary key(id_)
);

create table Event_ (
	id_ 			int generated always as identity,
	name_ 			varchar(50),
	initial_date_	date,
	end_date_ 		date check (end_date_ >= initial_date_),
	
	
	primary key(id_)
		
);

create table Attendance_ (
	member_id_ 	 	int,
	event_id_		int,
	state_			varchar(20) check (state_ in ('going', 'not going', 'interested')),
	
	primary key (member_id_, event_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_),
	constraint fk_event foreign key(event_id_) references Event_(id_)
);

create table Quota_ (
	id_ 	 		int generated always as identity,
	member_id_ 	 	int,
	payment_date_	date,
	date_			date,
	
	primary key (id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table Contact_ (
	member_id_ 	 	int,
	location_		varchar(30),
	address_ 		varchar(40),
	postal_code_ 	varchar(8) check (postal_code_ like '%-%'),
	email_ 			varchar(50) check (email_ like '%@%') unique,
	phone_number_	int,
	
	primary key (member_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table Company_ (
	member_id_ 	 	int,
	nif_			int unique check (nif_ <= 999999999),
	name_ 			varchar(40),

	primary key (member_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table User_ (
	member_id_		int,
	nif_			int unique check (nif_ <= 999999999),
	cc_ 			int unique check (cc_ <= 999999999),
	full_name_ 		varchar(60),
	nationality_ 	varchar(30),
	birth_date_		varchar(30),
	enrollment_date_	date,
	paid_enrollment_	bool,
	is_admin_		bool default false,
	gender_ 		varchar(40),

	primary key (member_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table User_Img_ (
	user_id_ 	 	int,
	img_value_ 		bytea,

	primary key (user_id_),
	constraint fk_user foreign key(user_id_) references User_(member_id_)
);

create table Sport_ (
	id_ 	 		serial,
	name_			varchar(30) unique,
	is_deleted_		bool default false,

	primary key (id_)
);

create table User_Sport_ (
	user_id_ 	 	int,
	sport_id_ 	 	int,
	type_			text [],
	fed_number_		int,
	fed_id_			int,
	fed_name_		varchar(60),
	years_federated_ int [],
	is_absent_		bool default false,

	primary key (user_id_, sport_id_),
	constraint fk_user foreign key(user_id_) references User_(member_id_),
	constraint fk_sport foreign key(sport_id_) references Sport_(id_)
);

create table Membership_card_ (
	user_id_ 	 	int,
	qrcode_			text unique,
	
	primary key(user_id_),
	constraint fk_user foreign key(user_id_) references User_(member_id_)
);

create table Member_token_ (
	member_id_ 	 	int unique,
	token_			text,
	createdAt_		date,
	
	primary key(member_id_),
	constraint fk_user foreign key(member_id_) references Member_(id_)
)





