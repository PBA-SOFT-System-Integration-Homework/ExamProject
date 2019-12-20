const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();
let server = require('../app');
const connector = require('../db/DBConnector');
chai.use(chaiHttp);
const { expect } = chai;
let pool = undefined;

describe("*** Cars tests ***", function () {
    this.timeout(5000);

    before(async () => {
        pool = await connector.getPool();
        try {
            await pool.execute("SET FOREIGN_KEY_CHECKS=0");
            await pool.execute("DROP TABLE IF EXISTS cars");
            await pool.execute("CREATE TABLE cars LIKE cars_test");
            await pool.execute("INSERT INTO cars SELECT * FROM cars_test");

            await pool.execute("DROP TABLE IF EXISTS users_cars");
            await pool.execute("CREATE TABLE users_cars LIKE users_cars_test");
            await pool.execute("INSERT INTO users_cars SELECT * FROM users_cars_test");
        } catch (err) {
            console.log('ERROR', err);
        }
    })

    describe("Cars API endpoint tests", () => {
        it("Should get three cars by eventId", (done) => {
            chai.request(server).get('/api/v1/cars/event/1')
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(200);
                    expect(result.body.cars.length).to.be.equal(3);
                    done();
                });
        });

        it("Get cars by eventId", (done) => {
            chai.request(server).post('/api/v1/cars')
                .send({ carId: 1, userId: 2 })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(200);
                    done();
                });
        })

    });
});