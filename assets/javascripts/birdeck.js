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
    console.log(error)
  })
}

$(document).ready(function(){
  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();
  getPosts();


  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
