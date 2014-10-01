'use strict';

// Timeslots controller
angular.module('timeslots').controller('TimeslotsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Timeslots',
	function($scope, $stateParams, $location, Authentication, Timeslots ) {
		$scope.authentication = Authentication;

		// Create new Timeslot
		$scope.create = function() {
			// Create new Timeslot object
			var timeslot = new Timeslots ({
				name: this.name
			});

			// Redirect after save
			timeslot.$save(function(response) {
				$location.path('timeslots/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Timeslot
		$scope.remove = function( timeslot ) {
			if ( timeslot ) { timeslot.$remove();

				for (var i in $scope.timeslots ) {
					if ($scope.timeslots [i] === timeslot ) {
						$scope.timeslots.splice(i, 1);
					}
				}
			} else {
				$scope.timeslot.$remove(function() {
					$location.path('timeslots');
				});
			}
		};

		// Update existing Timeslot
		$scope.update = function() {
			var timeslot = $scope.timeslot ;

			timeslot.$update(function() {
				$location.path('timeslots/' + timeslot._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Timeslots
		$scope.find = function() {
			$scope.timeslots = Timeslots.query();
		};

		// Find existing Timeslot
		$scope.findOne = function() {
			$scope.timeslot = Timeslots.get({ 
				timeslotId: $stateParams.timeslotId
			});
		};
	}
]);