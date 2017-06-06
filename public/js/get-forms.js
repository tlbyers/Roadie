  $(document).ready(function() {
  
// var forId=["a", "b"];
// var name=["place", "event_date"];
// var label_text = ["Which place will you visit?", "How many days will you be there?"]
var container = $("#forms");
var place;
var form = $("<form>");
container.empty();
// for (var i=0; i<2; i++){
var label = $("<label>").attr({"for": "a"}).text("Where will you visit?");
var input = $("<input>").attr({"type":"text", "id": "a", "name": place });

label.append(input);
container.append(label);
// }
var submit = $("<input>").attr({"type":"submit", "value":"Submit"}).text("submit");
container.append(submit)

$(submit).on("click", xyz);

function xyz() {
    console.log("helloo");
    // console.log(a);
console.log (place);
// console.log(event_date);
}
  }); // document.ready ends