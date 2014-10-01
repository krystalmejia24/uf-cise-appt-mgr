'use strict';

//Setting up route
angular.module('timeslots').config(['$stateProvider',
	function($stateProvider) {
		// Timeslots state routing
		$stateProvider.
		state('listTimeslots', {
			url: '/timeslots',
			templateUrl: 'modules/timeslots/views/list-timeslots.client.view.html'
		}).
		state('createTimeslot', {
			url: '/timeslots/create',
			templateUrl: 'modules/timeslots/views/create-timeslot.client.view.html'
		}).
		state('viewTimeslot', {
			url: '/timeslots/:timeslotId',
			templateUrl: 'modules/timeslots/views/view-timeslot.client.view.html'
		}).
		state('editTimeslot', {
			url: '/timeslots/:timeslotId/edit',
			templateUrl: 'modules/timeslots/views/edit-timeslot.client.view.html'
		});
	}
]);