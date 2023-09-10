
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
    birth_date date check (birth_date> '1994-08-10'), --bu check ozidan keyin codision qabul qiladi va shu condision togrimi yomi tekshiradi, agar togri bolsa chiqaradi bomasa error qaytaradi
    age int not null,
    isActive boolean default true,
   -- created_at timestamp without time zone default current_timestamp
);


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



