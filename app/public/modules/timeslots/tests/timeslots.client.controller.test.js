'use strict';

(function() {
	// Timeslots Controller Spec
	describe('Timeslots Controller Tests', function() {
		// Initialize global variables
		var TimeslotsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Timeslots controller.
			TimeslotsController = $controller('TimeslotsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Timeslot object fetched from XHR', inject(function(Timeslots) {
			// Create sample Timeslot using the Timeslots service
			var sampleTimeslot = new Timeslots({
				name: 'New Timeslot'
			});

			// Create a sample Timeslots array that includes the new Timeslot
			var sampleTimeslots = [sampleTimeslot];

			// Set GET response
			$httpBackend.expectGET('timeslots').respond(sampleTimeslots);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.timeslots).toEqualData(sampleTimeslots);
		}));

		it('$scope.findOne() should create an array with one Timeslot object fetched from XHR using a timeslotId URL parameter', inject(function(Timeslots) {
			// Define a sample Timeslot object
			var sampleTimeslot = new Timeslots({
				name: 'New Timeslot'
			});

			// Set the URL parameter
			$stateParams.timeslotId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/timeslots\/([0-9a-fA-F]{24})$/).respond(sampleTimeslot);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.timeslot).toEqualData(sampleTimeslot);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Timeslots) {
			// Create a sample Timeslot object
			var sampleTimeslotPostData = new Timeslots({
				name: 'New Timeslot'
			});

			// Create a sample Timeslot response
			var sampleTimeslotResponse = new Timeslots({
				_id: '525cf20451979dea2c000001',
				name: 'New Timeslot'
			});

			// Fixture mock form input values
			scope.name = 'New Timeslot';

			// Set POST response
			$httpBackend.expectPOST('timeslots', sampleTimeslotPostData).respond(sampleTimeslotResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Timeslot was created
			expect($location.path()).toBe('/timeslots/' + sampleTimeslotResponse._id);
		}));

		it('$scope.update() should update a valid Timeslot', inject(function(Timeslots) {
			// Define a sample Timeslot put data
			var sampleTimeslotPutData = new Timeslots({
				_id: '525cf20451979dea2c000001',
				name: 'New Timeslot'
			});

			// Mock Timeslot in scope
			scope.timeslot = sampleTimeslotPutData;

			// Set PUT response
			$httpBackend.expectPUT(/timeslots\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/timeslots/' + sampleTimeslotPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid timeslotId and remove the Timeslot from the scope', inject(function(Timeslots) {
			// Create new Timeslot object
			var sampleTimeslot = new Timeslots({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Timeslots array and include the Timeslot
			scope.timeslots = [sampleTimeslot];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/timeslots\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTimeslot);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.timeslots.length).toBe(0);
		}));
	});
}());