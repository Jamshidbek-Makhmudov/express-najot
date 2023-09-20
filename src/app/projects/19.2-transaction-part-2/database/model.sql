create database payme;

create table registerr(
    id serial primary key,
    name varchar(32) not null unique,
    email text not null,
    password varchar(32) not null,
    balance int default 100000
);


create table servicess(
    id serial primary key,
    register_id int  not null,
    service text not null,
    price float not null,
    foreign key (register_id) references registerr(id)
);


create table transactions(
  id serial primary key not null,
  from_id int not null,
  to_id int not null,
  quantity float not null,
  created_at timestamp without time zone default current_timestamp,
  foreign key (from_id) references register(id) on delete cascade,
  foreign key (to_id) references register(id) on delete cascade
);
