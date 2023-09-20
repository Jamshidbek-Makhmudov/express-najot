-- SQL
--    * join
--    * inner join

--    * left [outer] join
--    * right [outer] join
--    * full [outer] join

--    * left excluding join
--    * right excluding join
--    * full excluding join

--    * natural join
--    * cross join
----------------------------------------------


SELECT 
	*
FROM table_a AS a
CROSS JOIN table_b;

-----------------------------------------------------


SELECT 
	*
FROM table_a AS a
LEFT  JOIN table_b AS b on true;

-----------------------------------------------------------

SELECT 
	*
FROM table_a AS a
RIGHT JOIN table_b AS b on a.letter_a = b.letter_b
WHERE
	a.letter_a IS NULL;

------------------------------------------------------------

SELECT 
	*
FROM table_a AS a
FULL JOIN table_b AS b on a.letter_a = b.letter_b
WHERE
	a.letter_a IS NULL OR b.letter_b IS NULL;


----------------------------------------------------------

DROP TABLE users CASCADE;
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(32) NOT NULL
);

DROP TABLE IF NOT EXISTS admins;
CREATE TABLE admins (
	admin_id SERIAL PRIMARY KEY,
	admin_name VARCHAR(32) NOT NULL
);

DROP TABLE posts CASCADE;
CREATE TABLE posts (
	post_id SERIAL PRIMARY KEY,
	title VARCHAR(32) NOT NULL,
	description VARCHAR(32) NOT NULL,
	user_id INT REFERENCES users(user_id),
	admin_id INT REFERENCES admins(admin_id)
);

CREATE TABLE comments (
	comment_id SERIAL PRIMARY KEY,
	comment VARCHAR(32) NOT NULL,
	user_id INT REFERENCES users(user_id),
	post_id INT REFERENCES posts(post_id)
);



------------------------------------------------------------------

SELECT 
	u.user_id,
	u.username,
	p.title,
	p.description
FROM users AS u	
LEFT JOIN posts AS p on u.user_id = p.user_id
LEFT JOIN comments AS c on c.post_id = p.post_id
GROUP BY u.user_id, p.title, p.description;

----------------------------------------------------------------





INSERT INTO users(username) VALUES ('ilhom');
INSERT INTO admins(admin_name) VALUES ('alisher'), ('salima');

INSERT INTO posts(title, description, user_id, admin_id) VALUES ('olma', 'olma......', 1, 1), ('olcha', 'olcha..........', 2, 2);





INSERT INTO comments(comment, user_id, post_id) VALUES ('hazillashdim', 1, 1);










DROP TABLE table_a;
CREATE TABLE table_a (
	id SERIAL, 
	letter_a CHAR(1)
);

DROP TABLE table_b;
CREATE TABLE table_b (
	id SERIAL, 
	letter_b CHAR(1)
);


INSERT INTO table_a (letter_a) VALUES ('B'), ('D'), ('H');
INSERT INTO table_b (letter_b) VALUES ('C'), ('A'), ('B'), ('Y'), ('D');








