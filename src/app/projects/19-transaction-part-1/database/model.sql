create database payme;

create table users(
  id serial primary key not null,
  username varchar(64) not null,
  balance float not null,
  created_at timestamp without time zone default now()
);

create table transactions(
  id serial primary key not null,
  from_id int not null,
  to_id int not null,
  quantity float not null,
  created_at timestamp without time zone default current_timestamp,
  foreign key (from_id) references users(id) on delete cascade,
  foreign key (to_id) references users(id) on delete cascade
);


