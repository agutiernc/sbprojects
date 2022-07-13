const BASE_URL = 'http://numbersapi.com'
const FAV_NUM = 21

// 1. Make a request to the Numbers API to get a fact about your favorite number.

$.getJSON(`${BASE_URL}/${FAV_NUM}?json`)
  .then(data => console.log(data))
  .catch(err => console.log(err))


// 2. Figure out how to get data on multiple numbers in a single request. Make that 
//     request and when you get the data back, put all of the number facts on the page.

let numbers = [1, 210, 101, 7]

$.getJSON(`${BASE_URL}/${numbers}?json`)
  .then(data => console.log(data))
  .catch(err => console.log(err))


// 3. Use the API to get 4 facts on your favorite number. Once you have them all, 
//      put them on the page. It’s okay if some of the facts are repeats.

let arr = [...Array(4)].map(() => $.getJSON(`${BASE_URL}/${FAV_NUM}?json`))

Promise.all(arr)
  .then(data => data.forEach(d => $('body').append(`<p>${d.text}</p>`)) )
  .catch(err => console.log(err))