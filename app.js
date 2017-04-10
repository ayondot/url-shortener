var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');

var db = 'mongodb://ayondot:mathematics223@ds127878.mlab.com:27878/rocky-bayou-89314';

mongoose.connect(db);

var linkSchema = mongoose.Schema({
	link: {
		type: String,
		unique: true
	}
});

var Link = mongoose.model('Link', linkSchema);

app.use('/new', router);

app.get('/', function(req, res){
	res.send('Welcome!');
});

app.get('/links', function(req, res){
	Link.find({ }, function(err, data){
		if(err) return console.error(err);
		res.end(JSON.stringify(data, null, '\t'));
	});
});

app.get('/:id', function(req, res){
	Link.findOne({_id: req.params.id}, function(err, data){
		if(err) return console.error(err);
		console.log(req.params.id, data);
		res.redirect(data.link);
	});
});

router.get('/*', function(req, res){
	if(req.params['0'].split(':').length === 1)
		req.params['0'] = 'http://' + req.params['0']
		console.log(req.params['0']);	
	var newlink = new Link({ link: req.params['0']});
	newlink.save(function(err, link){
		if(err) return console.error(err);
		var response ={
			"original_url": req.params['0'],
			"short_url": req.headers.host + '/' + link._id
		}
		res.json(response); 
	});
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('app listening on port ' + port);
});