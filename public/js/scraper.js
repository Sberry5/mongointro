$(document).ready(function () {

// Function to save article to the DB
$('#saveButton').on('click', () => {
    var newNote = $('#').val().trim();
    var articleID = $(this).attr('data-id');
    // POST request to add a note
    $.ajax({
      method: 'POST',
      url: '/savedArticles' + articleID,
      data: {
    // Value from input
        note: $('#userNote').val()
      }
    }).done(function(data) {
    // Log the response
    console.log('data: ', data);
      });
    });
}