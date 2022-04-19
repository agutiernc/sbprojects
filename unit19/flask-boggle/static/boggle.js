let score = 0
let startTimer = false

async function handleSubmit(evt) {
  evt.preventDefault()

  // enable timer
  if (!startTimer) {
    countDown()
  }

  const $word = $('.word')

  let word = $word.val()

  const res = await axios.get("/verify", { params: { word: word }});

  if (res.data.result === 'not-word') {
    showMessage(word, 'is not a valid English word')
  } else if (res.data.result === 'not-on-board') {
    showMessage(word, 'is not a valid word on this board')
  } else {
    showMessage(word, 'is a valid word!')

    scoreGame(word)
  }

  $word.val('').focus()
}

$('.verify-word').on('submit', handleSubmit)

// show message to user if word is valid
const $msg = $('.msg').hide()

function showMessage(word, message) {
  return $msg.text(`${word} ${message}`).show().delay(2000).fadeOut('slow')
}

function scoreGame(word) {
  score += word.length

  return $('.score').text(score)
}

function countDown() {
  let seconds = 60

  let interval_id = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(interval_id)
      startTimer = false

      $('.timer').text('Times up!')
      $('.verify-word :input').prop('disabled', true)
    } else {
      startTimer = true

      $('.verify-word :input').prop('disabled', false)
      $('.timer').text(seconds)
    }

    seconds -= 1
  }, 1000)
}