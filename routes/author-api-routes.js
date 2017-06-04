var db = require("../models");

module.exports = function(app) {

// 4 routes
// - two 'get's 
// 1. findAll "include" - an array of the models that contains db.Post (a left outer join)
// 2. findOne "include" - same as above 
// - a post and delete
// 3. this creates
// 4. this destroys what is chosen... 

  app.get("/api/authors", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join - In this case, just db.Post
    // ESSENTIALLY: When you GETALL from the Author api, also GETALL from the Post api. 

    db.Author.findAll({
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/authors/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join . In this case, just db.Post
    // When you GETONE from Author api, also GET ONE from the Post api

    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

// if you create an author api... 

  app.post("/api/authors", function(req, res) {
    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });


// if you delete an author api, only delete this ONE

  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
