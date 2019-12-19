use si_exam_test;

DROP TABLE IF EXISTS users_cars_test;
DROP TABLE IF EXISTS cars_test;
DROP TABLE IF EXISTS events_test;
DROP TABLE IF EXISTS users_test;

CREATE TABLE users_test (
	user_id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL, 
	username VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(50) NOT NULL
);


CREATE TABLE events_test (
	event_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
	name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date VARCHAR(255) NOT NULL,
    amount_of_people INT NOT NULL,
    location VARCHAR(255) NOT NULL
);


CREATE TABLE cars_test (
	car_id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL, 
	make VARCHAR(100),
    year INT,
    amount_of_seats INT NOT NULL,
    amount_of_seats_taken INT NOT NULL,
    type VARCHAR(1) NOT NULL,
    origin VARCHAR(50) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events_test(event_id)
);


CREATE TABLE users_cars_test (
	user_id INT NOT NULL,
    car_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_test(user_id),
	FOREIGN KEY (car_id) REFERENCES cars_test(car_id),
    PRIMARY KEY (user_id, car_id)
);

# USER
INSERT INTO users_test(username, password, role) VALUES('test', '$2b$10$eYoEkAkX9RFOSuVig3Ej.O2aF4nMiBOxBQ/oOhkZo.EI6UOzPsewG', 'user');
INSERT INTO users_test(username, password, role) VALUES('admin', '$2b$10$CtKD3MMdwrRauyFKiObiIudKr3YxU8yiIUWIUO0SGmAUBVoZdoQNm', 'admin');

# EVENTS
INSERT INTO events_test(name, description, date, amount_of_people, location) VALUES('Christmas Party', 'Come enjoy yourself at this amazing event...', '22/12/2019', 100, 'Copenhagen');
INSERT INTO events_test(name, description, date, amount_of_people, location) VALUES('Pool Party', 'Pool, drinks, fun - can you really ask for more?...', '23/12/2019', 75, 'Copenhagen');
INSERT INTO events_test(name, description, date, amount_of_people, location) VALUES('Obligatory Meeting', 'Come enjoy yourself at this amazing event...', '24/12/2019',100, 'Copenhagen');

# CARS

# Event 0
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Audi', 2004, 5, 0, 'A', 'faraday', 1);
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Fiat', 1994, 4, 0, 'B', 'faraday', 1);
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Opel', 1992, 2, 0, 'A', 'mom', 1);

# Event 1
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Audi', 2004, 5, 0, 'A', 'faraday', 2);
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Fiat', 1994, 4, 0, 'B', 'faraday', 2);
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Opel', 1992, 2, 0, 'A', 'mom', 2);

# Event 2
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Audi', 2004, 5, 0, 'A', 'faraday', 3);
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Fiat', 1994, 4, 0, 'B', 'faraday', 3);
INSERT INTO cars_test(make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES('Opel', 1992, 2, 0, 'A', 'mom', 3);



