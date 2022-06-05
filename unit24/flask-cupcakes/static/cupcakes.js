const BASE_URL = 'http://127.0.0.1:5000/api'

// gets and displays list of cupcakes
async function getCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`)

  for (cc of response.data.cupcakes) {
    $('.cc-list').append(`<li data-id="${cc.id}">${cc.flavor}</li>`)
  }
}

getCupcakes()

// handles form for new cupcakes
async function addCupcake(evt) {
  evt.preventDefault()

  const flavor = $('#form-flavor').val()
  const size = $('#form-size').val()
  const rating = $('#form-rating').val()
  const image = $('#form-image').val()

  const cupcakeObj = {
    flavor,
    rating,
    size,
    image
  }

  // POST new cupcake data to server
  const resp = await axios.post(`${BASE_URL}/cupcakes`, cupcakeObj)

  // Add new cupcake to list
  $('.cc-list').append(`<li data-id="${resp.data.cupcake.id}">${flavor}</li>`)

  // reset input fields
  $('.cupcake-form').trigger("reset")
}

$('.cupcake-form').on('submit', addCupcake)