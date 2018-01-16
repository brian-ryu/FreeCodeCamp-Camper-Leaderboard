//Main method
$(document).ready(function() {
  //Various HTML strings to be used in constructing the leaderboards
  const recentUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
  const alltimeUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
  const recentHeader = `<tr>
      <th style = 'width: 50px'>No.</th>
      <th>Username</th>
      <th><u>Points in last 30 days</u></th>
      <th class = 'toggle'>Points total</th>
    /tr>`;
  const alltimeHeader = `<tr>
      <th style = 'width: 50px'>No.</th>
      <th>Username</th>
      <th><u>Points total</u></th>
      <th class = 'toggle'>Points in last 30 days</th>
    /tr>`;
  //Fill out the two leaderboards
  fillTable(recentUrl, recentHeader, "recent", "alltime", "#recent-table");
  fillTable(alltimeUrl, alltimeHeader, "alltime", "recent", "#alltime-table");
  //Hide the all-time leaderboard
  $("#alltime-table").css("display", "none");
});

//Function that gets the JSON data from the freeCodeCamp API and fills out the leaderboard
//I decided to use one function and pass various parameters, but two seperate functions could have worked too
function fillTable(url, headerHtml, header3, header4, tableId) {
  //Get JSON
  $.getJSON(url, function(data) {
    //Set the header to be the one passed to the function
    var html = headerHtml;
    //Loop through each user entry and add the necessary HTML to the HTML string variables
    for (var i = 0; i < data.length; i++) {
      html += `<tr>
        <th style = 'width: 50px'>
          ` + (i + 1) + `
        </th>
        <th>
          <img src = '` + data[i].img + `' alt = 'profile-pic' height = '50' width = '50'>
          <a href = 'https://www.freecodecamp.com/` + data[i].username + `' target = '_blank'>` + data[i].username + `</a>
        </th>
        <th>
            ` + data[i][header3] + `
          </th>
          <th>
            ` + data[i][header4] + `
          </th>
        </tr>`;
    }
    //Add the HTML to the corresponding leaderboard
    $(tableId).html(html);
    //If this is the second time running the function and we are building the all-time leaderboard,
    //set up a click listener to toggle between leaderboards that sort by all-time points and recent points
    //I decided to load both APIs once at the beginning and simply hide/show leaderboards based on this toggle 
    if (header3 == "alltime") {
      $(".toggle").click(function() {
        if ($("#recent-table").css("display") != "none") { 
          $("#recent-table").css("display", "none");
          $("#alltime-table").css("display", "table");
        }else {
          $("#recent-table").css("display", "table");
          $("#alltime-table").css("display", "none");
        }
      });
    }
  });
}
