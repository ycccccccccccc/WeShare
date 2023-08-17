const eventModel = require('../models/eventModel');

module.exports = {
    getEvent: async (req, res) => {
        const id = req.user.id;
        const events = await eventModel.getEvent(res, id);
        return res.status(200).json({ event: events});
    }
}