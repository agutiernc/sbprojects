const results = document.querySelector('#search-results')

$('form').submit(function(e) {
  e.preventDefault()

  getGif()

  // reset input value
  $('input').val('')
})

async function getGif() {
  try {
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        q:   $('input').val(),
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    })

    const randomNum = Math.floor(Math.random() * 50) + 1 // random num between 1 and 50
    const url = res.data.data[randomNum].images.downsized.url

    createImg(url)
  } catch (error) {
    alert('Please try again')

    // reset input
    $('input').val('')
  }
}

function createImg(url) {
  const imgDiv = document.createElement('div')
  imgDiv.className = 'img-container'

  const img = document.createElement('img')
  img.setAttribute('src', url)

  imgDiv.append(img)
  results.append(imgDiv)
}

// delete all images
$('#remove-btn').on('click', function() {
  $('.img-container, img').remove()
})