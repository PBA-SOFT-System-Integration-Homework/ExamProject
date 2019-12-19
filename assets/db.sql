use si_exam;

DROP TABLE IF EXISTS users_cars;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL, 
	username VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(50) NOT NULL
);


CREATE TABLE events (
	event_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
	name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date VARCHAR(255) NOT NULL,
    amount_of_people INT NOT NULL,
    location VARCHAR(255) NOT NULL
);


CREATE TABLE cars (
	car_id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL, 
	make VARCHAR(100),
    year INT,
    amount_of_seats INT NOT NULL,
    amount_of_seats_taken INT NOT NULL,
    type VARCHAR(1) NOT NULL,
    origin VARCHAR(50) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);


CREATE TABLE users_cars (
	user_id INT NOT NULL,
    car_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (car_id) REFERENCES cars(car_id),
    PRIMARY KEY (user_id, car_id)
);

# USER
INSERT INTO users(username, password, role) VALUES('test', '$2b$10$eYoEkAkX9RFOSuVig3Ej.O2aF4nMiBOxBQ/oOhkZo.EI6UOzPsewG', 'user');
INSERT INTO users(username, password, role) VALUES('admin', '$2b$10$CtKD3MMdwrRauyFKiObiIudKr3YxU8yiIUWIUO0SGmAUBVoZdoQNm', 'admin');
INSERT INTO users(username, password, role) VALUES('rasmus', '$2b$10$d58hnch0HBhKWNoVL6ECy.zRFVRfJYC6WEPpFPoB5.FCgGpmQznSW', 'user');
INSERT INTO users(username, password, role) VALUES('thera', '$2b$10$pfpUKaK3CeZTLXSi7A0z3uHeXepXg6bRkrzJ16nAmQyTSGHre92S.', 'user');

# EVENTS
INSERT INTO events(name, description, date, amount_of_people, location) VALUES('Christmas Party', 'Come enjoy yourself at this amazing event...', '22/12/2019', 100, 'Copenhagen');
INSERT INTO events(name, description, date, amount_of_people, location) VALUES('Pool Party', 'Pool, drinks, fun - can you really ask for more?...', '23/12/2019', 75, 'Copenhagen');
INSERT INTO events(name, description, date, amount_of_people, location) VALUES('Obligatory Meeting', 'Come enjoy yourself at this amazing event...', '24/12/2019',100, 'Copenhagen');

# CARS

# Event 0
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 2004, 5, 0, 'A', 'faraday', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Fiat', 1994, 5, 0, 'B', 'faraday', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 1992, 5, 0, 'A', 'faraday', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Audi', 2007, 5, 0, 'B', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 2003, 5, 0, 'A', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('BMW', 2001, 5, 0, 'B', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 2004, 5, 0, 'A', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Ford', 2004, 5, 0, 'A', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 2010, 5, 0, 'B', 'faraday', 1);

# Event 1
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 2004, 5, 0, 'A', 'faraday', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Tractor', 1999, 5, 0, 'B', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 1993, 5, 0, 'A', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Audi', 2007, 5, 0, 'B', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Mercedes', 2006, 5, 0, 'A', 'mom', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('BMW', 2001, 5, 0, 'B', 'faraday', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Nissan', 2001, 5, 0, 'A', 'faraday', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Ford', 2002, 5, 0, 'A', 'faraday', 1);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 2011, 5, 0, 'B', 'faraday', 1);

# Event 2
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Audi', 2004, 5, 0, 'A', 'faraday', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Fiat', 1994, 5, 0, 'B', 'mom', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Obel', 1990, 5, 0, 'A', 'mom', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Audi', 2007, 5, 0, 'B', 'mom', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Peagueot', 2004, 5, 0, 'A', 'faraday', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Ford', 2001, 5, 0, 'B', 'mom', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Volswagen', 2012, 5, 0, 'A', 'mom', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Ford', 2000, 5, 0, 'A', 'faraday', 3);
INSERT INTO cars(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Porsche', 2011, 5, 0, 'B', 'faraday', 3);


