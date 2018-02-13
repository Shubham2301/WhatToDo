// angular js file

var myTodoList = angular.module('myTodoList', []);

function todoController($scope, $http) {
	$scope.formData = {};

	// get all Todos on the landing page
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
		})
		.error(function(data){
			alert('Error: see console for more details');
			console.log('Error: ' + data);
		});

	// adding a new Todo
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			.success(function(data){
				$scope.formData = {}; // clears form for the next entry
				$scope.todos = data;
			})
			.error(function(data){
				alert('Error: see console for more details');
				console.log('Error: ' + data);
			});
	};

	//delete a Todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
			})
			.error(function(data){
				alert('Error: see console for more details');
				console.log('Error: ' + data);
			});
	};
}