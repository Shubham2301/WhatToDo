//set up
var express = require('express');
var express_app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configuration
mongoose.connect('mongodb://localhost/todo'); // setting up database connection

express_app.use(express.static(__dirname + '/public')); 	//set static files location
express_app.use(morgan('dev'));		// log every request to the console
express_app.use(bodyParser.urlencoded({'extended':'true'}));	// parse application/x-www-form-urlencoded
express_app.use(bodyParser.json());			// parse application/json
express_app.use(bodyParser.json({type: 'application/vnd.api+json'}));		// parse application/vnd.api+json as json
express_app.use(methodOverride());

// application route
// express_app.get('*', function(req, res){
// 	console.log(req, res);
// 	res.sendFile(__dirname + '/public/index.html'); // loads the single view file
// });

//listen => start app
express_app.listen(8080);
console.log('App started on Port 8080');

//defining model
var Todo = mongoose.model('Todo', {
	text : String
});

//routes
	//api
//get all Todos
express_app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos){
		if(err)
			res.send(err);

		res.json(todos);	//return all Todos in json format
	});
});

//create a Todo and show all the Todos after the creation
express_app.post('/api/todos', function(req, res) {
	// create a todo, information comes from AJAX request from Angular
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err)
			res.send(err);

		Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            
            res.json(todos);
        });
	});
});

//delete a Todo
express_app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		if(err)
			res.send(err);

		Todo.find(function(err, todos){
			if(err)
				res.send(err)

			res.json(todos);
		});
	});
});
