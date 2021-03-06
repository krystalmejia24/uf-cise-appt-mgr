'use strict';

module.exports = {
	db: 'mongodb://localhost/uf-cise-appt-mgr-dev',
	app: {
		title: 'uf-cise-appt-mgr - Development Environment'
	},
	saml: {
		path : '/',
		entryPoint : 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
		issuer : 'passport-saml'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
