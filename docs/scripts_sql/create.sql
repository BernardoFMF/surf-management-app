create table Candidate_ (
	id_ 			int generated always as identity,
	nif_			int unique check (nif_ <= 999999999),
	cc_ 			int unique check (cc_ <= 999999999),
	full_name_ 		text,
	nationality_ 	text,
	birth_date_		date,
	location_		text,
	address_ 		text,
	postal_code_ 	varchar(8) check (postal_code_ like '%-%'),
	email_ 			text check (email_ like '%@%') unique,
	phone_number_	int,
	pword_			text,
	username_		text,
	img_ 			text,
	gender_ 		text,
	iban_ 			text unique check (iban_ like 'PT50%'),
	
	primary key(id_)
);

create table Member_Types_ (
	type_ 			text,
	quota_value_	int,
	category_		text check (category_ in ('user', 'company')),
	
	primary key(type_)
);

create table Member_ (
	id_ 			int generated always as identity,
	member_type_	text,
	has_debt_ 		bool default false,
	is_deleted_ 	bool default false,
	username_		text,
	pword_			text,
	iban_			text check (iban_ like 'PT50%'),
	
	primary key(id_),
	constraint fk_role foreign key(member_type_) references Member_Types_ (type_)
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
	state_			varchar(20) check (state_ in ('going', 'not going', 'interested', null)),
	
	primary key (member_id_, event_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_),
	constraint fk_event foreign key(event_id_) references Event_(id_)
);

create table Quota_ (
	id_ 	 		int generated always as identity,
	member_id_ 	 	int,
	payment_date_	date,
	amount_ 		int,
	date_			date,
	
	primary key (id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table Contact_ (
	member_id_ 	 	int,
	location_		text,
	address_ 		text,
	postal_code_ 	varchar(8) check (postal_code_ like '%-%'),
	email_ 			text check (email_ like '%@%') unique,
	phone_number_	int,
	
	primary key (member_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table Company_ (
	member_id_ 	 	int,
	nif_			int unique check (nif_ <= 999999999),
	name_ 			text,

	primary key (member_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table User_ (
	member_id_		int,
	nif_			int unique check (nif_ <= 999999999),
	cc_ 			int unique check (cc_ <= 999999999),
	full_name_ 		text,
	nationality_ 	text,
	birth_date_		date,
	enrollment_date_	date,
	paid_enrollment_	bool,
	is_admin_		bool default false,
	gender_ 		text,

	primary key (member_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_)
);

create table Member_Img_ (
	member_id_ 	 	int,
	img_value_ 		text,

	primary key (member_id_),
	constraint fk_user foreign key(member_id_) references Member_ (id_)
);

create table Sport_ (
	id_ 	 		int generated always as identity,
	name_			text unique,
	is_deleted_		bool default false,

	primary key (id_)
);

create table User_Sport_ (
	user_id_ 	 	int,
	sport_id_ 	 	int,
	type_			text [],
	fed_number_		int,
	fed_id_			int,
	fed_name_		text,
	years_federated_ int [],
	is_absent_		bool default false,
	is_candidate_ 	bool default false,

	primary key (user_id_, sport_id_),
	constraint fk_user foreign key(user_id_) references User_(member_id_),
	constraint fk_sport foreign key(sport_id_) references Sport_(id_)
);

create table Group_ (
	group_id_ 	 	int generated always as identity,
	name_			text,
	description_	text,
	group_type_		text check (group_type_ in ('member_type', 'member_sport_type')),
	
	primary key (group_id_)
);

create table Group_Member_ (
	member_id_		int,
	group_id_		int,
	
	primary key (member_id_, group_id_),
	constraint fk_member foreign key(member_id_) references Member_(id_),
	constraint fk_group foreign key(group_id_) references Group_(group_id_)
);

create table Group_Event_ (
	event_id_		int,
	group_id_		int,
	
	primary key (event_id_, group_id_),
	constraint fk_event foreign key(event_id_) references Event_(id_),
	constraint fk_group foreign key(group_id_) references Group_(group_id_)
);

create table User_Sport_Types_ (
	type_ 	 		text primary key
);

create table Group_Member_Types_ (
	group_id_		int,
	member_type_	text,
	
	primary key(group_id_, member_type_),
	constraint fk_member_type foreign key(member_type_) references Member_Types_(type_),
	constraint fk_group_id foreign key(group_id_) references Group_(group_id_)
);

create table Group_Sports_ (
	group_id_		int,
	sport_id_		int,
	sport_member_type_	text,
	
	primary key(group_id_, sport_member_type_, sport_id_),
	constraint fk_group_id foreign key(group_id_) references Group_(group_id_),
	constraint fk_sport_member_type foreign key(sport_member_type_) references User_Sport_Types_(type_),
	constraint fk_sport foreign key(sport_id_) references Sport_(id_)
);

create table Membership_card_ (
	user_id_ 	 	int,
	qrcode_			text unique,
	pin_			varchar(4),
	
	primary key(user_id_),
	constraint fk_user foreign key(user_id_) references User_(member_id_)
);

create table Member_token_ (
	member_id_ 	 	int unique,
	token_			text,
	createdAt_		date,
	
	primary key(member_id_),
	constraint fk_user foreign key(member_id_) references Member_(id_)
);