-- Table create scripts here
create table client(
	id serial not null primary key,
    first_name text not null,
    last_name text not null,
    phone_number VARCHAR(10)
);

create table treatment(
    id serial not null primary key,
    the_type text not null,
    code CHAR(3) not null,
    price VARCHAR(15)
);

create table stylist(
    id serial not null primary key,
    first_name text not null,
    last_name text not null,
    phone_number VARCHAR(10) not null,
    commission_percentage NUMERIC not null
);

create table  booking(
    id serial not null primary key,
    booking_date DATE not null,
    booking_time TIME not null,
    client_id int not null,
    treatment_id int not null,
    stylist_id int not null,
    foreign key (client_id) references client(id),
    foreign key (treatment_id) references treatment(id),
    foreign key (stylist_id) references stylist(id)
);
