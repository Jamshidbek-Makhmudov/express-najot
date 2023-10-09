create database n9;


create table company(
  id serial  primary key,
  name varchar(64) not null,
  promocod bigint unique not null
);

create table products(
    id  serial primary key,
    name_id bigint,
    price float not null,
    number   float not null,
    cashbeck bigint,
    foreign key (name_id) references company(id)
);

create table users(
  id  serial primary key,
  firstname varchar(32) not null,
  email text not null,
  balance float default 2000
);



create table promocods(
  id  serial primary key,
  promocod_id bigint,
  user_id bigint,
  created_at TIMESTAMP  not null,
  foreign key (promocod_id) references company(id),
  foreign key (user_id) references users(id)
);

