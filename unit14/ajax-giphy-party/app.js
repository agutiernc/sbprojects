const input = document.querySelector('.search')
const form = document.querySelector('#search-form')
const results = document.querySelector('#search-results')

form.addEventListener('submit', async function(e) {
  e.preventDefault()

  getGif()

  // reset input
  input.value = ''
})

async function getGif() {
  try {
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        q: input.value,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    })

    const randomNum = Math.floor(Math.random() * 50) + 1 // random num between 1 and 50
    const url = res.data.data[randomNum].images.downsized.url

    createImg(url)
  } catch (error) {
    alert('Please try again')

    // reset input
    input.value = ''
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