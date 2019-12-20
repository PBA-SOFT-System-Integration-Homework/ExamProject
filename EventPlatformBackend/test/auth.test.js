const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();
let server = require('../app');
const connector = require('../db/DBConnector');
chai.use(chaiHttp);
const { expect } = chai;
let pool = undefined;

describe("*** Auth tests ***", function () {
    this.timeout(5000);

    before(async () => {
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

    describe("Auth API endpoint tests", () => {

        it("Authenticate user with role user", (done) => {
            chai.request(server).post('/api/v1/auth')
                .send({ username: 'test', password: 'test' })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(200);
                    expect(result.body.user).to.have.property('username');
                    expect(result.body.user).to.have.property('role');
                    expect(result.body.user.role).to.equal('user');
                    done();
                });
        });

        it("Authenticate user with role admin", (done) => {
            chai.request(server).post('/api/v1/auth')
                .send({ username: 'admin', password: 'admin' })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(200);
                    expect(result.body.user).to.have.property('username');
                    expect(result.body.user).to.have.property('role');
                    expect(result.body.user.role).to.equal('admin');
                    done();
                });
        });

        it("Should fail with missing username or password", (done) => {
            chai.request(server).post('/api/v1/auth')
                .send({ username: '', password: 'admin' })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(401);
                    expect(result.body).to.have.property('error');
                    expect(result.body.error).to.equal('Username or password is missing')
                    done();
                });
        });

        it("Should fail with wrong username or password", (done) => {
            chai.request(server).post('/api/v1/auth')
                .send({ username: 'jibberish', password: 'jibberish' })
                .end((err, result) => {
                    if (err) done(err);
                    expect(result.statusCode).to.equal(401);
                    expect(result.body).to.have.property('error');
                    expect(result.body.error).to.equal('Wrong username or password')
                    done();
                });
        });
    })

});