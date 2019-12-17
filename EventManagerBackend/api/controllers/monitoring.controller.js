const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;

const Registry = client.Registry;
const register = new Registry();


// Probe every 5th second.
collectDefaultMetrics({
    register,
    prefix: 'eventmanager_backend_',
    timeout: 5000
});

const getRegister = () => {
    return register;
}


module.exports = {
    getRegister,
}
