var API = 'http://localhost:3000/api/v1';

var onFail = function(error) {
  console.error(error);
}

var clearInput = function() {
  $('input[name=show-id]').val('');
  $('input[name=post-description]').val('');
  $('input[name=update-id]').val('');
  $('input[name=delete-id]').val('');
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
  $('#latest-posts').append('<p class="post">' + data.description + '</p>')
}

var fetchPost = function() {
  var postID = $('input[name=show-id]').val();
  return $.ajax({
    url: API + '/posts/' + postID,
    method: 'GET'
  })
  .done(function(data) {
    clearPosts();
    printPost(data);
    clearInput();
  })
  .fail(onFail);
}

var createPost = function() {
  var postDescription = $('input[name=post-description').val();
  return $.ajax({
    url: API + '/posts',
    method: 'POST',
    data: { 'post': { 'description': postDescription } }
  })
  .done(function(data) {
    printPost(data);
    clearInput();
  })
  .fail(onFail);
}

var updatePostById = function() {
  var postID = $('input[name=update-id]').val();
  var postDescription = $('.update-form input[name=post-description]').val();
  return $.ajax({
    url: API + '/posts/' + postID,
    method: 'PUT',
    data: {'post': {'description': postDescription}}
  })
  .done(function() {
    fetchPosts();
    clearInput();
  })
  .fail(onFail);
}

var deletePostById = function() {
  var postID = $(this).children('.form-control').val()
  return $.ajax({
    url: API + '/posts/' + postID,
    method: 'DELETE'
  })
  .done(function() {
    fetchPosts();
    clearInput();
  })
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
  $('.post-form').on('submit', createPost);
  $('.update-form').on('submit', updatePostById);
  $('.delete-form').on('submit', deletePostById);

  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
