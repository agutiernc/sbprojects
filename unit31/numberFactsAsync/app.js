const BASE_URL = 'http://numbersapi.com'
const FAV_NUM = 21

// 1. Make a request to the Numbers API to get a fact about your favorite number.

async function part1() {
  let res = await fetch(`${BASE_URL}/${FAV_NUM}?json`)
  let data = await res.json()

  console.log(data)
}

part1()


// 2. Figure out how to get data on multiple numbers in a single request. Make that 
//     request and when you get the data back, put all of the number facts on the page.

let numbers = [1, 210, 101, 7]

async function part2() {
  let res = await fetch(`${BASE_URL}/${numbers}?json`)
  let data = await res.json()

  console.log(data)
}

part2()


// 3. Use the API to get 4 facts on your favorite number. Once you have them all, 
//     put them on the page. It’s okay if some of the facts are repeats.

async function part3() {
  let arr = await Promise.all(
    [...Array(4)].map(() => $.getJSON(`${BASE_URL}/${FAV_NUM}?json`))
  )

  arr.forEach(d => $('body').append(`<p>${d.text}</p>`))
}

part3()