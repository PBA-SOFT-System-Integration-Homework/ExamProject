const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();
let server = require('../app');
const connector = require('../db/DBConnector');
chai.use(chaiHttp);
const { expect } = chai;
let pool = undefined;

describe("*** Events testing ***", function () {
    this.timeout(5000);

    beforeEach(async () => {
        pool = await connector.getPool();
        try {
            await pool.execute("SET FOREIGN_KEY_CHECKS=0");
            await pool.execute("DROP TABLE IF EXISTS events");
            await pool.execute("CREATE TABLE events LIKE events_test");
            await pool.execute("INSERT INTO events SELECT * FROM events_test");
        } catch (err) {
            console.log('ERROR',err);
        }
    })

    describe("Event API endpoint tests", () => {

        it("GET /events all three events successfully", (done) => {
            chai.request(server).get('/api/v1/events')
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(200);
                    expect(result.body.length).to.equal(3);
                    expect(result.body[0]).to.have.property('name');
                    expect(result.body[0]).to.have.property('description');
                    expect(result.body[0]).to.have.property('date');
                    expect(result.body[0]).to.have.property('amount_of_people');
                    expect(result.body[0]).to.have.property('location');
                    done();
                });
        });

        it("POST /events add event", (done) => {
            chai.request(server).post('/api/v1/events')
                .set('Content-Type', 'application/json')
                .send({ name: 'test', description: 'test', date: '01/01/1970', amountOfPeople: 100, location: 'test' })
                .end((err, result) => {
                    if (err) done('Error',err);
                    expect(result.statusCode).to.equal(201);
                    expect(result.body).to.have.property('succes')
                    done();
                });
        });
    })

});