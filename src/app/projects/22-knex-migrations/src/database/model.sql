create database shopfilter;

create extension if not exists "uuid-ossp";

create table categories(
  category_id uuid primary key default uuid_generate_v4(),
  category_name varchar(32) not null
);

create table products(
  product_id uuid primary key default uuid_generate_v4(),
  product_name varchar(32) not null,
  product_description varchar(1024) not null,
  product_price float not null,
  category uuid not null,
  rating float default 5,
  product_created_at timestamptz default current_timestamp,
  foreign key (category) references categories(category_id)
);