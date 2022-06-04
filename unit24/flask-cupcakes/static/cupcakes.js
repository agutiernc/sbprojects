const BASE_URL = 'http://127.0.0.1:5000/api/cupcakes'

async function getCupcakes() {
  const response = await axios.get(BASE_URL)

  for (cc of response.data.cupcakes) {
    console.log(cc.flavor)
    $('.cc-list').append(`<li class="data-${cc.id}">${cc.flavor}</li>`)
  }
}

getCupcakes()