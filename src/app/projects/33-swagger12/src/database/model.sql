create database qidir;

create table users(
  id serial not null primary key,
  username varchar(32) not null unique,
  password text not null,
  fullname text not null,
  balance float not null default 0,
  created_at timestamp not null default current_timestamp,
  is_admin boolean default false
);

create table films(
  id serial not null primary key,
  name text not null,
  description text not null,
  year int not null,
  photo text not null,
  price float not null,
  video_url text not null,
  release timestamp not null
);