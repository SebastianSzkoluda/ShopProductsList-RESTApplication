-- Authority
INSERT INTO authority (name) VALUES ('ROLE_USER');
INSERT INTO authority (name) VALUES ('ROLE_ADMIN');
-- Users
INSERT INTO user (password,firstname,lastname,username,email,age)
 VALUES ('$2a$04$Ygfyw91R1tadYBdGVDJ2BugYh3vrBxwn/m/3uj9ShWFSgAkCJ9aCm','Sebastian','Szkołuda','admin','admin@gmail.com',22);
INSERT INTO user (password,firstname,lastname,username,email,age)
 VALUES ('$2a$04$PYZZhCJYc48205P2fDKfBOnW2EQO2d/yZL2FIlDfg1esmpJvGsvJ6','Jan','Kowalski','user','user@gmail.com',52);
-- GrantedAuthorities
INSERT INTO grantedauthorities (user_id,authority_name) VALUES (1, 'ROLE_ADMIN');
INSERT INTO grantedauthorities (user_id,authority_name) VALUES (1, 'ROLE_USER');
INSERT INTO grantedauthorities (user_id,authority_name) VALUES (2, 'ROLE_USER');