  var id;
  var x;
  var placesObj={};
  var list = [];
var main_place;
  $(document).ready(function() {
  
$("button").on("click", function() {blogContainer.empty(); list=[]; placesObj={}; getPosts()})
  var blogContainer = $("#container");

    var posts;

    getPosts();
    
// 1. This function grabs posts from the database and updates the view

  function getPosts() {
 
// GET ONE - on load -----------------------------


    $.get("/api/posts/", function(all) {
  
      for (i=0; i<all.length; i++){
        var place=all[i].place;
        var date = all[i].event_date;
        if (!placesObj[place]) {
          placesObj[place] =[];
        }
        placesObj[place].push(date);
      }
      console.log(placesObj); // stop here.. 
      list = Object.keys(placesObj);
      list2 = Object.entries(list);
      console.log("list2" + list2)
      for (i=0; i<list.length; i++) {
      
      }
   
      
      for (i=0; i<list.length; i++){
        var row = $("<div>").addClass("col-sm-1") 
  var line = $("<a>").text(list[i]).attr("id", i).on("click", holler);

  row.append(line)
  blogContainer.append(row);
      }
    });

// This displays the cities



//  blogContainer.append("<br>");
 
      } // 
  //   })    
  // }; ////// GET ONE ENDS 
  
///// GET TWO ----- UPON CLICK - SELECT BEGIN DATE FROM POSTS WHERE PLACE = "CITY'"
function holler(e){
   x = e.target.id 
   console.log(x)
console.log(placesObj[list[x]])
blogContainer.empty();
      
        blogContainer.append("   Which date in " + list[x] + "? </br>" );
for (i=0; i<placesObj[list[x]].length; i++){
        var row = $("<div>").addClass("col-sm-1") 
  var line = $("<a>").text(placesObj[list[i]]).attr("id", i).on("click", holler);
console.log(placesObj[list[i]])
  row.append(line)
  blogContainer.append(row);
      }
  //  blogContainer.empty();
  // GET TWO - if you click a city, then we pull up all its objects......

      //  $.get("/api/posts", function(data) {
      // for (i=0; i<data.length; i++){
 
      //   if (data[i].id==(x)){
      //     console.log(data[i].begin_date)

// GET THREE -- this only gets objects of a particular begin date
// but if the first get worked, this wouldnt' be needed. 
// this is the PROBLEM ONE... IT PULLS UP ALL THE OBJECTS RATHER THAN NONE,
// AND IT SHOUDL BE NONE BECUAE THERE ARE NO OBJECTS WITH B_DATE=0.

// call endpoint
          // $.get("/api/posts2/" + place +"/"+ date, function(data) {
          // console.log(data[i].begin_date);
        
            // console.log(data);
  //           for (i=0; i<data.length; i++){
  //             if (data[i].begin_date==2) {
  //               console.log(data[i])

  //             }
  //             }
  //           }
  //               )
  //         }
          
  //       }
  // //  $.get("api/posts/" +x, function(data) {
  //   console.log(data);  
   
          
      //  })//get
}//holler
  })//end page
 
