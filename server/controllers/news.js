var mongoose = require('mongoose');
var News = mongoose.model('News');
var cheerio = require('cheerio');
var request = require('request');

module.exports = {
  // scrapeSynopsis: function(req, res) {
  //   var jobs = []
  //   request("https://sjobs.brassring.com/TGWebHost/home.aspx?partnerid=25235&siteid=5359", function(error, response, body) {
  //     if(error) {
  //       console.log("Error: " + error);
  //     }
  //     console.log("Status code: " + response.statusCode);
  //     var $ = cheerio.load(body);
  //     var count = 0;
  //     $('#tblTabFJob').each(function( index ) {
  //       var json = { title : "", location: "", LastUpdated: ""};
  //       $(this).find('input').each(function( index ) {
  //           count ++;
  //       if (count == 2) {
  //           var title = $(this).attr('value');
  //           var j = JSON.parse("[" + title+ "]");
  //           for (var i=0; i < 5; i++){
  //               var jobtitle = j[0][i].JobTitle;
  //               var joblocation = j[0][i].FORMTEXT1;
  //               var jobdate = j[0][i].LastUpdated;
  //               var start = jobtitle.indexOf('<strong>') + 8;
  //               var end = jobtitle.indexOf('</strong>');
  //               var title = jobtitle.slice(start, end);
  //               json.title = title;
  //               json.location = joblocation;
  //               json.LastUpdated = jobdate;
  //
  //               var start = jobtitle.indexOf('href=') + 5;
  //               var end = jobtitle.indexOf(' tabindex') - 1;
  //               json.url = 'https://sjobs.brassring.com/TGWebHost/' + jobtitle.slice(start,end);
  //
  //               jobs.push(json)
  //               Job.create({company: "Synopsis", title: title, url: json.url, location: joblocation, last_updated:jobdate }, function(err,result){
  //                 console.log(result)
  //               })
  //           }
  //         }
  //       })
  //     });
  //   });
  // },
  //
  //
  // showSynopsis: function(req,res){
  //
  //     Job.find({company: "Synopsis"}, function(err,result){
  //       if(err){
  //         res.json({msg: "error"})
  //       } else {
  //       res.json({msg: "success", result: result})
  //     }
  //     })
  //
  //
  //
  //
  // },

  scrapeApple: function(req,res){
    request("https://www.apple.com/newsroom/", function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }
      console.log("Status code: " + response.statusCode);
      var $ = cheerio.load(body);
      $('div.tile-content a').each(function( index ) {
        var json = { title : "", link : "", date: ""};
        var link = "http://www.apple.com" + $(this).attr('href')
        json.link = link;
        var date = $(this).find('.category-eyebrow__date').text();
        // console.log($(this).find('.category-eyebrow__date').text())
        json.date = date;
        var title = $(this).find('p').text()
        json.title = title;
        if(title !== ""){
            // console.log(json);
            News.create({title: title, url: link, date:date, company:"Apple"}, function(err, result){
              console.log(result);
            })
        }

        // fs.appendFileSync('apple.txt', title + '\n' + link);
      });
      // console.log(news)
    });

  },

  showApple: function(req, res){

    News.find({company: "Apple"}, function(err,result){
      if(err){
        res.json({msg: "error"})
      } else {
        res.json({msg: "success", result: result})
      }
    })
  }


}
