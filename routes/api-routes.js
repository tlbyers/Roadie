var db = require("../models");

module.exports = function(app) {

 
// GET ALL POSTS / then insert into the "blog-container" class in add.html 

  app.get("/api/posts", function(req, res) {
    db.Post.findAll({
    }).then(function(data) {
      res.json(data);
    });
  });

// get only a certain id

app.get("/api/posts3/:id", function(req, res) {
  db.Post.findAll({
    where: {
      id : req.params.id
    }
  })
  .then(function(data){
    res.json(data);
  })

})



// Jquery grabs data from form and sends it here: /api/posts, which then creates it on the database 

  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(data) {
      console.log("I am posting!")
      res.json(data);
      // res.redirect("/");
    });
  });



// DELETE route for deleting posts
  app.delete("/api/posts2/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      console.log("Ryo's Log")
      res.json(data);
    });
  });
};