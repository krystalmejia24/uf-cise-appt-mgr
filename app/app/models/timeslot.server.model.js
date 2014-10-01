'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Timeslot Schema
 */
var TimeslotSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Timeslot name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: String
	}
});

mongoose.model('Timeslot', TimeslotSchema);
