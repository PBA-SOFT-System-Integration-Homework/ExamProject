const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();
let server = require('../app');
const connector = require('../db/DBConnector');
chai.use(chaiHttp);
const { expect } = chai;
let pool = undefined;

describe("*** Events tests ***", function () {
    this.timeout(5000);

    beforeEach(async () => {
        pool = await connector.getPool();
        try {
            await pool.execute("SET FOREIGN_KEY_CHECKS=0");
            await pool.execute("DROP TABLE IF EXISTS events");
            await pool.execute("CREATE TABLE events LIKE events_test");
            await pool.execute("INSERT INTO events SELECT * FROM events_test");
        } catch (err) {
            console.log('ERROR', err);
        }
    })

    describe("Event API endpoint tests", () => {

        it("Should GET all three events successfully", (done) => {
            chai.request(server).get('/api/v1/events')
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(200);
                    expect(result.body.events.length).to.equal(3);
                    expect(result.body.events[0]).to.have.property('name');
                    expect(result.body.events[0]).to.have.property('description');
                    expect(result.body.events[0]).to.have.property('date');
                    expect(result.body.events[0]).to.have.property('amount_of_people');
                    expect(result.body.events[0]).to.have.property('location');
                    done();
                });
        });

        it("Should POST to /events add event", (done) => {
            chai.request(server).post('/api/v1/events')
                .set('Content-Type', 'application/json')
                .send({ name: 'test', description: 'test', date: '01/01/1970', amountOfPeople: 100, location: 'test' })
                .end((err, result) => {
                    if (err) done('Error', err);
                    expect(result.statusCode).to.equal(201);
                    expect(result.body).to.have.property('success');
                    done();
                });
        });

        it("Should fail on not provided property", (done) => {
            chai.request(server).post('/api/v1/events')
                .set('Content-Type', 'application/json')
                .send({ name: '', date: '01/01/1970', amountOfPeople: 100, location: 'test' })
                .end((err, result) => {
                    if (err) done('Error', err);
                    expect(result.statusCode).to.equal(400);
                    expect(result.body).to.have.property('error');
                    expect(result.body.error).to.equal('A property is missing');
                    done();
                });
        });
    })

});