create database knextest;

create table users(
  id serial primary key not null,
  username varchar(32) not null,
  password text not null,
  balance integer default 0,
  address text
);

create table categories(
  id serial primary key not null,
  name varchar(32) not null,
  photo text not null
);

create table products(
  id serial primary key not null,
  name varchar(32) not null,
  photo text not null,
  price integer not null,
  amount integer not null,
  category_id integer not null,
  foreign key (category_id) references categories(id)
);


create table categories_test(
  id BIGSERIAL primary key not null,
  name varchar(32) not null,
  photo text not null
);

insert into categories_test(id, name, photo) values(select * from categories);