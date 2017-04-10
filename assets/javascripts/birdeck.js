var API = 'http://localhost:3000'

var getPosts = function() {
  return $.ajax({
    url: API + '/api/v1/posts',
    method: 'GET'
  }).done(function(data){
    for (var i = 0; i < data.length; i++ ) {
      $('#latest-posts').append('<p class="post">' + data[i].description + '</p>');
    }
  })
  .fail(function(error){
    console.error(error)
  })
}

var fetchPosts = function() {
  $('#latest-posts').html('');
  getPosts();
}

var fetchPostById = function() {
  var postId = $(this).children('.form-control').val();
  return $.ajax({
    url: API + '/api/v1/posts/' + postId,
    method: 'GET'
  }).done(function(data) {
    $('#latest-posts').html('');
    $('#latest-posts').append('<p class="post">' + data.description + '</p>');
  })
  .fail(function(error) {
    console.err(error)
  });
}

var createPost = function() {
  var postDescription = $(this).children('.form-control').val();
  $('#latest-posts').html('');
  return $.ajax({
    url: API + '/api/v1/posts',
    method: 'POST',
    data: { 'post': { 'description': postDescription } }
  }).done(function(data) {
    $('#latest-posts').append('<p class="post">' + data.description + '</p>');
  })
  .fail(function(error) {
    console.error(error)
  })
}

var updatePostById = function() {
  var updateID = $(this).children('input[name=update-id]').val();
  var updateDescription = $(this).children('input[name=post-description]').val();
  return $.ajax({
    url: API + '/api/v1/posts/' + updateID,
    method: 'PUT',
    data: { 'post': { 'description': updateDescription } }
  }).done(function(data) {
    fetchPosts();
    $('input[name=update-id]').val('');
    $('input[name=post-description]').val('');
  })
  .fail(function(error) {
    console.error(error);
  });
}

var deletePostById = function() {
  var postId = $(this).children('.form-control').val();
  return $.ajax({
    url: API + '/api/v1/posts/' + postId,
    method: 'DELETE'
  }).done(function(data) {
    fetchPosts();
  })
  .fail(function(error) {
    console.error(error)
  });
}

$(document).ready(function(){
  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();
  $('#fetch-posts').on('click', fetchPosts);
  $('.show-form').on('submit', fetchPostById);
  $('.post-form').on('submit', createPost);
  $('.update-form').on('submit', updatePostById);
  $('.delete-form').on('submit', deletePostById);
  getPosts();


  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
