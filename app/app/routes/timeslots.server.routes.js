'use strict';

module.exports = function(app) {
	var timeslots = require('../../app/controllers/timeslots');

	// Timeslots Routes
	app.route('/timeslots')
		.get(timeslots.list)
		.post(timeslots.create);

	app.route('/timeslots/:timeslotId')
		.get(timeslots.read)
		.put(timeslots.hasAuthorization, timeslots.update)
		.delete(timeslots.hasAuthorization, timeslots.delete);

	// Finish by binding the Timeslot middleware
	app.param('timeslotId', timeslots.timeslotByID);
};
