 $(document).ready(function() {

  // Getting jQuery references to the post body, title, form, and author select
  
      var event_name = $("#event_name"); // originally body
     var for_date = $("#for"); // for date
     var to_date = $("#to"); // to date
     var cmsForm = $("#cms"); // the whole form holding body, title, author
     var place = $("#place"); //originally author id


     var dateFormat = "mm/dd/yy",
         from = $("#from")
         .datepicker({
             defaultDate: "+1w",
             changeMonth: true,
             numberOfMonths: 2
         })
         .on("change", function() {
             to.datepicker("option", "minDate", getDate(this));
         }),
         to = $("#to").datepicker({
             defaultDate: "+1w",
             changeMonth: true,
             numberOfMonths: 2
         })
         .on("change", function() {
             from.datepicker("option", "maxDate", getDate(this));
         });



     function getDate(element) {
         var date;
         date = $.datepicker.parseDate(dateFormat, element.value);
         console.log("date is: ", date);
         try {

         } catch (error) {
             date = null;
         }

         return date;
     }

     $(cmsForm).on("submit", handleFormSubmit);

     // 1. A function for handling what happens when the form to create a new post is submitted

     function handleFormSubmit(event) {
         event.preventDefault();
         event.stopPropagation();
         console.log("hi");

         // Wont submit the post if we are missing a body, title, or author

         // if (!event_date.val().trim() || !event_place.val().trim() || !place.val()) {
         //   return;
         // }

         // Constructing a newPost object to hand to the database
         var newPost = {
             for_date: $("#for").val(),
             to_date: $("#to").val(),
             //   .val().trim(),
             event_name: event_name.val(),
             //   .val().trim(),
             place: place.val()
                 //   .val().trim()
         };
         console.log(newPost.to_date);
         // Run the submitpost function


         if (newPost) {
             submitPost(newPost);
         }

         return false;

     }

//////////////

  // 2. Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post).then(newPost);
      // window.location.href = "/add";
  }

  });