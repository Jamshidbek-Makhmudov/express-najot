create database todos;

create extension if not exists "uuid-ossp";
--enum type lar faqat biz kiritgan malumotnigini qabul qiladi, boshqasida erroe beradi
create type todo_status as enum('new', 'reject', 'success');

create table todos(
  id uuid default uuid_generate_v4() primary key,
  title varchar(64) not null,
  description varchar(1024) not null,
  status todo_status default 'new',
  created_at timestamp default current_timestamp
);