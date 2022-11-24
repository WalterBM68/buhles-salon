-- inserting into clients table
insert into client (first_name, last_name, phone_number) values ('Kgotso', 'Makwana', '0756478521');
insert into client (first_name, last_name, phone_number) values ('Sizwe', 'Sabisa', '0728894561');
insert into client (first_name, last_name, phone_number) values ('Tumelo', 'Ramoliki', '0780019875');
insert into client (first_name, last_name, phone_number) values ('Morena', 'Moloi', '0824591714');

-- inserting into treatment table
insert into treatment (code, price, the_type) values ('BGT', 'R215', 'Manicure');
insert into treatment (code, price, the_type) values ('BBD', 'R175', 'Pedicure');
insert into treatment (code, price, the_type) values ('LPQ', 'R215', 'Manicure');
insert into treatment (code, price, the_type) values ('KYT', 'R185.00', 'Make up');
insert into treatment (code, price, the_type) values ('NUZ', 'R240.00', 'Brows & Lashes');

-- inserting into stylist table
insert into stylist (first_name, last_name, phone_number, commission_percentage) values ('Nosipho', 'Xulu', '0846548991', '0.19');
insert into stylist (first_name, last_name, phone_number, commission_percentage) values ('Nkosi', 'Cele', '0784561234', '0.8');
insert into stylist (first_name, last_name, phone_number, commission_percentage) values ('Lungi', 'Zulu', '0648524569', '0.20');
insert into stylist (first_name, last_name, phone_number, commission_percentage) values ('Ntombi', 'Gumede', '0724570014', '0.10');

-- inserting into booking table