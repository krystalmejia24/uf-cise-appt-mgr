'use strict';

// Configuring the Articles module
angular.module('timeslots').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Timeslots', 'timeslots', 'dropdown', '/timeslots(/create)?');
		Menus.addSubMenuItem('topbar', 'timeslots', 'List Timeslots', 'timeslots');
		Menus.addSubMenuItem('topbar', 'timeslots', 'New Timeslot', 'timeslots/create');
	}
]);