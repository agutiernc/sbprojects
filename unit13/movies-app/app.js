// form creates movie title and rating
$('form').submit(function(e) {
  e.preventDefault()

  // validate input fields
  if (!$('input').val() || $('input').eq(0).val().length < 2) {
    alert('Please enter movie title and rating')

    return
  }

  let title = $('#title').val()
  let rating = $('#rating').val()

  $('ul').append(`<li>${title} - ${rating} <button class='btn-delete'>x</button></li>`)

  // reset input values
  $('input').val('')
})

// delete movie
$('ul').on('click', '.btn-delete', function(){ 
  $(this).parent().remove()
})