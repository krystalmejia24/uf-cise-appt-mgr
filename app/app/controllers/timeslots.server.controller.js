'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Timeslot = mongoose.model('Timeslot'),
	_ = require('lodash');

/**
 * Create a Timeslot
 */
exports.create = function(req, res) {
	var timeslot = new Timeslot(req.body);
	timeslot.user = req.user.id;

	timeslot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timeslot);
		}
	});
};

/**
 * Show the current Timeslot
 */
exports.read = function(req, res) {
	res.jsonp(req.timeslot);
};

/**
 * Update a Timeslot
 */
exports.update = function(req, res) {
	var timeslot = req.timeslot ;

	timeslot = _.extend(timeslot , req.body);

	timeslot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timeslot);
		}
	});
};

/**
 * Delete an Timeslot
 */
exports.delete = function(req, res) {
	var timeslot = req.timeslot ;

	timeslot.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timeslot);
		}
	});
};

/**
 * List of Timeslots
 */
exports.list = function(req, res) { Timeslot.find().sort('-created').exec(function(err, timeslots) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timeslots);
		}
	});
};

/**
 * Timeslot middleware
 */
exports.timeslotByID = function(req, res, next, id) { Timeslot.findById(id).exec(function(err, timeslot) {
		if (err) return next(err);
		if (! timeslot) return next(new Error('Failed to load Timeslot ' + id));
		req.timeslot = timeslot ;
		next();
	});
};

/**
 * Timeslot authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.timeslot.user !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
