$(document).ready(function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(responseData) {
    // unpack responseData...
    var candidates = responseData.candidates;

    $.each(candidates, function(index, data) {
      var listItem = $('<li>');
      $('<strong>').html(data.name + ': ').appendTo(listItem);
      $('<span>').html(data.votes + ' votes').appendTo(listItem);

      var voteForm = $('<form>');
      voteForm.attr('method', 'POST')
              .attr('action', 'https://bb-election-api.herokuapp.com/vote')
              .css('margin', '10px 0 20px');
      $('<input>').attr('type', 'hidden')
                  .attr('name', 'id')
                  .attr('value', data.id)
                  .appendTo(voteForm);
      $('<input>').attr('type', 'submit')
                  .attr('value', 'Vote for ' + data.name + '!')
                  .appendTo(voteForm);

      voteForm.appendTo(listItem);
      $('#candidates').append(listItem);


      $('form').on('submit', function(event) {
        event.preventDefault();

        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          data: { id: $(this).children('input[type=hidden]').val() } ,
          // dataType: ''
        }).done(function() {
          console.log('success');
        }).fail(function() {
          console.log('failed');
        });
      });
    })



  });


});
