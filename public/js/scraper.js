$(document).ready(function () {

// Function to save article to the DB
$('body').on('click', '.saveButton', function(event) {
    console.log("Save button function triggered");
    var newNote = $(this).closest('article').find('.userNote').val().trim();
    var articleID = $(this).closest('article').find('._id.value').val();
    console.log('articleID', articleID);
    console.log('new note', newNote);
    // PUT request to add a note
    $.ajax({
      method: 'PUT',
      url: '/savedArticles' + articleID,
      data: {
    // Value from input
        note: $('.userNote').val()
      }
    }).done(function(data) {
    // Log the response
    console.log('data: ', data);
      });
    });
});