$(document).ready(function() {

  function getArticles(){
    //emtpty out container to avoid dupes
    $('#results').empty();
    $.get('/articles').done(function(response){
      response.forEach(function(data){
        // no undefined comments
        if(data.comments == undefined){
          data.comments = "";
        }
        $('#results').append(
          `<tr>
            <td >Article: <a href="${data.link}">${data.title}</a></td>
            <td>Comment: ${data.comments}</td>
            <td>
            <button type="button" data="${data._id}" class="commentbtn btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Add Comment</button>
            <button type="button" data="${data._id}" class="deletebtn btn btn-info btn-sm">Delete Comment</button>
            </td>
          </tr>`
        )
      });
      // adding update and delete listeners to buttons
      $('.btn').on('click', function(){
        var id = $(this).attr('data')
        $('.dataHolder').attr('articleId', id);

        $('.deletebtn').on('click', function(){
          var dbId = {
            updateId: $('.dataHolder').attr('articleid')
          };
          $.post('/delete', dbId).done(function(){
            getArticles();
          })
        })
      });
    })
  };

  //scrape data trigger
$('#refresh').on('click', function(){
  $.get('/scrape').done(function(){
    getArticles();
  })
})

//post a comments
$('#submitComment').on('click', function(){
  var dbId = $('.dataHolder').attr('articleid');
  var comment = $('#comment').val();
  var submission = {
    updateId: dbId,
    newComment: comment
  };
  $.post('/comment', submission).done(function(){
    getArticles();
  })
})
getArticles();
});//end on rdy function
