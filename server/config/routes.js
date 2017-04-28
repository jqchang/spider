var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var jobs = require('../controllers/jobs.js');

var News = mongoose.model('News');
var news = require('../controllers/news.js');


module.exports = function(app){
//Product Routes

  app.get('/', function (req, res){
    res.sendFile('index.html', {root: __dirname + './../../client'});
  })

  app.get('/scrape/synopsys', function(req, res){
    // console.log('getting all jobs from facebook');
    jobs.scrapeSynopsys(req,res);
  })

  app.get('/jobs/synopsys', function(req,res){
    jobs.showSynopsys(req,res);
  })


  app.get('/scrape/facebook', function(req, res){
    // console.log('getting all jobs from facebook');
    jobs.scrapeFacebook(req,res);
  })

  app.get('/jobs/facebook', function(req,res){
    jobs.showFacebook(req,res);
  })

  app.get('/scrape/news/apple', function(req, res){
    // console.log('getting all jobs from facebook');
    news.scrapeApple(req,res);
  })

  app.get('/news/apple', function(req, res){
    // console.log('getting all jobs from facebook');
    news.showApple(req,res);
  })

  app.get('/scrape/news/google', function(req, res){
    // console.log('getting all jobs from facebook');
    news.scrapeGoogle(req,res);
  })
  app.get('/news/google', function(req, res){
    // console.log('getting all jobs from facebook');
    news.showGoogle(req,res);
  })
  //
  // app.post('/products', function(req,res){
  //   console.log('creating new product', req.body)
  //   // products.create(req,res);
  // })
  //
  // app.put('/products/:id', function(req,res){
  //   console.log('updating product with id of ', req.params.id)
  // })
  //
  // app.delete('/products/:id', function(req,res){
  //   console.log('deleting product with id of ', req.params.id)
  // })

//End of Product Routes

}
