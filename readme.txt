commands to run in terminal :
    npm install express
    npm install mysql
    (check version of mysql be the of same version on computer using mysql --version (use this if error gives in the field of sql))
    npm install body-parser

command to run project :
    node server.js

type this in chrome to view project:
    localhost:3000

create database named dbms;

run these commands in mysql command line to create necessary tables:
  
CREATE DATABASE dbms;

use dbms;

CREATE TABLE customers (
  c_userid varchar(25) ,
  c_mail varchar(30),
  c_name varchar(30),
  password varchar(25),
  c_mobile varchar(13),
  current int(11)
);

CREATE TABLE managers (
  m_userid varchar(25),
  m_mail varchar(30) ,
  m_name varchar(30) ,
  m_mobile varchar(13) ,
  m_state varchar(30) 
);


INSERT INTO managers (m_userid, m_mail, m_name, m_mobile, m_state) VALUES('user123', 'user123@example.com', 'John Doe', '1234567890', 'Active');
INSERT INTO managers (m_userid, m_mail, m_name, m_mobile, m_state) VALUES('user1234', 'user1234@example.com', 'Robert Anderson', '4321098765', 'Active');
INSERT INTO managers (m_userid, m_mail, m_name, m_mobile, m_state) VALUES('user789', 'user789@example.com', 'Michael Johnson', '8765432109', 'Active');
INSERT INTO managers (m_userid, m_mail, m_name, m_mobile, m_state) VALUES('userabc', 'userabc@example.com', 'Emily Davis', '7654321098', 'Active');
INSERT INTO managers (m_userid, m_mail, m_name, m_mobile, m_state) VALUES('userpqr', 'userpqr@example.com', 'Sarah Thompson', '5432109876', 'Active');
INSERT INTO managers (m_userid, m_mail, m_name, m_mobile, m_state) VALUES('userxyz', 'userxyz@example.com', 'David Wilson', '6543210987', 'Inactive');


CREATE TABLE trips (
  trip_id varchar(25),
  st_city varchar(30),
  ed_city varchar(30),
  st_date date,
  ed_date date,
  m_userid varchar(25),
  amount int(11)
);


INSERT INTO trips (trip_id, st_city, ed_city, st_date, ed_date, m_userid, amount) VALUES('T456', 'Aurangabad', 'Agra', '2023-07-01', '2023-07-05', 'user123', 1000);
INSERT INTO trips (trip_id, st_city, ed_city, st_date, ed_date, m_userid, amount) VALUES('T123', 'Mumbai', 'Pune', '2023-07-08', '2023-07-05', 'user123', 500);
INSERT INTO trips (trip_id, st_city, ed_city, st_date, ed_date, m_userid, amount) VALUES('T789', 'Delhi', 'Jaipur', '2023-07-10', '2023-07-15', 'user789', 1500);
INSERT INTO trips (trip_id, st_city, ed_city, st_date, ed_date, m_userid, amount) VALUES('TABC', 'Kolkata', 'Chennai', '2023-07-20', '2023-07-25', 'userabc', 2000);
INSERT INTO trips (trip_id, st_city, ed_city, st_date, ed_date, m_userid, amount) VALUES('TPQR', 'Bangalore', 'Hyderabad', '2023-07-30', '2023-08-04', 'userpqr', 1200);
INSERT INTO trips (trip_id, st_city, ed_city, st_date, ed_date, m_userid, amount) VALUES('TXYZ', 'Lucknow', 'Varanasi', '2023-08-08', '2023-08-12', 'userxyz', 1800);
INSERT INTO trips (trip_id, st_city, ed_city, st_date, ed_date, m_userid, amount) VALUES('T999', 'Mumbai', 'Pune', '2023-08-15', '2023-08-20', 'user1234', 1600);