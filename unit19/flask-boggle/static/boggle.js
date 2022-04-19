async function handleSubmit(evt) {
  evt.preventDefault()

  const $word = $('.word')

  let word = $word.val()

  console.log(word)

  const res = await axios.get("/verify", { params: { word: word }});

  console.log('res-data: ', res.data.result)

  if (res.data.result === 'not-word') {
    showMessage(word, 'is not a valid English word')
  } else if (res.data.result === 'not-on-board') {
    showMessage(word, 'is not a valid word on this board')
  } else {
    showMessage(word, 'is a valid word!')
  }

  $word.val('')
}

$('.verify-word').on('submit', handleSubmit)

// show message to user if word is valid
const $msg = $('.msg').hide()

function showMessage(word, message) {
  return $msg.text(`${word} ${message}`).show().delay(3000).fadeOut('slow')
}