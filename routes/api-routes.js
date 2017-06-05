var db = require("../models");

module.exports = function(app) {

 
// This grabs all the api/posts, which jquery will then insert into the "blog-container" class in add.html 

  app.get("/api/posts", function(req, res) {
    db.Post.findAll({
    }).then(function(data) {
      res.json(data);
    });
  });


// Jquery grabs data from form and sends it here: /api/posts, which then creates it on the database 

  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(data) {
      res.json(data);
      // res.redirect("/");
    });
  });

}