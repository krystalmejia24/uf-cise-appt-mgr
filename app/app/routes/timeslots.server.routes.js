'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var timeslots = require('../../app/controllers/timeslots');

	// Timeslots Routes
	app.route('/timeslots')
		.get(timeslots.list)
		.post(users.requiresLogin, timeslots.create);

	app.route('/timeslots/:timeslotId')
		.get(timeslots.read)
		.put(users.requiresLogin, timeslots.hasAuthorization, timeslots.update)
		.delete(users.requiresLogin, timeslots.hasAuthorization, timeslots.delete);

	// Finish by binding the Timeslot middleware
	app.param('timeslotId', timeslots.timeslotByID);
};