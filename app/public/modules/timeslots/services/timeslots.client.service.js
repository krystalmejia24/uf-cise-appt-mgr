'use strict';

//Timeslots service used to communicate Timeslots REST endpoints
angular.module('timeslots').factory('Timeslots', ['$resource',
	function($resource) {
		return $resource('timeslots/:timeslotId', { timeslotId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);