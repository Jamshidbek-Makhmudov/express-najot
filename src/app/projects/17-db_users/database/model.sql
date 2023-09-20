--create database payme;

create table users (
    id serial primary key not null,
    firstname varchar(32) not null,
    lastname varchar(32) not null,
		image text,
    username varchar(32) not null,
		email varchar(32) not null,
		password varchar(255) not null,
    deleted_at timestamp default current_timestamp,
    created_at timestamptz default current_timestamp,
    updated_at timestamptz default current_timestamp,
    age int not null,
    isActive boolean default true
 
);

