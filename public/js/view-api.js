var id;
var x;
var placesObj = {};
var list = [];
var main_place;
var z
var a
var dates=[]
var postsToAdd = [];
$(document).ready(function() {

  //this button is in the view-update.html.  this whole file refers to view-update.html

  $("button").on("click", function() {
    blogContainer.empty();
    list = [];
    placesObj = {};
    getPosts();
  });
  var blogContainer = $("#container");

  var posts;

  getPosts();

  function getPosts() {
    // Get a list of all the cities

    $.get("/api/posts/", function(all) {
      for (i = 0; i < all.length; i++) {
        // grab the places / dates

        var place = all[i].place;
        var date = all[i].event_date;

        // create an object where key = place and value = [date1, date2, date3]
        // placeObj = { city1: [date1, date2], city 2: [date1, date2]}

        if (!placesObj[place]) {
          placesObj[place] = [];
        }
        placesObj[place].push(date);
      }
      // list = an array of city names [city1, city2, city3]

      list = Object.keys(placesObj);
      list2 = Object.entries(list);

      // console.log("list2" + list2)

      for (i = 0; i < list.length; i++) {
        // create the actual list of all cities

        var row = $("<div>").addClass("col-md-offset-1").addClass("col-sm-1");
        var line = $("<a>").text(list[i]).attr("id", i).on("click", holler);
        row.append(line);
        blogContainer.append(row);
      }
    });
  } //

  // create list of dates for chosen city.

  function holler(e) {
    x = e.target.id;
    console.log(placesObj[list[x]]);
    blogContainer.empty();

    var line1 = $("<p>").addClass("col-sm-offset-1").text("Which date in " + list[x] + "?");
    blogContainer.append(line1);

//placeObj[list[x]] represents one array of dates for one city

    for (i = 0; i < placesObj[list[x]].length; i++) {
      var row = $("<div>").addClass("col-sm-offset-1").addClass("col-sm-1");
      var line2 = $("<a>")

// placeObj[list[x]] [i] - represents on date from the array of dates from the city
// placeObj { [Charlotte]; [date1, date2...] }

        .text(placesObj[list[x]][i])
        .attr("id", i)
        .on("click", function() {z= $("a").html();holler2(z)});
  
      row.append(line2);
      blogContainer.append(row);
    
  }
}

function holler2(z) {

// THE ORIGINAL API CALL --

// $.get("/api/posts3/" + id, function(data) {
// console.log(data);
// })

// HERE, I MIMIC RYO'S ATTEMPT, BUT FAILS
// id=1
//   $.ajax({
//     method: "GET",
//     url: "/api/posts3/" + id
//   }).then(function(data) {
//     console.log(data);
//     // getPosts(postCategorySelect.val());
//     // window.location.href = "/add";
//   });

// This grabs all the rows that have same begin date - --------------

blogContainer.empty();
$("#title").empty();

$.get("/api/posts", function(data){
  console.log(data)
  for (var i=0; i<data.length; i++){
    if (data[i].event_date==z) {
      // dates.push(data[i])
      postsToAdd.push(createNewRow(data[i]));
    }
  };
blogContainer.append(postsToAdd);

//////////////////////////////////////-----------------

function createNewRow(post) {
 
    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default").addClass("col-sm-4").attr("day", a);

    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading").attr("day", a);

 var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body").attr("day", a);

// adding the delete / edit buttons
     var form2=$("<form>").attr("id", "form2");
  var label=$("<label>").attr("for", "event").text("Where to visit?");
  var input=$("<input>").attr({"type": "text", "name":"event", "id": "event"});
  var sub=$("<input>").attr({"type":"submit", "value":"submit"});
  label.append(sub);
  label.append(input);
  form2.append(label)

    var deleteBtn = $("<button>");
    deleteBtn.text("delete");
    // deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("edit");
    // editBtn.addClass("edit btn btn-info");


var eventDate = $("<p>");
eventDate.text(post.event_date)
var checkBox =$("<div>").addClass("checkbox")
var checkLabel =$("<label>").html("<input type='checkbox'>").text(post.event_name)

// var checkInput = $("<input>").attr("type", "checkbox");
// checkLabel.append(checkInput);
checkBox.append(checkLabel);

newPostPanelBody.append(checkBox);
    // var eventName = $("<p>");
    // eventName.text("Visit: " + post.event_name);
var title=$("<h1>").text(post.place).css("text-align", "center")  
$("#title").append(title);

    // newPostDate.text(formattedDate);

// append everything

    // eventName.append(newPostDate);
    newPostPanelHeading.append(eventDate);
    // newPostPanelHeading.append(place);

    // newPostPanelBody.append(eventName);
    newPostPanelBody.append(form2);
    newPostPanelBody.append(deleteBtn);
    newPostPanelBody.append(editBtn);
    
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

 
// This displays them --


// for (i = 0; i < dates.length; i++) {
//       row = $("<div>").addClass("col-sm-offset-1")
//       line2 = $("p").html("Place: " + dates[i].place + "<br> " +
//           "Spot: " + dates[i].event_name + "<br>" + "Day: " + dates[i].event_date+ "<br>" + "Completed? " + dates[i].completed);
         
//       row.append(line2);
//       blogContainer.append(row);
   /////////////////////
   
  // } // for loop ends




}) // get ends
 
} // holler 2 ends here.... 

}); //end page
