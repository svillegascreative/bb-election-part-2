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
      $('<h3>').html(data.name).appendTo(listItem);
      $('<span>').html(data.votes).appendTo(listItem);
      $('<form>').attr('method', 'POST')
                 .attr('action', 'https://bb-election-api.herokuapp.com/vote')
                 .appendTo(listItem);

      $('#candidates').append(listItem);
    })
  });

});
