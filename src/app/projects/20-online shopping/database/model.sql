create database fruits;

create table owner(
    id serial not null,
    username varchar(32) not null,
    email varchar(32) not null
)

create table workers(
    id serial primary key,
    fullname varchar(32) not null,
    email text not  null,
    password varchar(32) not null,
    role boolean default true,
    is_active boolean default true
);

create table product(
    id serial primary key,
    name varchar(255) not null,
    kg float not null,
    price float not null,
    category_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (category_id) references category(id) 
);

create table category(
    id serial not null primary key,
    name varchar(64) not null,
    is_active boolean not null
);

create table history(
    id serial primary key,
    workers_id bigint,
    product_id bigint,
    is_sell boolean,
    kg float not null,
    price float not null,
    created_at timestamp default current_timestamp,
    foreign key (workers_id) references workers(id),
    foreign key (product_id) references product(id)  
);