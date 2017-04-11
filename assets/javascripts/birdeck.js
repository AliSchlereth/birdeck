var API = 'http://localhost:3000/api/v1';

var printAllPosts = function(data) {
  for (var i = 0; i < data.length; i++) {
    $('#latest-posts').append('<p class="post">' + data[i].description + '<p>' );
  }
}

var getAllPosts = function() {
  return $.ajax({
    url: API + '/posts',
    method: 'GET'
  })
  .done(printAllPosts)
  .fail();
}

var clearPosts = function() {
  $('#latest-posts').html('')
}

var fetchPosts = function() {
  clearPosts();
  getAllPosts();
}

getAllPosts();


$(document).ready(function(){
  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();
  $('button[name=button-fetch]').on('click', fetchPosts)

  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
