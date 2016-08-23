$( document ).ready(function() {
  function getArticles(){
    $.get('/articles').done(function(response){
      response.forEach(function(data){
        $('#results').append(
          `<tr>
            <td id="${data._id}">Article: <a href="${data.link}">${data.title}</a></td>
            <td>Comments: ${data.comments}</td>
            <td>
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Submit Comment</button>
            </td>
          </tr>`
        )
      })
    })
  }
  getArticles();
});//end on rdy function
