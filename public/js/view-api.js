var id;
var x;
var placesObj = {};
var list = [];
var main_place;
var z;
var a;
var dates = [];
var postsToAdd = [];
var datesArr = [];
var postArr = [];
var viewObj = {};
var b = 0;
$(document).ready(function() {

  //"View-all-places" button in view-update.html, which returns user to VIEW-ALL-CITIES

 

  var blogContainer = $("#container");
  var posts;

  getPosts();

  // 1. GET LIST OF ALL CITIES AND THEIR BEGIN_DATE

  function getPosts() {

$("#title").text("Select a City:")

    $.get("/api/posts/", function(all) {

      // all - contains all the data objects
      // loop through these objects

      for (i = 0; i < all.length; i++) {

// grab the first city and it's begin date

        var place = all[i].place;
        var begin = all[i].begin_date;

        // create an object:
        // placeObj = {place1: begin1, begin2}
        // placeObj = { city1: [date1, date2], city 2: [date1, date2]}
        // if place not in placesObj, 
        //then create a new key for it and an empty array for it
        // then push the dates into it.  

        if (!placesObj[place]) {
          placesObj[place] = [];
        }
        
        // inner loop prevents placing the same begin_date in city array more than once

        if (!placesObj[place].includes(begin)) { // added
        placesObj[place].push(begin);

        } // end inner loop
      } // end if loop

      // next, create an array of all the keys in placesObj
      // list = [city1, city2, city3]

      list = Object.keys(placesObj);
      
      // loop through list and display cities on screen - 
      // which is to be chosen? 
      
      for (i = 0; i < list.length; i++) {
        
        var row = $("<div>").addClass("col-md-offset-1").addClass("col-sm-1");
        var line = $("<a>").text(list[i]).attr("id", i).css("font-size", "20px").on("click", holler);
        row.append(line);
        blogContainer.append(row);
      }
    });

// test shows chapel hill: 4/17, 4/20
console.log(placesObj);

  } // FUNCTION 1, which displays cities, ends


  /// 2. FUNCTION: when city chosen, create / display a list of dates for it.

  function holler(e) {

    blogContainer.empty();

    x = e.target.id;  // grab id of city chosen
    
    // Asking a question: //list[x] is the name of a city


$("#title").text("Which date in " + list[x] + "?");
    // var line1 = $("<p>")
    //   .addClass("col-sm-offset-1")
    //   .text("Which date in " + list[x] + "?");
    // blogContainer.append(line1);

    //placeObj[list[x]] represents one array of dates for one city

    //1. we have a list of all begin_dates --- placesObj.list[]

  
    for (i = 0; i < placesObj[list[x]].length; i++) {
      var row = $("<div>").addClass("col-sm-offset-1").addClass("col-sm-1");
      var line2 = $("<a>")
        // placeObj[list[x]] [i] - represents on date from the array of dates from the city
        // placeObj { [Charlotte]; [date1, date2...] }

        .text(placesObj[list[x]][i]).css("font-size", "20px")
        .attr("id", i)
        .on("click", holler2)

      row.append(line2);
      blogContainer.append(row);
    }
  } // FUNCTION 2 ENDS - LIST OF DATES -

  /// 3. FUNCTION TO CREATE FINAL DISPLAY FOR HCOSEN CITY --

  function holler2(e) {

    z = e.target.id;
    console.log( "date chosen: " +placesObj[list[x]][z]); // correct begin_date
   
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

    // This grabs all the rows that have same begin date - INITIALIZE ROWS--------------
    var b = 0;
    blogContainer.empty();
    $("#title").empty();
    // console.log(z);
    // z = date chosen - 
    //get call --

    $.get("/api/posts", function(data) {
      
      // data = all our saved objects
      // loop through all this

      for (var i = 0; i < data.length; i++) {
        
        // if an object has the same begin_date as chosen, 
        // then put it in 'postsToAdd' 

        if (data[i].begin_date == placesObj[list[x]][z]) {

          postsToAdd.push(data[i]);
           
        }
      }
      console.log(postsToAdd);
      createNewRow(postsToAdd);

      // send postsToAdd to next function --
      // it contains all the needed objects for display
       
    }); // FUNCTION 3 API GET ENDS
  } // end FUNCTION 3 -- grabbing posts to add -

  // 4. FUNCTION TO SETUP PANELS FOR CHOSEN DATE ////////////////////////////////////-----------------

  function createNewRow(post) {
    console.log(post);
    blogContainer.empty();

    /// Create title at top of page. 

    if (b === 0) {
      var title = $("<h1>")
        .text(post[0].place + "  " + post[0].begin_date)
        .css("text-align", "center");
      $("#title").append(title);
      b++;
    }

    ///
    var allPost = {};
    allPost[post[0].event_date] = [post[0]];

    /// this creates  an allpost - 2 sets of data

    for (var i = 1; i < post.length; i++) {
      if (post[i].event_date in allPost) {
        allPost[post[0].event_date].push(post[i]);
      } else {
        allPost[post[i].event_date] = [post[i]];
      }
    }
    console.log(allPost);

    // this figures the size ---

    Object.size = function(obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    // Get the size of an object

    var size = Object.size(allPost);

    console.log(size);

    for (var i = 0; i < size; i++) {

      var newPostPanel = $("<div>");
      newPostPanel.addClass("panel panel-default").addClass("col-sm-4");

      var newPostPanelHeading = $("<div>");
      newPostPanelHeading.addClass("panel-heading").css("border", "1px solid black");

      var newPostPanelBody = $("<div>");
      newPostPanelBody.addClass("panel-body").css("border", "1px solid black");

      ///
      //////////////////////////////
      var listing = Object.keys(allPost);
      console.log(listing);

      /// delete button

      var deleteBtn = $("<button>")
      deleteBtn.text("delete")
      // newPostPanelBody.append(deleteBtn);
      // var a_post
      newPostPanelHeading.append(listing[i]).css("font-size", "20px");
      // var event= $("<li>")
      // var ul=$("<ul>")
      // newPostPanelBody.append(ul)
     
      for (y = 0; y < allPost[listing[i]].length; y++) {

      //   a_post = allPost[listing[i]][y].event_name;
      // event.append(a_post)
      // ul.append(event);
        // event.append(deleteBtn)
        
        
        newPostPanelBody.append(allPost[listing[i]][y].event_name ).css("font-size", "20px");
        // newPostPanelBody.append(deleteBtn)
        newPostPanelBody.append("<br><br>")
        // newPostPanelBody.append(event)
      }

      console.log(allPost[listing[0]][0].event_name);

      // add notes? 

      var form2=$("<form>").attr("id", "form2");
      var label=$("<label>").attr("for", "event").text("Notes: ");
      var input=$("<input>").attr({"type": "text", "name":"event", "id": "event"});
      var sub=$("<input>").attr({"type":"submit", "value":"submit"});
      
      label.append(input);
      label.append(sub);
      form2.append(label)
      newPostPanelBody.append(form2)



      // // deleteBtn.addClass("delete btn btn-danger");

// edit button - drop? 
      // var editBtn = $("<button>");
      // editBtn.text("edit");
      // // editBtn.addClass("edit btn btn-info");

// checkbox - drop? 

      // var checkBox =$("<div>").addClass("checkbox")
      // var checkLabel =$("<label>").html("<input type='checkbox'>").text(post.event_name)

      // var checkInput = $("<input>").attr("type", "checkbox");
      // checkLabel.append(checkInput);
      // checkBox.append(checkLabel);

      newPostPanel.append(newPostPanelHeading);
      newPostPanel.append(newPostPanelBody);
      blogContainer.append(newPostPanel);
       
    //   newPostPanel.data("post", post);
}

$("#addMore").html("<hr>").css("border", "1px solid black")
var question= ["Add another event", "Add another date"]
for (i=0; i<2; i++) {
var form = $("<form>")
var label = $("<label>")
label.text(question[i])
form.append(label);
var input = $("<input>")
input.css("background-color", "#DCDCDC")
label.append(input)
$("#addMore").append(form);

}

// .append("<button>").attr("type", "submit");

// clear all the variables
postsToAdd=[];
allPost={};
placesObj = {};
b=0;
list=[]
  } /// FUNCTION 4/4 ENDS - PANEL CREATION - CREATENEWPOST
}); //end page
