'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	SAMLStrategy = require('passport-saml').Strategy,
	config = require('../config');

module.exports = function() {
	// Use SAML strategy
	passport.use(new SAMLStrategy({
			path: config.saml.path,
			entryPoint: config.saml.entryPoint,
			issuer: config.saml.issuer
		},
		function(profile, done) {
		    console.log('profile: ', profile);
			return done(null, {id: profile.uid});
		}
	));
};
