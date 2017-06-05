  $(document).ready(function() {

  // Getting jQuery references to the post body, title, form, and author select
  
  var event_place = $("#event_place"); // originally body
  var event_date = $("#event_date"); //originally title
  var cmsForm = $("#cms"); // the whole form holding body, title, author
  var place = $("#place"); //originally author id




$(cmsForm).on("submit", handleFormSubmit);

// 1. A function for handling what happens when the form to create a new post is submitted

  function handleFormSubmit(event) {
    event.preventDefault();

    // Wont submit the post if we are missing a body, title, or author

    // if (!event_date.val().trim() || !event_place.val().trim() || !place.val()) {
    //   return;
    // }

    // Constructing a newPost object to hand to the database
    var newPost = {
      event_date: event_date.val(),
    //   .val().trim(),
      event_place: event_place.val(),
    //   .val().trim(),
      place: place.val()
    //   .val().trim()
    };

  // Run the submitpost function


if (newPost) {
    submitPost(newPost);
}
  


  }

//////////////

  // 2. Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/add";
    });
  }
  } )