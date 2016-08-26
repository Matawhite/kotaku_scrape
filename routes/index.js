var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Article = require('../models/Article.js');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/kotaku');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* scrape http://kotaku.com/ */
router.get('/scrape', function(req, res){
  result = {}
  request('http://kotaku.com/', function(error, response, html) {

    var $ = cheerio.load(html);

    $('h1.headline').each(function(i, element) {
        result.title = $(this).children('a').text();
        result.link = $(this).children('a').attr('href');

        var entry = new Article (result);

				// now, save that entry to the db
				entry.save(function(err, doc) {
					// log any errors
				  if (err) {
				    console.log(err);
				  }
				  // or log the doc
				  else {
				    console.log(doc);
				  }
				});
      })
      res.redirect('/');
    })
});

//get all articles in database
router.get('/articles', function(req, res){
	// grab every doc in the Articles array
	Article.find({}, function(err, doc){
		// log any errors
    var size = doc.length;
    console.log(size)
		if (err){
			console.log(err);
		}
		// or send the doc to the browser as a json object
		else {
			res.json(doc);
		}
	});
});

router.post('/comment', function(req, res){
  var comment = req.body;
  console.log(comment.updateId, comment.newComment);

  Article.findOneAndUpdate({'_id': comment.updateId}, {'comments':comment.newComment})
			// execute the above query
			.exec(function(err, doc){
				// log any errors
				if (err){
					console.log(err);
				} else {
          console.log('success');
						//redirect to index
					res.redirect('/');
				}
		})
});

router.post('/delete', function(req, res){
  var deleteComment = req.body;

  Article.findOneAndUpdate({'_id': deleteComment.updateId}, {'comments': ""})
			// execute the above query
			.exec(function(err, doc){
				// log any errors
				if (err){
					console.log(err);
				} else {
          console.log('deleted');
					//redirect to index
					res.redirect('/');
				}
		})
});



module.exports = router;
