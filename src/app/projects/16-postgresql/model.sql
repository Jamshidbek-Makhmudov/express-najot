
/**
--type: tinyint(128-127)	
--SMALLINT(32768-32767)
--float(3,4)
--double(1,7+308)
--decimal(65 belgi)
--char() xotiradan oshiqacha joy ajratdi // buni ishlatma
--varchar()  xotiradan oshiqcha joy ajratmaydi default 255 qiymat length
--text  ozi moslashuvchan boladi, ichiga koproq string sigadi, uzun sozlar uchun
--numeric(32,2) 32ta raqam kerin . 2ta o boladi, odatda pricega ishlatilinadi
--uuid 
--json agar columnga nima kiritishni bilmasa json kirtsa boladi lekin unu chiqarib olish juda qiyin 



serial -autoincrement ga teng 
default false - tugallanmagan boladi va default qiymati yoq
timestamp   dateni hamma qismigacha olib beradi
timestampz   turgan  joyini vaqtini oladi 
current_timestamp  hozirgi vaqtni qoyib ketadi  now() ga teng

*/
create database n1;

create table todos (
    id serial not null,
    title varchar(255) not null unique,
    description text not null,
    is_completed boolean not null default false,
    created_at timestamptz not null default current_timestamp,
    updated_at timestamptz not null default current_timestamp
);


drop table todos;

create table users (
    id serial primary key not null,
    firstname varchar(32) not null,
    lastname varchar(32) not null,
    username varchar(32) not null,
    deleted_at timestamp default current_timestamp,
    created_at timestamptz default current_timestamp,
    updated_at timestamptz default current_timestamp.
    birth_date date check (birth_date> '1994-08-10'), --bu check ozidan keyin codision qabul qiladi va shu condision togrimi yomi tekshiradi, agar togri bolsa chiqaradi bomasa error qaytaradi
    age int not null,
    isActive boolean default true,
   -- created_at timestamp without time zone default current_timestamp
);

select * from users where deleted_at is null; --bu ochib ketgan userlardan boshqalarini chiqarib ber degani


insert into users (firstname,lastname,username,age) values ('Jamshid','Makhmudov','james',29), ('Jamshid','Makhmudov','james',29), ('Jamshid','Makhmudov','james',29);

select * from users;


update users set firstname= 'Jamshidbek',age=30 where id=id;

delete from users where id=id;


select * from users order by id desc;

select * from users where username like '%jam%';   
select * from users where username like '%jam%' and age=30;   
select * from users where username like '%jam%' or age=30;   
--select * from users where username ilike '%jam%'; --ilike katta harf yoki kichkina harf farqi yoq

--select * from users limit 4;  --faqat 4tasini tasini chiqaradi

--select * from users orderby id limit 4;  

--select * from users offset 4 limit 4;  --offset boshida tashlab yuborgin degani 

select distinct(age) from users;  --bu faqat age ni ozini saralab 1ta age faqat birmarta ishlatib chiqarib beradi masala  12,23,34,45, faqat agelarni chiqaradi qayta takrorlamiy

select * from users where age>=7 and age<=22;
select * from users where age between 7 and 22; --yuqoridagi bilan bir xil

select * from users where age =7 or age=8;
select * from users where age in(7,8); --yuqoridagi bilan bir xil




--agrigate function - yani tayyor functions 
--count(*);  soni
--sum(*);    yigindisi
--avg(*);		 ortachasini
--min(*);
--max(*);
--now();			xozirig vaqt
select count(*)  from users group by age;   
select count(*), age from users group by age;  

select avg(age) from users group by age;   

select avg(age), age from users where age=22 group by age;   

select avg(age), age from users group by age having age=22; 
select avg(age), age from users group by age having age>22; 

--alies
select *, firstname  as workers  from users; --alies qoshib beradi



--one to many  
create table users(
    id serial primary key not null,
    firstname varchar(32) not null,
    lastname varchar(32) not null,
    username varchar(32) not null
);
create table password(
    id serial primary key not null,
    seria varchar(32) not null,
    user_id int not null,
    country_id int not null
    foreign key(user_id)
    references users(id),
       foreign key(user_id)
    references countries(id)
);

--many to many

create table users(
    id serial primary key not null,
    firstname varchar(32) not null,
    lastname varchar(32) not null,
    username varchar(32) not null
);
create table book_authors(
    id serial primary key not null,
    seria varchar(32) not null,
    user_id int not null,
    books_id int not null
    foreign key(user_id)
    references users(id),
    foreign key(books_id)
    references books(id)
);
create table books(
    id serial primary key not null,
    seria varchar(32) not null,
    user_id int not null,
    foreign key(user_id)
    references users(id)
);


--JOINs
/**
inner join 2ta tablen kesishganini chiqarib beradi
left join chaptarafdagi tableni chiqarib beradi ong taraf esa shu chap tarafda bor bolgan larini chiqaradi. chapdagini hammasini chiqaradi
right shuni teskarisi
*/





--tramsactions
--tutorial

BEGIN TRANSACTION;
insert into todos (value) values(value);
 --error

 ROLLBACK;


insert into todos (value) values(value);
COMMIT;
select * from todos;



create index idx on tablename(row_name);
-- berilgan rowga index qoshib beradi



--FUNCTION and PROCEDURE:
/**
sql da function bilan protsedura mavjud:
function return qaytadi ham qaytarmasa ham boladi.
protsedura 100% 
*/



--on delete
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
  foreign key (from_id) references users(id) on delete cascade,  --parent ni ochirganda child ham ochib ketadi
  foreign key (to_id) references users(id) on delete cascade
);


--on delete cascade,  --parent ni ochirganda child ham ochib ketadi
--on delete set null,  --ochirmaydi, nullg atenglab qoyadi
--on delete set null,  --ochirmaydi, nullg atenglab qoyadi
--on delete set default,  --ochirmaydi, default qiymati bolsa shunga tenglab qoyadi




--UNIONS
/**
joinlar 2ta table ni yonmayon qoshib bersa, unionlar tepa-pas, ya'ni tagma-tag qilib qoshib beradi. unionlarni 2 xil turi bor: 

1.UNION -bu takrorlanuvchi elementlarni olib tashlaydi
2.UNION ALL -bu takrorlanuvchhi elementlarni olib tashlamaydi ularni farqi shunda.
*/
select firts_name,last_name from users union all select firts_name,last_name from workers; --columnlari bir cil bolganlarini tanlab qoshamiz



--INTERSECT
select firts_name,last_name from users INTERSECT select firts_name,last_name from workers; --columnlari umumiy bolganlarini tanlab qoshamiz




--JSON

/**
bu yerda app.js ham ishlattilgan

db array va objectlarni saqlab bolmaydi, shuning biz ularni json korinishida saqlaymiz


*/


create table users (
    id serial primary key not null,
    username varchar(32) not null,
    job json not null

);

insert into users(username, job) 
values
('j','{

	"position": "developer",
	"tool": "js",
	"time":"full time"
}'), 
('ja','{

	"position": "HR",
	"tool": "php",
	"time":"part time"
}'), 
('jam','{

	"position": "leader",
	"tool": "all",
	"time":"remote",
	"home":"big"
}'), 
('jams','{

	"position": "HR",
	"tool": "php",
	
}'), 
('jamsh','{

	"position": "HR",
	"tool": "php",
	"time":"live"
}'), 
('jamshi','{

	"position": "HR",
	"tool": "php",
	"time":"part time"
}'), 
('jamshid','{

	"position": "president",
	"tool": "php",
	"time":"{"from":"9","to":"18"}"
}');



select job->'position' from users where id=1;
select job from users where id=1;
select job->'position' from users;  --json oladi va '' ichida qaytardi
select job->>'position' from users;  --string oladi va '' siz qaytaradi
select job->'time'->>'from' from users;





--trigger
/**
An SQL trigger is a database object that is associated with a table and automatically executes a set of SQL statements when a specific event occurs on that table.

1 amal bajarilgan 2- amalni bajarishga trigger deyiladi

statement: 1 paytda 20 ta malumot qoshilsa ham 1ta harakat bajariladi


row: 1 paytda 20ta malumotni qoshsa ham 20 martta haqarkat bajariladi


*/


create database trigers;

create extension if not exists "uuid-ossp";
--enum type lar faqat biz kiritgan malumotnigini qabul qiladi, boshqasida erroe beradi
create type user_role as enum('admin', 'director', 'designer','developer');

create table users(
  id uuid default uuid_generate_v4() primary key,
  name varchar(64) not null, 
  role user_role default 'admin',
  created_at timestamp default current_timestamp
);

create table users_count(
    id uuid default uuid_generate_v4() primary key,
    name user_role not null,
    count int not null default 0
);

--protsedura:
create function users_event()
returns TRIGGER
language plpgsql as
$$
BEGIN
update users_count set count=count+1 where name=NEW.role;
return NEW;
END;
$$;




call users_event ('admin');

-- trigger 3ta xolatni create update delete ni eshitib turadi
create trigger user_trigger
after INSERT

on users
for each row
execute procedure users_event();
/**
yuqorida function yozdik trigger yozdik, users tablega nimadir yangi malumot qoshilsa 2chi users_count dagi malumotlar avtomat ozi yangilanadi
yangi qoshilmaydi eski columnlar update boladi
*/