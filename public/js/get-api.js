  $(document).ready(function() {
  

  var blogContainer = $(".blog-container");

    var posts;

    getPosts();
    
  // 1. This function grabs posts from the database and updates the view

  function getPosts(data) {
 
    $.get("/api/posts", function(data) {
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

// 3. InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // 4. This function constructs a post's HTML
  // post = the first object gotten from sequelize

  function createNewRow(post) {
    // var formattedDate = new Date(post.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");


// adding the paneling --- 

    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");

    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");

// adding the delete / edit buttons

    var deleteBtn = $("<button>");
    deleteBtn.text("delete");
    deleteBtn.click(handlePostDelete);
    // deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("edit");
    // editBtn.addClass("edit btn btn-info");

// adding the tags for the sql columns ---------------------
   
// var newPostDate = $("<p>");

var eventDate = $("<p>");
    eventDate.text("On: " + post.event_date);

    var place = $("<p>");
    place.text("Your Place: " + post.place);
    place.css({
      color: "black",
      "margin-top":
      "-10px"
    });

    var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
  
    var eventName = $("<p>");
    eventName.text("Visit: " + post.event_name);
   

    // newPostDate.text(formattedDate);

// append everything

    // eventName.append(newPostDate);
    newPostPanelHeading.append(eventDate);
    newPostPanelHeading.append(place);

    newPostPanelBody.append(eventName);
    newPostPanelBody.append(deleteBtn);
    newPostPanelBody.append(editBtn);
    
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

    // 7. This function displays a messgae when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No posts yet, navigate <a href='/add" +
    "'>here</a> in order to get started.");
    blogContainer.append(messageh2);
  }


  }); // end document.ready(function())