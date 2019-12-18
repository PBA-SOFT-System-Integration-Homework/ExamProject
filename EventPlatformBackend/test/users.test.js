const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();
let server = require('../app');
const connector = require('../db/DBConnector');
chai.use(chaiHttp);
const { expect } = chai;
let pool = undefined;

describe("*** Users tests ***", function () {
    this.timeout(5000);

    beforeEach(async () => {
        pool = await connector.getPool();
        try {
            await pool.execute("SET FOREIGN_KEY_CHECKS=0");
            await pool.execute("DROP TABLE IF EXISTS users");
            await pool.execute("CREATE TABLE users LIKE users_test");
            await pool.execute("INSERT INTO users SELECT * FROM users_test");
        } catch (err) {
            console.log('ERROR', err);
        }
    })

    describe("Users API endpoint tests", () => {

        it("Should create new user", (done) => {
            chai.request(server).post('/api/v1/users')
                .send({ newUser: { username: 'user', password: 'user' } })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(201);
                    expect(result.body).to.have.property('username');
                    expect(result.body).to.have.property('role');
                    expect(result.body.role).to.equal('user');
                    done();
                });
        });

        it("Should fail with missing newUser object", (done) => {
            chai.request(server).post('/api/v1/users')
                .send({})
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(400);
                    expect(result.body).to.have.property('error');
                    expect(result.body.error).to.equal('Missing user data')
                    done();
                });
        });

        it("Should fail with missing username or password", (done) => {
            chai.request(server).post('/api/v1/users')
                .send({ newUser: { username: '', password: 'jibberish' } })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(500);
                    expect(result.body).to.have.property('error');
                    expect(result.body.error).to.equal('Username or password is missing')
                    done();
                });
        });

        it("Should fail if user already exists", (done) => {
            chai.request(server).post('/api/v1/users')
                .send({ newUser: { username: 'test', password: 'testad' } })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(500);
                    expect(result.body).to.have.property('error');
                    expect(result.body.error).to.equal('Username already exists')
                    done();
                });
        });
    })

});