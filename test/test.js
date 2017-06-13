"use strict"; 

var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

nightmare
 .goto('http://localhost:3000/add.html')
  .type('#place', 'Orlando, Florida')
  .type('#event_date', 'July 4, 2017')
  .type('#event_place', 'Disney')
  .click('#submit')
  .wait('#zero_click_wrapper .c-info__title a')
  .evaluate(function () {
    return document.querySelector('#zero_click_wrapper .c-info__title a').href;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });