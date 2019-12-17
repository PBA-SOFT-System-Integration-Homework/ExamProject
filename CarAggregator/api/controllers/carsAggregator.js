

const getCarsFromMom = async () => {
    try {
        return await carsDB.getCarsByEventId(eventId);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

module.exports = {
    getCarsFromMom
}