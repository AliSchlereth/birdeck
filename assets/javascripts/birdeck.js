var API = 'http://localhost:3000'

var onFail = function(error) {
console.error(error)
}

var clearInput = function() {
  $('input[name=update-id]').val('');
  $('input[name=post-description]').val('');
  $('input[name=delete-id]').val('');
}

var getPosts = function() {
  return $.ajax({
    url: API + '/api/v1/posts',
    method: 'GET'
  }).done(function(data){
    for (var i = 0; i < data.length; i++ ) {
      printPost(data[i]);
    }
  })
  .fail(onFail);
}

var fetchPosts = function() {
  $('#latest-posts').html('');
  getPosts();
}

var printPost = function(data) {
  $('#latest-posts').append('<p class="post">' + data.description + '</p>');
}

var fetchPostById = function() {
  var postId = $(this).children('.form-control').val();
  return $.ajax({
    url: API + '/api/v1/posts/' + postId,
    method: 'GET'
  }).done(function(data) {
    $('#latest-posts').html('');
    printPost(data);
  })
  .fail(onFail);
}

var createPost = function() {
  var postDescription = $(this).children('.form-control').val();
  return $.ajax({
    url: API + '/api/v1/posts',
    method: 'POST',
    data: { 'post': { 'description': postDescription } }
  }).done(fetchPosts)
  .fail(onFail);
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
    clearInput();
  })
  .fail(onFail);
}

var deletePostById = function() {
  var postId = $(this).children('.form-control').val();
  return $.ajax({
    url: API + '/api/v1/posts/' + postId,
    method: 'DELETE'
  }).done(function(data) {
    fetchPosts();
    clearInput();
  })
  .fail(onFail);
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
