-- Add insert scripts here
create database buhle_salon_booking;
create role buhle login password 'buhle123';
grant all privileges on database buhle_salon_booking to buhle;
