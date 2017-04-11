var API = 'http://localhost:3000/api/v1';

var onFail = function(error) {
  console.error(error);
}

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
  .fail(onFail);
}

var printPost = function(data) {
  clearPosts();
  $('#latest-posts').append('<p class="post">' + data.description + '</p>')
}

var fetchPost = function() {
  var postID = $('input[name=show-id]').val();
  return $.ajax({
    url: API + '/posts/' + postID,
    method: 'GET'
  })
  .done(printPost)
  .fail(onFail);
}



var clearPosts = function() {
  $('#latest-posts').html('');
}

var fetchPosts = function() {
  clearPosts();
  getAllPosts();
}

getAllPosts();

$(document).ready(function(){
  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();
  $('button[name=button-fetch]').on('click', fetchPosts);
  $('.show-form').on('submit', fetchPost);


  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
