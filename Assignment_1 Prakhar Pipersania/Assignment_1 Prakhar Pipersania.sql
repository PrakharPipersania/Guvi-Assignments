-- Creating Database

CREATE DATABASE guvi;

USE guvi;


/*
Tables & Attributes in the database:
users -> USER_ID, NAME, EMAIL, MOBILE_NUMBER
codekata -> USER_ID, QUESTIONS_SOLVED, TOTAL_SUBMISSIONS, POINTS, TOPIC_ID
attendance -> USER_ID, ATTENDANCE_DATE, IS_PRESENT (IS USER PRESENT OR ABSENT)
topics -> TOPIC_ID, TOPIC_NAME
tasks -> TASK_ID, TASK_NAME, TASK_DATE, USER_ID, IS_COMPLETED (HAS THE USER COMPLETED THE TASK OR NOT)
company_drives -> USER_ID, COMPANY_ID, COMPANY_NAME
mentors -> MENTOR_ID, MENTOR_NAME
students_activated_courses -> USER_ID, COURSE_ID
courses -> COURSE_ID, COURSE_NAME, COURSE_INSTRUCTOR
Assumptions:
*) Each instructor can take any number of courses.
*) A course can be taken by only one instructor.
*) A student can enroll in any number of courses.
*) A student can attend any number of company drives.
*) Each course can have any number of students.
*/

-- Q1) Create tables for the above list given

CREATE TABLE users (
user_id INT,
user_name VARCHAR(50),
user_email VARCHAR(40),
user_mob_no BIGINT
);

CREATE TABLE codekata (
user_id INT,
questions_solved INT,
total_submissions INT,
points INT,
topic_id INT
);

CREATE TABLE attendance (
user_id INT,
attendance_date DATE,
is_present TINYINT
);

CREATE TABLE topics (
topic_id INT,
topic_name VARCHAR(50)
);
			  
CREATE TABLE tasks (
task_id INT,
task_name VARCHAR(50),
task_date DATE,
user_id INT,
is_completed TINYINT
);

CREATE TABLE company_drives (
user_id INT,
company_id INT,
company_name VARCHAR(50)
);
				  	  
CREATE TABLE mentors (
mentor_id INT,
mentor_name VARCHAR(50)
);

CREATE TABLE students_activated_courses (
user_id INT,
course_id INT
);
				      
CREATE TABLE courses (
course_id INT,
course_name VARCHAR(50),
course_instructor INT
);


-- Q2) Insert at least 5 rows of values in each table 

INSERT INTO users VALUES (1,'Varun','varun.v@gmail.com',9876543210),
			 (2,'Palak','palak.g@yahoo.com',8234653256),
			 (3,'John','john.h@gmail.com',6301823746),
			 (4,'Sfurti','sfurti.a@gmail.com',8928732654),
			 (5,'Risabh','risabh.s@yahoo.com',9129830765);

INSERT INTO codekata VALUES (1,5,7,60,1),
			    (2,2,3,20,3),
			    (5,10,14,140,7),
			    (3,4,5,50,5),
   			    (1,3,3,40,10),
			    (4,20,25,340,2),
			    (5,2,2,20,5),
			    (2,5,6,70,1),
			    (3,6,6,80,8),
			    (2,9,10,130,4);

INSERT INTO attendance VALUES (1,'2021-09-03',1),
			      (1,'2021-09-06',0),
	   		      (2,'2021-09-03',1),
			      (2,'2021-09-06',1),
			      (3,'2021-09-03',1),
			      (3,'2021-09-06',1),
			      (4,'2021-09-03',0),
			      (4,'2021-09-06',1),
			      (5,'2021-09-03',1),
			      (5,'2021-09-06',1);

INSERT INTO topics VALUES (1,'Array'),
			  (2,'Strings'), 
			  (3,'Sorting'), 
			  (4,'Bit Manipulation'), 
			  (5,'Patterns'), 
			  (6,'Trees and Graphs'), 
			  (7,'Matrix'), 
			  (8,'Linked List'), 
			  (9,'Hashing'), 
			  (10,'Dynamic Programming');

INSERT INTO tasks VALUES (1,'Javascript Assignment','2021-09-06',1,1),
			 (2,'Programming Assignment','2021-09-03',3,1),
			 (3,'HTML Assignment','2021-09-06',2,1),
			 (4,'Javascript Assignment','2021-09-06',3,0),
			 (5,'SQL Assignment','2021-09-03',4,1),
			 (6,'NoSQL Assignment','2021-09-03',5,0),
			 (7,'Programming Assignment','2021-09-06',4,1);

INSERT INTO company_drives VALUES (1,1,'Chubb'),
				  (2,1,'Chubb'),
				  (2,3,'Amazon'),
				  (1,4,'Unity'),
				  (1,5,'Microsoft'),
				  (3,2,'Google'),
				  (5,4,'Unity'),
				  (4,1,'Chubb'),
				  (4,2,'Google'),
				  (4,3,'Amazon'),
				  (5,2,'Google');

INSERT INTO mentors VALUES (1,'Mahesh'),
			   (2,'Venkat'),
			   (3,'Saurabh'),
			   (4,'Divya'),
			   (5,'Vishal');

INSERT INTO students_activated_courses VALUES (1,1),
					      (2,4),
					      (1,3),
					      (5,6),
					      (3,1),
					      (2,2),
					      (5,7),
					      (3,5),
					      (4,3);

INSERT INTO courses VALUES (1,'Programming Course',1),
			   (2,'HTML Course',3),
			   (3,'SQL Course',2),
			   (4,'NoSQL Course',4),
			   (5,'JavaScript Course',5),
			   (6,'React Course',1),
			   (7,'Angular Course',4),
			   (8,'CSS Course',3);
			   
-- Verifying Insertion 

SELECT * FROM  users;
SELECT * FROM  codekata;
SELECT * FROM  attendance;
SELECT * FROM  topics;
SELECT * FROM  tasks;
SELECT * FROM  company_drives;
SELECT * FROM  mentors;
SELECT * FROM  students_activated_courses;
SELECT * FROM  courses;


-- Q3) Get number problems solved in codekata by combining the users

SELECT u.user_id, u.user_name, 
IFNULL(SUM(c.questions_solved),0) AS number_problems_solved
FROM users AS u
LEFT JOIN codekata AS c 
ON u.user_id=c.user_id
GROUP BY user_name
ORDER BY user_id;


-- Q4)

-- Display the no of company drives attended by a specific user

SELECT u.user_id, u.user_name, 
IFNULL(COUNT(c.company_id),0) AS company_drives_attended
FROM users AS u
LEFT JOIN company_drives AS c 
ON u.user_id=c.user_id
WHERE u.user_id=5;

-- Display the no of company drives attended by all user
SELECT u.user_id, u.user_name, 
IFNULL(COUNT(c.company_id),0) AS company_drives_attended
FROM users AS u
LEFT JOIN company_drives AS c 
ON u.user_id=c.user_id
GROUP BY user_name
ORDER BY user_id;


-- Q5) 

-- Combine and display students_activated_courses and courses for a specific user grouping them based on the course.

SELECT c.course_id, course_name,
course_instructor, user_id
FROM courses AS c 
JOIN students_activated_courses s
ON c.course_id=s.course_id
WHERE s.user_id=3
GROUP BY c.course_id;

-- Combine and display students_activated_courses and courses for all user grouping them based on the course.

SELECT c.course_id, course_name,
course_instructor, user_id
FROM courses AS c 
JOIN students_activated_courses s
ON c.course_id=s.course_id
GROUP BY c.course_id, user_id
ORDER BY user_id;


-- Q6) List all the mentors

SELECT * FROM mentors;


-- Q7)

-- List the number of students that are assigned for a specific mentor

SELECT mentor_id,mentor_name,
IFNULL(COUNT(user_id),0) AS students_assigned 
FROM mentors AS m
LEFT JOIN courses AS c 
ON m.mentor_id=c.course_instructor
LEFT JOIN students_activated_courses s
ON c.course_id=s.course_id
WHERE mentor_id = 4;

-- List the number of students that are assigned for all mentor

SELECT mentor_id,mentor_name,
IFNULL(COUNT(user_id),0) AS students_assigned 
FROM mentors AS m
LEFT JOIN courses AS c 
ON m.mentor_id=c.course_instructor
LEFT JOIN students_activated_courses s
ON c.course_id=s.course_id
GROUP BY mentor_name
ORDER BY mentor_id;