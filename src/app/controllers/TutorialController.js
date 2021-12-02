const Tutorial = require('../models/Tutorial')

class SiteController {

    //POST /api/tutorials 

    create(req,res){

        if(!req.body.title){
            res.status(404).send({message: 'Content can not be empty'});
            return;
        }

        // Create a Tutorial
        const tutorial = new Tutorial({
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        });

        // Save Tutorial in the database
        tutorial
            .save(tutorial)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Tutorial."
            });
            });
    }

    //GET api/tutorials?title=

    findAll(req,res,next){
        const title = req.query
        var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

        Tutorial.find({})
        .then(courses => res.json(courses))
        .catch(next) 
    
    }

    //GET /api/tutorials/:id

    findById(req, res){
        const id = req.params.id;

        Tutorial.findById(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: "Not found Tutorial with id " + id });
            else res.send(data);
          })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Error retrieving Tutorial with id=" + id });
          });
    }

    //GET api/tutorials/published

    findPublished(req, res){

        Tutorial.find({ published: true })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        });
    }

    //PUT /api/tutorials/:id

    updateById(req, res){

        if (!req.body) {
            return res.status(400).send({
              message: "Data to update can not be empty!"
            });
          }
        
          const id = req.params.id;
        
          Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
              } else res.send({ message: "Tutorial was updated successfully." });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Tutorial with id=" + id
              });
            });

    }

    //DELETE /api/tutorials/:id

    deleteById(req, res){

        const id = req.params.id;

        Tutorial.findByIdAndRemove(id)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
            } else {
              res.send({
                message: "Tutorial was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
            });
          });

    }

    //DELETE /api/tutorials

    deleteAll(req, res){

        Tutorial.deleteMany({})
        .then(data => {
          res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });

    }


}

module.exports = new SiteController();
