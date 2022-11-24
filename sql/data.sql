-- Add insert scripts here
create database buhle_salon;
create role salon login password 'salon123';
grant all privileges on database buhle_salon to salon;

