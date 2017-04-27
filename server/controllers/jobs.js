var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var cheerio = require('cheerio');
var request = require('request');

function linkrun(link, json, title){
request(link, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);
  var $ = cheerio.load(body);
  var text = $('p').text();
  var start = text.indexOf('Minimum Qualifications') + 22;
  var end = text.indexOf('Preferred Qualifications');
  var slice = text.slice(start, end);
  json.require = slice;
  json.title = title;
  json.link = link;
  return json;
  })
}

module.exports = {
  scrapeSynopsis: function(req, res) {
    var jobs = []
    request("https://sjobs.brassring.com/TGWebHost/home.aspx?partnerid=25235&siteid=5359", function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }
      console.log("Status code: " + response.statusCode);
      var $ = cheerio.load(body);
      var count = 0;
      $('#tblTabFJob').each(function( index ) {
        var json = { title : "", location: "", LastUpdated: ""};
        $(this).find('input').each(function( index ) {
            count ++;
        if (count == 2) {
            var title = $(this).attr('value');
            var j = JSON.parse("[" + title+ "]");
            for (var i=0; i < 5; i++){
                var jobtitle = j[0][i].JobTitle;
                var joblocation = j[0][i].FORMTEXT1;
                var jobdate = j[0][i].LastUpdated;
                var start = jobtitle.indexOf('<strong>') + 8;
                var end = jobtitle.indexOf('</strong>');
                var title = jobtitle.slice(start, end);
                json.title = title;
                json.location = joblocation;
                json.LastUpdated = jobdate;

                var start = jobtitle.indexOf('href=') + 5;
                var end = jobtitle.indexOf(' tabindex') - 1;
                json.url = 'https://sjobs.brassring.com/TGWebHost/' + jobtitle.slice(start,end);

                jobs.push(json)
                Job.create({company: "Synopsis", title: title, url: json.url, location: joblocation, last_updated:jobdate }, function(err,result){
                  console.log(result)
                })
            }
          }
        })
      });
    });
  },


  showSynopsis: function(req,res){

      Job.find({company: "Synopsis"}, function(err,result){
        if(err){
          res.json({msg: "error"})
        } else {
        res.json({msg: "success", result: result})
      }
      })




  },

  scrapeFacebook: function(req,res){



    request("http://www.facebook.jobs/california/usa/jobs/", function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }
      // console.log("Status code: " + response.statusCode);
      var $ = cheerio.load(body);
      $('h4').each(function( index ) {
        var json = { title : "", link: "", require: ""};
        var title = $(this).text()
        var link = 'http://www.facebook.jobs' + $(this).find('a').attr('href');
        Job.create({company: "Facebook", title: title, url: link, location: "Menlo Park, CA"}, function(err,result){
          console.log(result)
        })
        // linkrun(link, json, title);
      });
    });




  }


}
