/*
Same keys and values

Refactor:

function createInstructor(firstName, lastName){
  return {
    firstName: firstName,
    lastName: lastName
  }
}
*/
const createInstructor = (firstName, lastName) => ({ firstName, lastName })

/*
Computed Property Names

Refactor:

var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!"
*/

let favoriteNumber = 42

const instructor = {
  firstName: 'Colt',
  [favoriteNumber]: 'This is my favorite!'
}

/*
Object Methods

Refactor:

var instructor = {
  firstName: "Colt",
  sayHi: function(){
    return "Hi!";
  },
  sayBye: function(){
    return this.firstName + " says bye!";
  }
}
*/
const instructor = {
  firstName: 'Colt',
  sayHi() {
    return 'Hi!'
  },
  sayBye() {
    return `${this.firstName} says bye!`
  },
}

// createAnimal function
const createAnimal = (species, verb, noise) => {
  return {
    species,
    [verb](){
      return noise
    },
  }
}