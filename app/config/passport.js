'use strict';

var passport = require('passport'),
	path = require('path'),
	config = require('./config');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		// XXX do DB lookup here to find roles
		done(null, {id: id, roles: []});
	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};
