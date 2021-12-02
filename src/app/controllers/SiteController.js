const Course = require('../models/Course')

class SiteController {
  // GET /home
  index(req, res,next) {
    // Course.find({},function(err, courses) {
    //   if(!err){
    //     res.json(courses)
    //   } else {
    //     res.status(400).json({error:err.message})
    //   }
    // })

    Course.find({})
          .then(courses => res.json(courses))
          .catch(next) 
   }

  //GET /search
  search(req, res) {
    return res.render('search');
  }
}

module.exports = new SiteController();
